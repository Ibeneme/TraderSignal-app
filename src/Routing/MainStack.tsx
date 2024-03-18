import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {BottomTabNavigator} from './BottomNavigation';
import WithdrawalScreen from '../Pages/Wallet/Withdrawal';
import WithdrawalSuccessScreen from '../Pages/Wallet/WithdrawalSuccess';
import SignalDetailsPage from '../Pages/Signals/SignalDetails';
import SubscriptionsDetailsPage from '../Pages/SubscriptionDetailsPage/SubscriptionDetailsPage';
import ProfileDetailsPage from '../Pages/Profile/ProvidersProfile';
import CheckPay from '../Pages/Wallet/CheckPay';
import SubscriptionSuccessScreen from '../Pages/SubscriptionDetailsPage/SubSuccess';
import Wallet from '../Pages/Home/Wallet';
import ViewProfile from '../Pages/Profile/ViewProfile';
import ProfileUpdatePage from '../Pages/Profile/ProfileUpdate';
import KYCOptionsPage from '../Pages/kyc/Kyc';
import KYCImageUpload from '../Pages/kyc/ImageUpload';
import Saved from '../Pages/Signals/Saved';
import SubscibedTo from '../Pages/Signals/SubscribedTo';

type SignedInUserStackParamList = {
  Main: undefined;
  WithdrawalScreen: undefined;
  WithdrawalSuccessScreen: undefined;
  SignalDetailsPage: undefined;
  SubscriptionsDetailsPage: undefined;
  ProfileDetailsPage: undefined;
  CheckPay: undefined;
  SubscriptionSuccessScreen: undefined;
  Wallet: undefined;
  ViewProfile: undefined;
  ProfileUpdatePage: undefined;
  KYCOptionsPage: undefined;
  KYCImageUpload: undefined;
  Saved: undefined;
  SubscribedTo: undefined;
  //{firstName: string; lastName: string};
};

const SignedInUserStack = createStackNavigator<SignedInUserStackParamList>();

const SignedInUserStackNavigator: React.FC = () => {
  return (
    <SignedInUserStack.Navigator initialRouteName="Main">
      <SignedInUserStack.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="WithdrawalScreen"
        component={WithdrawalScreen}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="WithdrawalSuccessScreen"
        component={WithdrawalSuccessScreen}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="SignalDetailsPage"
        component={SignalDetailsPage}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="SubscriptionsDetailsPage"
        component={SubscriptionsDetailsPage}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="ProfileDetailsPage"
        component={ProfileDetailsPage}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="CheckPay"
        component={CheckPay}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="SubscriptionSuccessScreen"
        component={SubscriptionSuccessScreen}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="Wallet"
        component={Wallet}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="ViewProfile"
        component={ViewProfile}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="ProfileUpdatePage"
        component={ProfileUpdatePage}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="KYCOptionsPage"
        component={KYCOptionsPage}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="KYCImageUpload"
        component={KYCImageUpload}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="Saved"
        component={Saved}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="SubscribedTo"
        component={SubscibedTo}
        options={{headerShown: false}}
      />
    </SignedInUserStack.Navigator>
  );
};

export default SignedInUserStackNavigator;
