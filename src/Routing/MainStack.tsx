import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {BottomTabNavigator} from './BottomNavigation';
import NewProfileScreen from '../Pages/Home/NewProfile';
import GetUserProfileScreen from '../Pages/Home/GetUserProfile';
import ChangePasswordScreen from '../Pages/Home/ChnagePassword';
import FAQScreen from '../Pages/Home/FAQScreen';
import MySubscription from '../Pages/SubscriptionDetailsPage/Subscription';
import MySubs from '../Pages/SubscriptionDetailsPage/MySubs';
import KYCOptionsPage from '../Pages/kyc/Kyc';
import ProfileDetailsPage from '../Pages/Profile/ProvidersProfile';
import CheckPay from '../Pages/Wallet/CheckPay';
import SubscriptionSuccessScreen from '../Pages/SubscriptionDetailsPage/SubSuccess';
import LoggedOTPScreen from '../Pages/Profile/OtpPage';
import NextKYCOptionsPage from '../Pages/kyc/NextKyc';
import CreateSub from '../Pages/SubscriptionDetailsPage/CreateSub';
import GetSub from '../Pages/SubscriptionDetailsPage/GetSub';
import GetSubUsers from '../Pages/SubscriptionDetailsPage/GetSubUsers';
import ViewAllProviders from '../Pages/Home/ViewAllProviders';
import StatusSpecific from '../Pages/SubscriptionDetailsPage/Status';
import CreatePost from '../Pages/SubscriptionDetailsPage/CreatePost';
import SinglePost from '../Pages/SubscriptionDetailsPage/SinglePost';
import EditSubScreen from '../Pages/SubscriptionDetailsPage/EditSub';
import MyBalanceScreen from '../Pages/SubscriptionDetailsPage/SubscriptionDetailsPage';
import WithdrawalScreen from '../Pages/Wallet/Withdrawal';
import WithdrawalInputScreen from '../Pages/Wallet/WithdrawalInputScreen';
import WithdrawalSuccessScreen from '../Pages/Wallet/WithdrawalSuccess';
import Niche from '../Pages/Home/Niche';
import Chat from '../Pages/Community/Community';
import VideoPage from '../Pages/Profile/VideoPlayer';
import CommunityChat from '../Pages/Community/Community';
import SinglePostView from '../Pages/Profile/SingleView';
import ComSUBSaLL from '../Pages/SubscriptionDetailsPage/CommunitySubs';
import CheckPayCommunity from '../Pages/Wallet/CheckPayCommunity';
import Benefits from '../Pages/SubscriptionDetailsPage/Benefits';
//import { AppDispatch } from '../Redux/Store/Store';
import {getCurrentUser, getUserProfile} from '../Redux/Profile/Profile';
import {useFocusEffect} from '@react-navigation/native';
import {AppDispatch} from '../Redux/Store/Store';
import {useDispatch} from 'react-redux';
import {useTheme} from '../Context/ThemeProvidr';
import {Colors} from '../Component/Colors/Colors';
import CoursePage from '../Pages/Academy/Preview/CoursePage';
import FreeCommunitySocket from '../Pages/Community/FreeCommunitySocket';
import HomeScreen from '../Pages/Academy/Preview/HomePage';
import SpecificCoursePage from '../Pages/Academy/Preview/SpecificCoursePage';
import UpdateNiche from '../Pages/Home/UpdateNiche';
import ReportScreen from '../Pages/Home/Report';
// import WithdrawalSuccessScreen from '../Pages/Wallet/WithdrawalSuccess';
// import SignalDetailsPage from '../Pages/Signals/SignalDetails';
// import SubscriptionsDetailsPage from '../Pages/SubscriptionDetailsPage/SubscriptionDetailsPage';
// import ProfileDetailsPage from '../Pages/Profile/ProvidersProfile';
// import CheckPay from '../Pages/Wallet/CheckPay';
// import SubscriptionSuccessScreen from '../Pages/SubscriptionDetailsPage/SubSuccess';
// import Wallet from '../Pages/Home/Wallet';
// import ViewProfile from '../Pages/Profile/ViewProfile';
// import ProfileUpdatePage from '../Pages/Profile/ProfileUpdate';
// import KYCOptionsPage from '../Pages/kyc/Kyc';
// import KYCImageUpload from '../Pages/kyc/ImageUpload';
// import Saved from '../Pages/Signals/Saved';
// import SubscibedTo from '../Pages/Signals/SubscribedTo';

type SignedInUserStackParamList = {
  Main: undefined;
  UpdateNiche: undefined;
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
  ChangePasswordScreen: undefined;
  GetUserProfileScreen: undefined;
  NewProfileScreen: undefined;
  FAQScreen: undefined;
  MySubscription: undefined;
  MySubs: undefined;
  LoggedOTPScreen: undefined;
  NextKYCOptionsPage: undefined;
  CreateSub: undefined;
  GetSub: undefined;
  GetSubUsers: undefined;
  ViewAllProviders: undefined;
  StatusSpecific: undefined;
  CreatePost: undefined;
  SinglePost: undefined;
  EditSubScreen: undefined;
  MyBalanceScreen: undefined;
  WithdrawalInputScreen: undefined;
  Niche: undefined;
  CommunityChat: undefined;
  SinglePostView: undefined;
  comsuball: undefined;
  CheckPayCommunity: undefined;
  Benefits: undefined;
  community: undefined;
  FreeCommunitySocket: undefined;
  CoursePage: undefined;
  CoursePageHome: undefined;
  SpecificCoursePage: undefined;
  Channels: undefined;
  ReportScreen: undefined;
  //{firstName: string; lastName: string};
};

