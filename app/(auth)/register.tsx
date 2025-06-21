import BackButton from '@/components/BackButton'
import Button from '@/components/Button'
import Input from '@/components/Input'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { useAuth } from '@/context/authContext'
import { verticalScale } from '@/utils/styling'
import { useRouter } from 'expo-router'
import * as Icons from 'phosphor-react-native'
import React, { useRef } from 'react'
import { Alert, Pressable, StyleSheet, View } from 'react-native'

const Register = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const nameRef = useRef("");
  const { register: registerUser } = useAuth();

  const handleSubmit = async () => {
    if(!emailRef.current || !passwordRef.current || !nameRef.current) {
      Alert.alert('Login Error', 'Please enter your email and password');
      return;
    }
    console.log('Email:', emailRef.current);
    console.log('Password:', passwordRef.current);
    console.log('Name:', nameRef.current);

    setIsLoading(true);
    const res = await registerUser(emailRef.current, passwordRef.current, nameRef.current);
    setIsLoading(false);
    if(res.success) {
      Alert.alert('Success', 'Account created successfully');
      router.navigate('/(auth)/login');
    } else {
      Alert.alert('Registration Error', res.msg || 'Something went wrong, please try again');
    }
    
  }
  
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton iconSize={28} />
        <View style={{gap: 5, marginTop: spacingY._20}}>
          <Typo size={30} fontWeight={"800"}>
             Let&#39;s
          </Typo>
           <Typo size={30} fontWeight={"800"}>
             Get Started
          </Typo>
        </View>

        <View style={styles.form}>
          <Typo size={16} color={colors.textLight}>
            Create an Account
          </Typo>
          <Input 
            onChangeText={(text) => nameRef.current = text}
            placeholder='Enter your name' 
            icon={<Icons.User size={verticalScale(26)} color={colors.neutral300} weight="fill" /> }
          />
          <Input 
            onChangeText={(text) => emailRef.current = text}
            placeholder='Enter your email' 
            icon={<Icons.At size={verticalScale(26)} color={colors.neutral300} weight="fill" /> }
          />
        </View>
        
        <View style={styles.form}>
          <Input           
            onChangeText={(text) => passwordRef.current = text}
            placeholder='Enter your password'
            secureTextEntry
            icon={<Icons.Lock size={verticalScale(26)} color={colors.neutral300} weight="fill" /> }
          />
 
          <Button loading={isLoading} onPress={handleSubmit}>
            <Typo fontWeight={'700'} size={21}  >
              Sign Up
            </Typo>
          </Button>
        </View>

        <View style={styles.footer}>
          <Typo size={15}>Already have an account?</Typo>
          <Pressable onPress={() => router.navigate('/(auth)/login')}>
            <Typo size={15} color={colors.primary}  fontWeight={'700'}>
              Login
            </Typo>
          </Pressable>
        </View>

      </View>
    </ScreenWrapper>
  )
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20,
  },
  welcomeText: {
    fontSize: verticalScale(20),
    fontWeight: 'bold',
    color: colors.text,
  },
  form: {
    gap: spacingY._20,
  },
  forgotPassword: {
    textAlign: 'right',
    color: colors.text,    
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  fotterText: {
    textAlign: 'center',
    color: colors.text,
    fontSize: verticalScale(15),
  }
})