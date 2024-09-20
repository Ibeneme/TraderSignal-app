import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '../../Context/ThemeProvidr';
import {Colors} from '../Colors/Colors';

type Props = {
  children: React.ReactNode;
};

const SafeArea = ({children}: Props) => {
  const {isDarkModeEnabled, theme, toggleTheme} = useTheme();

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {backgroundColor: isDarkModeEnabled ? Colors.newBG : Colors.newBG},
      ]}>
      {children}
    </SafeAreaView>
  );
};

export default SafeArea;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
