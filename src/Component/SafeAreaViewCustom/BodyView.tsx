import {KeyboardAvoidingView, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {useTheme} from '../../Context/ThemeProvidr';
import {Colors} from '../Colors/Colors';

type Props = {
  children: React.ReactNode;
  color?: string;
  paddingHorizontal?: boolean;
};

const BodyView = ({children, color, paddingHorizontal}: Props) => {
  const {isDarkModeEnabled} = useTheme();

  const colorBG = color ? '#f4f4f4' : '#ffffff';

  return (
    <View
      style={[
        styles.safeArea,
        {
          backgroundColor: isDarkModeEnabled ? Colors.newBG : Colors.newBG,
          paddingHorizontal: paddingHorizontal ? 0 : 12,
        },
      ]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView behavior="padding" style={{height: 'auto'}}>
          {children}
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default BodyView;

const styles = StyleSheet.create({
  safeArea: {
    height: '100%',
    width: '100%',

    //paddingBottom: 48
  },
});
