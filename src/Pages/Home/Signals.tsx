import React, {useState} from 'react';
import {View, Image, TouchableOpacity, ScrollView} from 'react-native';
import BodyView from '../../Component/SafeAreaViewCustom/BodyView';
import MainHeader from '../../Component/Header/MainHeaders';
import SafeArea from '../../Component/SafeAreaViewCustom/SafeArea';
import RegularText from '../../Component/Texts/RegularText';
import {useTheme} from '../../Context/ThemeProvidr';
import SemiBoldText from '../../Component/Texts/SemiBoldText';
import VerifiedBadge from '../../Component/icons/VerifiedBadge';
import BoldText from '../../Component/Texts/BoldText';
import {Colors} from '../../Component/Colors/Colors';
import {useNavigation} from '@react-navigation/core';
import {renderUserObject} from '../Signals/UserObject';

export interface User {
  firstName: string;
  lastName: string;
  username: string;
  profilePicture: any; // Change 'any' to the correct type of profile picture
  backgroundImage: any; // Change 'any' to the correct type of background image
  // Add additional properties as needed
}

export const users: User[] = [
  {
    firstName: 'Ibeneme',
    lastName: 'Ikenna',
    username: 'Ibeneme_',
    profilePicture: require('../../../assets/images/pic.png'),
    backgroundImage: require('../../../assets/images/post.png'),
  },
  {
    firstName: 'Benjamin',
    lastName: 'Jimmy',
    username: 'Benjamin',
    profilePicture: require('../../../assets/images/pic.png'),
    backgroundImage: require('../../../assets/images/post.png'),
  },
];

const Signal: React.FC = () => {
  const navigation = useNavigation();
  const [activeUser, setActiveUser] = useState('All');
  const {isDarkModeEnabled} = useTheme();

  const handleItemClick = (user: User) => {
    navigation.navigate('SignalDetailsPage' as never, {user});
  };

  return (
    <SafeArea>
      <View>
        <MainHeader />
        <BodyView color="#f4f4f4">
          <View style={{marginVertical: 24}}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                onPress={() => setActiveUser('All')}
                style={{
                  backgroundColor:
                    activeUser === 'All' ? '#ffaa00' : '#ffaa0025',
                  paddingVertical: 12,
                  width: 70,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 24,
                  marginTop: 20,
                  paddingHorizontal: 14,
                  marginRight: 10,
                }}>
                <SemiBoldText
                  color={activeUser === 'All' ? '#fff' : '#ffaa00'}
                  textContent="All"
                  fontSize={14}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setActiveUser('Ibeneme Ikenna')}
                style={{
                  backgroundColor:
                    activeUser === 'Ibeneme Ikenna' ? '#ffaa00' : '#ffaa0025',
                  paddingVertical: 12,
                  width: 165,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 24,
                  marginTop: 20,
                  paddingHorizontal: 14,
                  marginRight: 10,
                }}>
                <SemiBoldText
                  color={activeUser === 'Ibeneme Ikenna' ? '#fff' : '#ffaa00'}
                  textContent="Ibeneme Ikenna"
                  fontSize={14}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setActiveUser('Benjamin Jimmy')}
                style={{
                  backgroundColor:
                    activeUser === 'Benjamin Jimmy' ? '#ffaa00' : '#ffaa0025',
                  paddingVertical: 12,
                  width: 190,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 24,
                  marginTop: 20,
                  paddingHorizontal: 14,
                  marginRight: 10,
                }}>
                <SemiBoldText
                  color={
                    activeUser === 'Benjamin Jimmy' ? '#ffffff' : '#ffaa00'
                  }
                  textContent="Benjamin Jimmy"
                  fontSize={14}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setActiveUser('Tommy')}
                style={{
                  backgroundColor:
                    activeUser === 'Tommy' ? '#ffaa00' : '#ffaa0025',
                  paddingVertical: 12,
                  width: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 24,
                  marginTop: 20,
                  paddingHorizontal: 14,
                  marginRight: 10,
                }}>
                <SemiBoldText
                  color={activeUser === 'Tommy' ? '#fff' : '#ffaa00'}
                  textContent="Tommy"
                  fontSize={14}
                />
              </TouchableOpacity>
            </ScrollView>
          </View>

          {users
            .filter(
              user =>
                activeUser === 'All' ||
                user.firstName + ' ' + user.lastName === activeUser,
            )
            ?.map((user, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  padding: 12,
                  backgroundColor: isDarkModeEnabled ? '#000' : '#fff',
                  marginVertical: 6,
                  borderRadius: 16,
                }}
                onPress={() => handleItemClick(user)}>
                {renderUserObject(user)}

                <RegularText
                  textContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco "
                  fontSize={14}
                  lineHeight={22}
                />

                <View
                  style={{
                    flexWrap: 'wrap',
                    width: '100%',
                    flexDirection: 'row',
                    gap: 6,
                  }}>
                  <View
                    style={{
                      backgroundColor: isDarkModeEnabled
                        ? '#0665F2'
                        : '#0665F225',
                      paddingVertical: 12,
                      width: 90,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 24,
                      marginTop: 20,
                      paddingHorizontal: 14,
                    }}>
                    <SemiBoldText
                      color={isDarkModeEnabled ? '#fff' : '#0665F2'}
                      textContent="BTC / USDT"
                      fontSize={10}
                    />
                  </View>

                  <View
                    style={{
                      backgroundColor: isDarkModeEnabled
                        ? '#FF8400'
                        : '#FF840025',
                      paddingVertical: 12,
                      width: 90,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 24,
                      marginTop: 20,
                      paddingHorizontal: 14,
                    }}>
                    <SemiBoldText
                      color={isDarkModeEnabled ? '#fff' : '#FF8400'}
                      textContent="TP 1: 70,000"
                      fontSize={10}
                    />
                  </View>

                  <View
                    style={{
                      backgroundColor: isDarkModeEnabled
                        ? '#EE06F2'
                        : '#EE06F225',
                      paddingVertical: 12,
                      width: 90,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 24,
                      marginTop: 20,
                      paddingHorizontal: 14,
                    }}>
                    <SemiBoldText
                      color={isDarkModeEnabled ? '#fff' : '#EE06F2'}
                      textContent="TP 1: 70,000"
                      fontSize={10}
                    />
                  </View>
                </View>
                <Image
                  source={user.backgroundImage}
                  style={{
                    width: '100%',
                    height: 200,
                    borderRadius: 8,
                    marginTop: 24,
                  }}
                />
              </TouchableOpacity>
            ))}

          {users.filter(
            user =>
              activeUser === 'All' ||
              user.firstName + ' ' + user.lastName === activeUser,
          )?.length === 0 ? (
            <View
              style={{
                alignItems: 'center',
                height: 200,
                justifyContent: 'center',
              }}>
              <BoldText textContent="No Signal Posts found" fontSize={16} />
            </View>
          ) : null}
        </BodyView>
      </View>
    </SafeArea>
  );
};

export default Signal;
