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

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const { login: loginUser } = useAuth();

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleSubmit = async () => {
    if(!emailRef.current || !passwordRef.current) {
      Alert.alert('Login Error', 'Please enter your email and password');
      return;
    }
    // console.log('Email:', emailRef.current);
    // console.log('Password:', passwordRef.current);
    setIsLoading(true);
    const res= await loginUser(emailRef.current, passwordRef.current);
    // console.log('Login response:', res);
    setIsLoading(false);
    if(res.success) {
      router.replace('/(tabs)');
    } else {
      Alert.alert('Login Error', res.msg || 'Something went wrong');
    }
  
  }
  
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton iconSize={28} />
        <View style={{gap: 5, marginTop: spacingY._20}}>
          <Typo size={30} fontWeight={"800"}>
             Hey,
          </Typo>
           <Typo size={30} fontWeight={"800"}>
             Welcome back!
          </Typo>
        </View>
        <View style={styles.form}>
          <Typo size={16} color={colors.textLight}>
            Login now to track all your expenses
          </Typo>
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

          <Typo size={14} color={colors.text} style={{alignSelf: 'flex-end'}}>
            Forgot Password?
          </Typo>

          <Button loading={isLoading} onPress={handleSubmit}>
            <Typo fontWeight={'700'} size={21}  >
              Login
            </Typo>
          </Button>
        </View>

        <View style={styles.footer}>
          <Typo size={15}>Don&#39;t have an account</Typo>
          <Pressable onPress={() => router.navigate('/(auth)/register')}>
            <Typo size={15} color={colors.primary}  fontWeight={'700'}>
              Sign Up
            </Typo>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  )
};

export default Login;

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