import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React from 'react';
import {useTheme} from '../../Context/ThemeProvidr';

type Props = {
  fontSize?: number;
  color?: string;
  textContent: string;
  onPress?: () => void;
  textAlign? : boolean
};

const MediumText = ({fontSize = 16, textAlign, color, textContent, onPress}: Props) => {
  const {isDarkModeEnabled} = useTheme();
  const {fontScale} = useWindowDimensions();
  const textColor = color ? color : '#fff';
  const textAlignCenter = 'center';
  return (
    <Text
      style={{
        color: textColor,
        fontFamily: 'Plus Jakarta Sans Medium',
        fontSize: fontSize * fontScale,
        textAlign: textAlign ? textAlignCenter : 'left',
       
      }}
      onPress={onPress}>
      {textContent}
    </Text>
  );
};

export default MediumText;

const styles = StyleSheet.create({});
