import BackButton from '@/components/BackButton'
import Header from '@/components/Header'
import ModelWrapper from '@/components/ModalWrapper'
import Typo from '@/components/Typo'
import { spacingY } from '@/constants/theme'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

const settingsModal = () => {
  
  return (
    <ModelWrapper>
      <View style={styles.container}>
        <Header 
          title="Settings"
          leftIcon={<BackButton/>}
          style={{ marginBottom: spacingY._10 }}
        />

        {/* form */}
         <ScrollView>
          <View style={{ justifyContent:"center", alignItems: "center"}}>
            <Typo fontWeight={"600"}>Empty page</Typo>
          </View>
           
        </ScrollView>
      </View>
       
    </ModelWrapper>
  )
}

export default settingsModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacingY._20,
  }
  
});