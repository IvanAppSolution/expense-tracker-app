import { auth, firestore } from "@/config/firebase";
import { AuthContextType, UserType } from "@/types";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { createContext } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = React.useState<UserType>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const router = useRouter();

  React.useEffect(() => {    
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => { 
      // console.log("Auth state changed:", firebaseUser);    
      if (firebaseUser) {
        await setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email || "",
          name: firebaseUser?.displayName || "",
          image: "",
        });
        updateUserData(firebaseUser.uid);
        router.replace("/(tabs)");
      } else {
        console.log("No user is signed in");
        
        setUser(null);
        router.replace("/(auth)/welcome");
      }
    });

 
    return () => unsub();    
    
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // console.log("Attempting to log in with email:", email);
      await signInWithEmailAndPassword(auth, email, password);
      return {success: true};
 
    } catch (error: any) {
      console.error("Login failed:", error);
      let msg = error.message;
      if (msg.includes("auth/invalid-credentials")) {
        msg = "Incorrect email or password.";
      } else if (msg.includes("auth/invalid-email")) {
        msg = "Invalid email.";
      }
      return { success: false, message: msg };
    }
  }

  const register = async (email: string, password: string, name: string) => {
    try {
      let response = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(firestore, "users", response?.user?.uid), {
        email: email,
        uid: response?.user?.uid,        
        name: name,
      });

      return { success: true };
    } catch (error: any) {
      let msg = error.message;
      console.error("Registration failed:", msg);
      if (msg.includes("auth/email-already-in-use")) {
        msg = "This email is already in use.";
      } else if (msg.includes("auth/invalid-email")) {
        msg = "Invalid email.";
      }
      return { success: false, message: msg };
    }
  }

  async function updateUserData (uid: string) {
    try {
      const userDoc = await getDoc(doc(firestore, "users", uid));
      
      if (userDoc.exists()) {
        const data = userDoc.data();
 
        const userData: UserType = {
          uid: data?.uid,
          email: data.email || "",
          name: data.name || "",
          image: data.image  || "",
        };

        setUser(userData);
      } else {
        console.error("No such document!");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  const contextValue: AuthContextType = {
    user,
    setUser,
    login,
    register,
    updateUserData,
  };
  

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = ():AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}