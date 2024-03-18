import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SIgnup from './src/Pages/Auth/SIgnup';
import {ThemeProvider} from './src/Context/ThemeProvidr';
import {NavigationContainer} from '@react-navigation/native';
import CreateAccount from './src/Pages/Auth/CreateAccount';
import AuthStackNavigator from './src/Routing/AuthStack';
import { BottomTabNavigator } from './src/Routing/BottomNavigation';
import SignedInUserStackNavigator from './src/Routing/MainStack';

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        {/* <AuthStackNavigator /> */}
        {/* <BottomTabNavigator /> */}
        <SignedInUserStackNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
