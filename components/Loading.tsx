import { colors } from '@/constants/theme';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

type LoadingProps = {
  size?: 'small' | 'large' | number;
  color?: string;
};

const Loading: React.FC<LoadingProps> = ({
  size = 'large',
  color = colors.primary,
}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={size} color={color} />
    </View>
  )
}

export default Loading
