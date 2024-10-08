import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React from 'react';
import {useTheme} from '../../Context/ThemeProvidr';

type Props = {
  fontSize?: number;
  color?: string;
  textContent: string;
  onPress?: () => void;
  textAlign?: boolean;
};

const BoldText = ({
  fontSize = 18,
  color,
  textContent,
  onPress,
  textAlign,
}: Props) => {
  const {isDarkModeEnabled} = useTheme();
  const {fontScale} = useWindowDimensions();
  const textColor = color ? color : '#fff';

  return (
    <Text
      style={{
        color: textColor,
        fontWeight: 900,
        fontFamily: 'Plus Jakarta Sans Bold',
        fontSize: fontSize * fontScale,
        textAlign: textAlign ? 'center' : 'left',
      }}
      onPress={onPress}>
      {textContent}
    </Text>
  );
};

export default BoldText;

const styles = StyleSheet.create({});
