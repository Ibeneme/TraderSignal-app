import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React from 'react';
import {useTheme} from '../../Context/ThemeProvidr';

type Props = {
  fontSize?: number;
  color?: string;
  textContent: string;
  onPress?: () => void;
};

const SemiBoldText = ({fontSize = 16, color, textContent, onPress}: Props) => {
  const {isDarkModeEnabled} = useTheme();
  const {fontScale} = useWindowDimensions();
  const textColor = color ? color : '#fff' ;

  return (
    <Text
      style={{
        color: textColor,
        fontFamily: 'Plus Jakarta Sans SemiBold',
        fontSize: fontSize * fontScale,
      }}
      onPress={onPress}>
      {textContent}
    </Text>
  );
};

export default SemiBoldText;

const styles = StyleSheet.create({});
