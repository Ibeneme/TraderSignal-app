import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  Text,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import BodyView from '../../Component/SafeAreaViewCustom/BodyView';
import MainHeader from '../../Component/Header/MainHeaders';
import SafeArea from '../../Component/SafeAreaViewCustom/SafeArea';
import RegularText from '../../Component/Texts/RegularText';
import FullBtn from '../../Component/Buttons/FullBtn';
import {useTheme} from '../../Context/ThemeProvidr';
import BoldText from '../../Component/Texts/BoldText';
import SemiBoldText from '../../Component/Texts/SemiBoldText';

const WithdrawalSuccessScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {amount} = route.params;
  console.log(amount, 'pagepage');
  const handleGoBackToWallet = () => {
    navigation.navigate('WithdrawalScreen' as never);
  };
  const {isDarkModeEnabled} = useTheme();
  const {height} = useWindowDimensions();
  return (
    <SafeArea>
      <View style={{height: '100%'}}>
        <MainHeader />
        <BodyView color="#f4f4f4">
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              height: height / 1.3,
            }}>
            <View
              style={{
                width: '100%',
                //marginTop: 24,
                //marginBottom: 48,
                alignItems: 'center',
                padding: 16,
                borderRadius: 24,
                backgroundColor: '#ffffff12',
              }}>
              <Image
                source={require('../../../assets/images/Success.png')}
                style={{width: 100, height: 100, marginVertical: 48}}
              />

              <View
                style={{
                  marginBottom: 20,
                  flexDirection: 'row',
                  alignItems: 'baseline',
                }}>
                <BoldText
                  fontSize={39}
                  textContent={amount}
                  //textAlign="center"
                />
                <BoldText
                  fontSize={16}
                  textContent="USDT"
                  //textAlign="center"
                />
              </View>

              <SemiBoldText
                fontSize={16}
                textContent="Processing Withdrawal"
                //textAlign="center"
              />
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  fontSize: 13,
                  marginTop: 12,
                  fontFamily: 'Plus Jakarta Sans Regular',
                }}>
                We processing your payments please wait a while your wallet
                address will be credited shortly{' '}
              </Text>
              <TouchableOpacity onPress={handleGoBackToWallet}>
                <FullBtn
                  buttonText="Back to Wallet"
                  onPress={handleGoBackToWallet}
                />
              </TouchableOpacity>
            </View>
          </View>
        </BodyView>
      </View>
    </SafeArea>
  );
};

export default WithdrawalSuccessScreen;
