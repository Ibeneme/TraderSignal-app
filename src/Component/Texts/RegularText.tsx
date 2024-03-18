import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React from 'react';
import {useTheme} from '../../Context/ThemeProvidr';

type Props = {
  fontSize?: number;
  color?: string;
  textContent: string;
  onPress?: () => void;
  textAlign?: boolean;
  lineHeight?: number;
};

const RegularText = ({
  fontSize = 16,
  color,
  textContent,
  onPress,
  textAlign,
  lineHeight
}: Props) => {
  const {isDarkModeEnabled} = useTheme();
  const {fontScale, width} = useWindowDimensions();
  const textColor = color ? color : isDarkModeEnabled ? '#fff' : '#121212';
  const textAlignCenter = 'center';
  return (
    <Text
      style={{
        color: color ? color : isDarkModeEnabled ? '#fff' : '#000',
        fontFamily: 'Plus Jakarta Sans Regular',
        fontSize: fontSize * fontScale,
        textAlign: textAlign ? textAlignCenter : 'left',
        marginVertical: textAlign ? 12 : 0,
        lineHeight: lineHeight? lineHeight : 0,
        
      }}
      onPress={onPress}>
      {textContent}
    </Text>
  );
};

export default RegularText;

const styles = StyleSheet.create({});