const SignedInUserStack = createStackNavigator<SignedInUserStackParamList>();

const SignedInUserStackNavigator: React.FC = () => {
  const {isDarkModeEnabled, theme} = useTheme();
  const activeColor = isDarkModeEnabled ? Colors.primary : Colors.primary;
  const iconColor = isDarkModeEnabled ? '#fff' : '#fff';
  const labelColor = isDarkModeEnabled ? '#fff' : '#fff'; // Set active label color to primary when focused
  const dispatch = useDispatch<AppDispatch>();
  const [userFetched, setUserFetched] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getCurrentUser())
        .then(response => {
          console.log('get getCurrentUser retrieved:', response);
          console.log('get getCurrentUser retrieved:', response?.payload);

          dispatch(getUserProfile(response?.payload?.user?._id))
            .then(response => {
              setUserFetched(response?.payload);
              console.log(
                response?.payload,
                ' hometabs getUserProfile?.payload',
              );
            })
            .catch(error => {
              console.error('Erhmetab hometabs user sub:', error);
            });
        })
        .catch(error => {
          console.error('Error retrieving user sub:', error);
        });

      return () => {
        // Cleanup function (optional)
      };
    }, [dispatch]),
  );
  return (
    <SignedInUserStack.Navigator initialRouteName="Main">
      <SignedInUserStack.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      {/* <SignedInUserStack.Screen
        name="NewProfileScreen"
        component={NewProfileScreen}
        options={{headerShown: false}}
      /> */}
      <SignedInUserStack.Screen
        name="CoursePage"
        component={CoursePage}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="CoursePageHome"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="SpecificCoursePage"
        component={SpecificCoursePage}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="comsuball"
        component={ComSUBSaLL}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="Niche"
        component={Niche}
        options={{headerShown: false}}
      />

      <SignedInUserStack.Screen
        name="Channels"
        component={MySubs}
        options={{headerShown: false}}
      />

      <SignedInUserStack.Screen
        name="UpdateNiche"
        component={UpdateNiche}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="CommunityChat"
        component={CommunityChat}
        options={{headerShown: false}}
      />

      <SignedInUserStack.Screen
        name="EditSubScreen"
        component={EditSubScreen}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="SinglePost"
        component={SinglePost}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="MyBalanceScreen"
        component={MyBalanceScreen}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="CreateSub"
        component={CreateSub}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="SinglePostView"
        component={SinglePostView}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="NextKYCOptionsPage"
        component={NextKYCOptionsPage}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="GetSubUsers"
        component={GetSubUsers}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="FAQScreen"
        component={FAQScreen}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="GetUserProfileScreen"
        component={GetUserProfileScreen}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="MySubscription"
        component={MySubscription}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="MySubs"
        component={MySubs}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="CheckPayCommunity"
        component={CheckPayCommunity}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="GetSub"
        component={GetSub}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="KYCOptionsPage"
        component={KYCOptionsPage}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="ProfileDetailsPage"
        component={ProfileDetailsPage}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="ReportScreen"
        component={ReportScreen}
        options={{headerShown: false}}
      />

      <SignedInUserStack.Screen
        name="CheckPay"
        component={CheckPay}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="CreatePost"
        component={CreatePost}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="ViewAllProviders"
        component={ViewAllProviders}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="SubscriptionSuccessScreen"
        component={SubscriptionSuccessScreen}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="LoggedOTPScreen"
        component={LoggedOTPScreen}
        options={{headerShown: false}}
      />

      <SignedInUserStack.Screen
        name="WithdrawalInputScreen"
        component={WithdrawalInputScreen}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="StatusSpecific"
        component={StatusSpecific}
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

      {userFetched?.communitySub === true ? (
        <>
          {/* <SignedInUserStack.Screen
            name="CommunityChat"
            component={CommunityChat}
            options={{headerShown: false}}
          /> */}

          {/* <Tab.Screen
            name="VideoPage"
            component={VideoPage}
            options={{
              headerShown: false, // Hide the header
              tabBarIcon: ({color, size, focused}) => (
                <AcademyIcon
                  width={16}
                  height={16}
                  color={`${focused ? Colors.primary : labelColor}`}
                />
              ),
              tabBarLabel: ({color, focused}) => (
                <Text
                  style={{
                    color: focused ? Colors.primary : labelColor,
                    fontSize: 10,
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                                   fontWeight: 700,
                  }}>
                  Academy
                </Text> // Apply activeColor when focused
              ),
            }}
          /> */}
        </>
      ) : userFetched?.communitySubWaiting === true ? (
        <SignedInUserStack.Screen
          name="community"
          component={ComSUBSaLL}
          options={{headerShown: false}}
        />
      ) : (
        <SignedInUserStack.Screen
          name="Benefits"
          component={Benefits}
          options={{headerShown: false}}
        />
      )}

      <SignedInUserStack.Screen
        name="FreeCommunitySocket"
        component={FreeCommunitySocket}
        options={{headerShown: false}}
      />

      {/*  <SignedInUserStack.Screen
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
      /> */}
    </SignedInUserStack.Navigator>
  );
};

export default SignedInUserStackNavigator;
