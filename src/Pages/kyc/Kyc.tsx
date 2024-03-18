import React from 'react';
import { View } from 'react-native';

import MainHeader from '../../Component/Header/MainHeaders';
import Icon from 'react-native-remix-icon';
import { Colors } from '../../Component/Colors/Colors';
import Clickable from '../../Component/Component/Clickable';
import SafeArea from '../../Component/SafeAreaViewCustom/SafeArea';
import BodyView from '../../Component/SafeAreaViewCustom/BodyView';
import RegularText from '../../Component/Texts/RegularText';
import { useTheme } from '../../Context/ThemeProvidr';
import { useNavigation } from '@react-navigation/native';

const KYCOptionsPage: React.FC = () => {
  const navigation = useNavigation();

  const handleNINOptionClick = () => {
    console.log('ss')
    navigation.navigate('KYCImageUpload' as never);
  };

  const handleInternalPassportOptionClick = () => {
    navigation.navigate('KYCImageUpload' as never);
  };

  const handleVotersCardOptionClick = () => {
    navigation.navigate('KYCImageUpload' as never);
  };

  const kycOptions = [
    {
      id: 1,
      text: 'National Identity Card - NIN',
      onPress: handleNINOptionClick,
    },
    {
      id: 2,
      text: 'Internal Passport',
      onPress: handleInternalPassportOptionClick,
    },
    {
      id: 3,
      text: 'Voters Card',
      onPress: handleVotersCardOptionClick,
    },
    // Add more options here if needed
  ];

  const { isDarkModeEnabled } = useTheme();

  return (
    <SafeArea>
      <View style={{ backgroundColor: '#f4f4f4', height: '100%' }}>
        <MainHeader />
        <BodyView color='#f4f4f4'>
          <View
            style={{
              padding: 12,
              backgroundColor: isDarkModeEnabled ? '#000' : '#fff',
              marginTop: 36,
              borderRadius: 24,
            }}
          >
            <View
              style={{
                backgroundColor: '#ffaa0025',
                padding: 18,
                borderRadius: 12,
              }}
            >
              <RegularText
                textContent="Country of Verification, Nigeria Only"
                fontSize={14}
                //color={Colors?.primary}
              />
            </View>
            <View style={{ paddingHorizontal: 0, paddingTop: 24 }}>
              {kycOptions.map(option => (
                <Clickable
                  key={option.id}
                  marginTop={4}
                  text={option.text}
                  title={option.text}
                  iconArrow={<Icon name="arrow-right-line" size={20} color={Colors.primary} />}
                  onPress={option.onPress} // Use onPress from the option
                />
              ))}
            </View>
          </View>
        </BodyView>
      </View>
    </SafeArea>
  );
};

export default KYCOptionsPage;
