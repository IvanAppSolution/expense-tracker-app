import { colors } from '@/constants/theme';
import { StatusBar } from "expo-status-bar";
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';


const SplashScreen = () => {
  // const router = useRouter()

  // React.useEffect(() => {
  //   const timer = setTimeout(() => {
  //     router.navigate('/welcome');
  //   }, 2000); // Navigate to home after 2 seconds

  //   return () => clearTimeout(timer); // Cleanup the timer on unmount
  // }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        style={styles.logo}
        resizeMode='contain'
        source={require('../assets/images/splashImage.png')}
      />
    </View>
  )

};

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral900,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: "20%",
    aspectRatio: 1,
  }
})