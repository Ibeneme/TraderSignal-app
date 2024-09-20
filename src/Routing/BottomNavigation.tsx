import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';
import Icon from 'react-native-remix-icon';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../Redux/Store/Store';
import {getCurrentUser, getUserProfile} from '../Redux/Profile/Profile';
import {useTheme} from '../Context/ThemeProvidr';
import {Colors} from '../Component/Colors/Colors';
import Home from '../Pages/Home/Home';
import MySubsCommunities from '../Pages/SubscriptionDetailsPage/MySubsCommunities';
import NewProfileScreen from '../Pages/Home/NewProfile';
import CoursePage from '../Pages/Academy/Preview/CoursePage';
import CheckPayCommunity from '../Pages/Wallet/CheckPayCommunity';
import HomeIcon from '../Component/icons/HomeIcon';
import UserIcon from '../Component/icons/UserIcon';
import AcademyIcon from '../Component/icons/Academy';
import HomeScreen from '../Pages/Academy/Preview/HomePage';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const {isDarkModeEnabled} = useTheme();
  const activeColor = Colors.primary;
  const iconColor = isDarkModeEnabled ? '#fff' : '#fff';
  const labelColor = isDarkModeEnabled ? '#fff' : '#fff';
  const dispatch = useDispatch<AppDispatch>();
  const [userFetched, setUserFetched] = useState<any>([]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getCurrentUser())
        .then(response => {
          dispatch(getUserProfile(response?.payload?.user?._id))
            .then(res => {
              setUserFetched(res?.payload);
            })
            .catch(error => console.error('Error fetching profile:', error));
        })
        .catch(error => console.error('Error fetching user:', error));

      return () => {
        // Cleanup, if needed
      };
    }, [dispatch]),
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: 'black',
        tabBarLabelStyle: {
          fontFamily: 'Plus Jakarta Sans Regular',
          fontSize: 12,
          marginTop: 4,
          color: iconColor,
        },
        tabBarStyle: {
          backgroundColor: Colors.newBG,
          paddingTop: 10,
          borderTopColor: Colors.primary,
          borderTopWidth: 1.4,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <HomeIcon
              width={16}
              height={16}
              color={focused ? Colors.primary : labelColor}
            />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? Colors.primary : labelColor,
                fontSize: 12,
                fontFamily: 'Plus Jakarta Sans SemiBold',
                fontWeight: '700',
              }}>
              Home
            </Text>
          ),
        }}
      />

      <Tab.Screen
        name="MySubsCommunities"
        component={MySubsCommunities}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Icon
              name="message-3-fill"
              size={16}
              color={focused ? Colors.primary : labelColor}
            />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? Colors.primary : labelColor,
                fontSize: 12,
                fontFamily: 'Plus Jakarta Sans SemiBold',
                fontWeight: '700',
              }}>
              Communities
            </Text>
          ),
        }}
      />

      <Tab.Screen
        name="NewProfileScreen"
        component={NewProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <UserIcon
              width={16}
              height={16}
              color={focused ? Colors.primary : labelColor}
            />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? Colors.primary : labelColor,
                fontSize: 12,
                fontFamily: 'Plus Jakarta Sans SemiBold',
                fontWeight: '700',
              }}>
              Profile
            </Text>
          ),
        }}
      />

      {userFetched?.proTraderSub || userFetched?.academySub ? (
        <Tab.Screen
          name="CoursePage"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <AcademyIcon
                width={16}
                height={16}
                color={focused ? Colors.primary : labelColor}
              />
            ),
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  color: focused ? Colors.primary : labelColor,
                  fontSize: 12,
                  fontFamily: 'Plus Jakarta Sans SemiBold',
                  fontWeight: '700',
                }}>
                Academy
              </Text>
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="CheckPayCommunity"
          component={CheckPayCommunity}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <AcademyIcon
                width={16}
                height={16}
                color={focused ? Colors.primary : labelColor}
              />
            ),
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  color: focused ? Colors.primary : labelColor,
                  fontSize: 12,
                  fontFamily: 'Plus Jakarta Sans SemiBold',
                  fontWeight: '700',
                }}>
                Academy
              </Text>
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
};

export {BottomTabNavigator};
