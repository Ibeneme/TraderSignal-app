import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import SafeArea from '../../Component/SafeAreaViewCustom/SafeArea';
import ClickableImage from '../../Component/Component/ClickableImage';
import {useTheme} from '../../Context/ThemeProvidr';
import MainHeader from '../../Component/Header/MainHeaders';
import BodyView from '../../Component/SafeAreaViewCustom/BodyView';
import RegularText from '../../Component/Texts/RegularText';
import BoldText from '../../Component/Texts/BoldText';
import Icon from 'react-native-remix-icon';
import WalletImageWithDetails from '../../Component/Component/SavedSubscribed';
import SemiBoldText from '../../Component/Texts/SemiBoldText';
import MediumText from '../../Component/Texts/MediumText';
import {Colors} from '../../Component/Colors/Colors';
import {useNavigation} from '@react-navigation/core';
import {Transaction} from './Wallet';
import Clickable from '../../Component/Component/Clickable';

const Profile: React.FC = () => {
  const [productFilter, setProductFilter] = useState('');

  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false); // State to manage modal visibility

  const handleProductFilter = (product: string) => {
    setProductFilter(product);
  };

  const handleSubscribe = () => {
    setShowSubscriptionModal(true); // Open modal when subscribe button is clicked
  };

  const {isDarkModeEnabled} = useTheme();
  const {width} = useWindowDimensions();

  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('ProfileDetailsPage' as never); // Adjust the screen name and params as needed
  };

  const transactions: Transaction[] = [
    {
      onPress: () => navigation.navigate('ViewProfile' as never),
      id: 1,
      date: 'View and Edit your Profile',
      title: 'View Profile',
      iconColor: '#FFAA00', // Assuming color
      isDebit: true, // Assuming it's a debit transaction
    },
    {
      onPress: () => navigation.navigate('KYCOptionsPage' as never),

      id: 2,
      date: 'Get verified to offer subscriptions',
      title: 'Become a Provider',
      iconColor: '#FFAA00', // Assuming color
      isDebit: false, // Assuming it's not a debit transaction
    },
    {
      id: 3,
      date: 'Read our Privacy policy at Trader signal',
      title: 'Privacy Policy',
      iconColor: '#FFAA00', // Assuming color
      isDebit: false, // Assuming it's not a debit transaction
    },
    {
      id: 4,
      date: 'Read our Terms and conditions at Trader signal',
      title: 'Terms and Conditions',
      iconColor: '#FFAA00', // Assuming color
      isDebit: true, // Assuming it's a debit transaction
    },
    {
      id: 5,
      date: 'Log Out this account',
      title: 'Log Out',
      iconColor: '#FFAA00', // Assuming color
      isDebit: false, // Assuming it's not a debit transaction
    },
  ];

  const handleTransactionClick = (transaction: Transaction) => {
    // Handle transaction click logic
    console.log('Clicked:', transaction.title);
  };

  return (
    <SafeArea>
      <View style={{backgroundColor: '#f4f4f4', height: '100%'}}>
        <MainHeader goBackTwice />
        <BodyView color="#f4f4f4">
          <View
            style={{
              backgroundColor: isDarkModeEnabled ? '#000' : '#fff',
              padding: 12,
              borderRadius: 24,
              marginTop: 12,
            }}>
            <View
              style={{
                justifyContent: 'center',
                width: '100%',
                alignItems: 'center',
                marginVertical: 48,
                flexDirection: 'column',
              }}>
              <Image
                source={require('../../../assets/images/pic.png')}
                style={{width: 64, height: 64, marginBottom: 12}}
              />
              <View style={{justifyContent: 'center', width: '100%', gap: -8}}>
                <BoldText textAlign textContent="Ibeneme Ikenna" />
                <RegularText
                  textAlign
                  textContent="@Ibeneme_"
                  //color="#808080"
                  fontSize={12}
                />
              </View>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 32,
              }}>
              <View style={{justifyContent: 'center', gap: -8}}>
                <RegularText
                  textAlign
                  textContent="22"
                  //color="#808080"
                  fontSize={14}
                />
                <MediumText fontSize={16} textAlign textContent="Saved" />
              </View>
              <View style={{justifyContent: 'center', gap: -8}}>
                <RegularText
                  textAlign
                  textContent="3"
                  //color="#808080"
                  fontSize={14}
                />
                <MediumText
                  fontSize={16}
                  textAlign
                  textContent="Subscribed to"
                />
              </View>
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={{paddingVertical: 24}}>
              <WalletImageWithDetails
                isDarkModeEnabled={true}
                heartIconColor="heart-fill"
                savedTextContent="Saved"
                onPress={() => navigation.navigate('Saved' as never)}
              />
              <WalletImageWithDetails
                isDarkModeEnabled={true}
                heartIconColor="group-fill"
                savedTextContent="Subscribed"
                onPress={() => navigation.navigate('SubscribedTo' as never)}
              />
            </ScrollView>

            <View>
              {transactions.map(transaction => (
                <Clickable
                  key={transaction.id}
                  text={transaction.date}
                  title={transaction.title}
                  onPress={transaction.onPress}
                  iconArrow={
                    <Icon
                      name="arrow-right-line"
                      size={20}
                      color={transaction.iconColor}
                    />
                  }
                  // display={true}
                  //isDebit={transaction.isDebit}
                />
              ))}
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: '#ffaa00',
                height: 100,
                marginVertical: 32,
                borderRadius: 8,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 12,
              }}
              onPress={() => navigation.navigate('Wallet' as never)}>
              <View>
                <RegularText
                  textContent="Wallet Balance"
                  //color="#000"
                  fontSize={14}
                />
                <BoldText color="#000" textContent="12,345 USDT" />
              </View>
              <Icon name="arrow-right-line" size={20} color={'#000'} />
            </TouchableOpacity>
            <View style={{marginBottom: 48}}></View>
          </View>
        </BodyView>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  transactionsContainer: {
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#ffff', // Adjust background color as needed
  },
  image: {
    height: 150,
    borderRadius: 12,
    marginVertical: 24,
  },
  detailsContainer: {
    position: 'absolute',
    top: 40,
    left: 10,
    justifyContent: 'space-between',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 3,
    marginTop: 4,
  },
});

export default Profile;
