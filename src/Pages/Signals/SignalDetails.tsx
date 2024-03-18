import React from 'react';
import {View, Image, Text, Dimensions} from 'react-native';
import {useRoute} from '@react-navigation/native';
import SafeArea from '../../Component/SafeAreaViewCustom/SafeArea';
import MainHeader from '../../Component/Header/MainHeaders';
import BodyView from '../../Component/SafeAreaViewCustom/BodyView';
import SemiBoldText from '../../Component/Texts/SemiBoldText';
import RegularText from '../../Component/Texts/RegularText';
import {useTheme} from '../../Context/ThemeProvidr';
import {renderUserObject} from './UserObject';

interface User {
  firstName: string;
  lastName: string;
  username: string;
  profilePicture: any;
  backgroundImage: any;
}

const SignalDetailsPage: React.FC = () => {
  const route = useRoute();
  const {user} = route.params as {user: User};

  // Dummy comments for demonstration
  const comments = [
    {
      id: 1,
      text: 'Great post!, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim v',
      user: 'John',
    },
    {id: 2, text: 'Amazing!', user: 'Alice'},
    {id: 3, text: 'Love it!', user: 'Bob'},
    // Add more comments here
  ];
  const {isDarkModeEnabled} = useTheme();
  const screenWidth = Dimensions.get('window').width;


  const anonymizeUserName = (userName: string) => {
    const nameArray = userName.split('');
    const anonymizedName = nameArray.map(() => '*').join('');
    return anonymizedName;
  };


  return (
    <SafeArea>
      <View style={{backgroundColor: 'white', height: '100%'}}>
        <MainHeader />
        <BodyView>
          <View style={{marginTop: 24}}></View>
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
                backgroundColor: isDarkModeEnabled ? '#0665F2' : '#0665F225',
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
                backgroundColor: isDarkModeEnabled ? '#FF8400' : '#FF840025',
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
                backgroundColor: isDarkModeEnabled ? '#EE06F2' : '#EE06F225',
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
          <View style={{marginTop: 32}}>
            <SemiBoldText textContent="Comments" fontSize={14} />
            {comments.map(comment => (
              <View
                key={comment.id}
                style={{marginVertical: 10, flexDirection: 'row'}}>
                <Image
                  source={user.profilePicture}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    marginRight: 8,
                  }}
                />

                <View style={{width: screenWidth - 40 - 8}}>
              
                  {/* Adjust the width */}
                  <SemiBoldText
                    fontSize={14}
                    textContent={`${anonymizeUserName(comment.user)}`}
                  />
                  <RegularText fontSize={12} textContent={`${comment.text}`} />
                </View>
              </View>
            ))}
          </View>
        </BodyView>
      </View>
    </SafeArea>
  );
};

export default SignalDetailsPage;
