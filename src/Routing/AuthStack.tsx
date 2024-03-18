import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CreateAccount from '../Pages/Auth/CreateAccount';
import LoginScreen from '../Pages/Auth/LoginScreen';
import ForgotPasswordScreen from '../Pages/Auth/ForgotPassword';
import OTPScreen from '../Pages/Auth/OTPScreen';
import ResetOTPScreen from '../Pages/Auth/ResetOTPScreen';
import CreatePasswordScreen from '../Pages/Auth/CreatePassword';
import WhatBringsYouHerePage from '../Pages/Auth/WhatNext';
import KYCOptionsPage from '../Pages/kyc/Kyc';
import KYCImageUpload from '../Pages/kyc/ImageUpload';

type AuthStackParamList = {
  CreateAccount: undefined;
  LoginScreen: undefined;
  ForgotPasswordScreen: undefined;
  OTPScreen: undefined;
  ResetOTPScreen: undefined;
  CreatePasswordScreen: undefined;
  WhatBringsYouHerePage: undefined;

  // KYCOptionsPage: undefined;
  // KYCImageUpload: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthStackNavigator: React.FC = () => {
  return (
    <AuthStack.Navigator initialRouteName="CreateAccount">
      <AuthStack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="OTPScreen"
        component={OTPScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="ResetOTPScreen"
        component={ResetOTPScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="CreatePasswordScreen"
        component={CreatePasswordScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="WhatBringsYouHerePage"
        component={WhatBringsYouHerePage}
        options={{headerShown: false}}
      />
{/* 
      <AuthStack.Screen
        name="KYCOptionsPage"
        component={KYCOptionsPage}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="KYCImageUpload"
        component={KYCImageUpload}
        options={{headerShown: false}}
      /> */}
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
