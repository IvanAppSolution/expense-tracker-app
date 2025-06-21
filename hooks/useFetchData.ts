import { firestore } from "@/config/firebase";
import {
  collection,
  onSnapshot,
  query,
  QueryConstraint
} from "firebase/firestore";
import { useEffect, useState } from "react";

const useFetchData = <T>(
  collectionName: string,
  constraints: QueryConstraint[] = []
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {       
    if (!collectionName || constraints.length === 0) return;
    
    const collectionRef = collection(firestore, collectionName);
    const q = query(collectionRef, ...constraints);    

    try {
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const fetchedData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as T[];
          setData(fetchedData);
          setLoading(false);
        },
        (err) => {
          console.error("Error fetching data:", err);
          setError(err.message);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error("Error setting up snapshot listener:", err);
      
    }

  }, []);

  return { data, loading, error };
};

export default useFetchData;
