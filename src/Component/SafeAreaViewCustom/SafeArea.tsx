import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '../../Context/ThemeProvidr';

type Props = {
  children: React.ReactNode;
};

const SafeArea = ({children}: Props) => {
  const {isDarkModeEnabled, theme, toggleTheme} = useTheme();

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {backgroundColor: isDarkModeEnabled ? '#121212' : '#ffffff'},
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
