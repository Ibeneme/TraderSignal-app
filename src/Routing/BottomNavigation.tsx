import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-remix-icon';
import {Text} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {useTheme} from '../Context/ThemeProvidr';
import {Colors} from '../Component/Colors/Colors';
import Home from '../Pages/Home/Home';
import Signals from '../Pages/Home/Signals';
import Subscriptions from '../Pages/Home/Subscriptions';
import Profile from '../Pages/Home/Profile';
import Wallet from '../Pages/Home/Wallet';

type TabParamList = {
  Home: undefined;
  Signals: undefined;
  Subscriptions: undefined;
 // Wallet: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

type BottomTabNavigationProp = RouteProp<TabParamList, keyof TabParamList>;

const BottomTabNavigator = () => {
  const {isDarkModeEnabled, theme} = useTheme();
  const activeColor = isDarkModeEnabled ? '#666' : Colors.primary;
  const iconColor = isDarkModeEnabled ? '#fff' : '#666';
  const labelColor = isDarkModeEnabled ? '#fff' : '#666'; // Set active label color to primary when focused

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: 'black',
        tabBarLabelStyle: {
          fontFamily: 'Plus Jakarta Sans Regular',
          fontSize: 10,
          marginTop: 4,
          color: iconColor,
        },
        tabBarStyle: {
          backgroundColor: isDarkModeEnabled ? theme.background : '#fff',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false, // Hide the header
          tabBarIcon: ({color, size, focused}) => (
            <Icon
              style={{marginTop: 12}}
              name="home-line"
              size={size}
              color={focused ? Colors.primary : iconColor} // Apply activeColor when focused
            />
          ),
          tabBarLabel: ({color, focused}) => (
            <Text
              style={{
                color: focused ? Colors.primary : labelColor,
                fontSize: 12,
              }}>
              Home
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Signals"
        component={Signals}
        options={{
          headerShown: false, // Hide the header
          tabBarIcon: ({color, size, focused}) => (
            <Icon
              style={{marginTop: 12}}
              name="group-line"
              size={size}
              color={focused ? Colors.primary : iconColor} // Apply activeColor when focused
            />
          ),
          tabBarLabel: ({color, focused}) => (
            <Text
              style={{
                color: focused ? Colors.primary : labelColor,
                fontSize: 12,
              }}>
              Signals
            </Text> // Apply activeColor when focused
          ),
        }}
      />

      <Tab.Screen
        name="Subscriptions"
        component={Subscriptions}
        options={{
          headerShown: false, // Hide the header
          tabBarIcon: ({color, size, focused}) => (
            <Icon
              style={{marginTop: 12}}
              name="wallet-line"
              size={size}
              color={focused ? Colors.primary : iconColor} // Apply activeColor when focused
            />
          ),
          tabBarLabel: ({color, focused}) => (
            <Text
              style={{
                color: focused ? Colors.primary : labelColor,
                fontSize: 12,
              }}>
              Subscriptions
            </Text> // Apply activeColor when focused
          ),
        }}
      />

      {/* <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          headerShown: false, // Hide the header
          tabBarIcon: ({color, size, focused}) => (
            <Icon
              style={{marginTop: 12}}
              name="wallet-line"
              size={size}
              color={focused ? Colors.primary : iconColor} // Apply activeColor when focused
            />
          ),
          tabBarLabel: ({color, focused}) => (
            <Text
              style={{
                color: focused ? Colors.primary : labelColor,
                fontSize: 12,
              }}>
              Wallet
            </Text> // Apply activeColor when focused
          ),
        }}
      /> */}

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false, // Hide the header
          tabBarIcon: ({color, size, focused}) => (
            <Icon
              style={{marginTop: 12}}
              name="user-line"
              size={size}
              color={focused ? Colors.primary : iconColor} // Apply activeColor when focused
            />
          ),
          tabBarLabel: ({color, focused}) => (
            <Text
              style={{
                color: focused ? Colors.primary : labelColor,
                fontSize: 12,
              }}>
              Profile
            </Text> // Apply activeColor when focused
          ),
        }}
      />

      {/* <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false, // Hide the header
          tabBarIcon: ({color, size, focused}) => (
            <Icon
              style={{marginTop: 12}}
              name="settings-line"
              size={size}
              color={focused ? Colors.primary : iconColor} // Apply activeColor when focused
            />
          ),
          tabBarLabel: ({color, focused}) => (
            <Text
              style={{
                color: focused ? Colors.primary : labelColor,
                fontSize: 12,
              }}>
              Settings
            </Text> // Apply activeColor when focused
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

export {BottomTabNavigator};
