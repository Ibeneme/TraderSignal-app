import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '../../Context/ThemeProvidr';

type Props = {
  fontSize?: number;
  color?: string;
  textContent: string;
  onPress?: () => void;
};

const LightText = ({ fontSize = 16, color, textContent , onPress}: Props) => { 
  const { isDarkModeEnabled } = useTheme();
  
  const textColor = color ? color : (isDarkModeEnabled ? '#fff' : '#121212'); 
  
  return (
    <Text
      style={{
        color: textColor,
        fontFamily: 'Plus Jakarta Sans Light',
        fontSize: fontSize,
      }}
      onPress={onPress}>
      {textContent} 
    </Text>
  );
};

export default LightText;

const styles = StyleSheet.create({});
