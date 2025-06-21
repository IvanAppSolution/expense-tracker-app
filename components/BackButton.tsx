import { colors, radius } from '@/constants/theme'
import { BackButtonProps } from '@/types'
import { verticalScale } from '@/utils/styling'
import { router } from 'expo-router'
import { CaretLeft } from 'phosphor-react-native'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

const BackButton = ({
  style,
  iconSize = 26,
}: BackButtonProps) => {
  return (
    <TouchableOpacity onPress={() => router.back()} style={[styles.button, style]}>
       <CaretLeft 
        size={verticalScale(iconSize)}
        color={colors.white}
        weight="bold"
        />
    </TouchableOpacity>
  )
}

export default BackButton

const styles = StyleSheet.create({
  button: {
    borderRadius: radius._12,
    backgroundColor: colors.neutral600,
    borderCurve: 'continuous',
    alignSelf: 'flex-start',
    padding: 5
  },
})