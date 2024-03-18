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

const HomeScreen: React.FC = () => {
  const [productFilter, setProductFilter] = useState('');

  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false); // State to manage modal visibility

  const handleProductFilter = (product: string) => {
    setProductFilter(product);
  };

  const handleSubscribe = () => {
    setShowSubscriptionModal(true); // Open modal when subscribe button is clicked
  };

  const generateSampleTransactions = () => {
    return [
      {
        id: 1,
        name: 'Sterling Josh',
        subscriptionType: 'Monthly Subscription',
        stars: 4,
        price: '$50',
        imageSource: require('../../../assets/images/user.png'),
        product: 'crypto',
      },
      {
        id: 2,
        name: 'Jane Doe',
        subscriptionType: 'Annual Subscription',
        stars: 5,
        price: '$100',
        imageSource: require('../../../assets/images/user.png'),
        product: 'stocks',
      },
      {
        id: 8,
        name: 'Jane Doe',
        subscriptionType: 'Annual Subscription',
        stars: 5,
        price: '$100',
        imageSource: require('../../../assets/images/user.png'),
        product: 'forex',
      },
      {
        id: 7,
        name: 'Jane Doe',
        subscriptionType: 'Annual Subscription',
        stars: 5,
        price: '$100',
        imageSource: require('../../../assets/images/user.png'),
        product: 'forex',
      },
      {
        id: 3,
        name: 'Sterling Josh',
        subscriptionType: 'monthly',
        stars: 4,
        price: '$50',
        imageSource: require('../../../assets/images/user.png'),
        product: 'crypto',
      },
      {
        id: 4,
        name: 'Jane Doe',
        subscriptionType: 'Annual Subscription',
        stars: 5,
        price: '$100',
        imageSource: require('../../../assets/images/user.png'),
        product: 'commodities',
      },
      // Add more sample transactions as needed
    ];
  };
  const [transactions, setTransactions] = useState(
    generateSampleTransactions(),
  );
  const {isDarkModeEnabled} = useTheme();
  const {width} = useWindowDimensions();

  const userData = [
    {
      id: 1,
      name: 'Lionel Ramos',
      imageSource: require('../../../assets/images/user.png'),
      rating: 4,
      price: '$34',
    },
    {
      id: 2,
      name: 'Jessica Smith',
      imageSource: require('../../../assets/images/user.png'),
      rating: 5,
      price: '$42',
    },
    {
      id: 3,
      name: 'Lionel Ramos',
      imageSource: require('../../../assets/images/user.png'),
      rating: 4,
      price: '$34',
    },
    {
      id: 5,
      name: 'Jessica Smith',
      imageSource: require('../../../assets/images/user.png'),
      rating: 5,
      price: '$42',
    },
    // Add more user data objects as needed
  ];

  const navigation = useNavigation();
  const handlePress = () => {
    // Navigate to profile details page, passing any necessary params
    navigation.navigate('ProfileDetailsPage' as never); // Adjust the screen name and params as needed
  };

  return (
    <SafeArea>
      <View style={{backgroundColor: '#f4f4f4', height: '100%'}}>
        <MainHeader goBackTwice />
        <BodyView color="#f4f4f4">
          <View style={{marginTop: 48}}>
            <BoldText textContent="Ibeneme Ikenna" />
            <RegularText
              textContent="@Ibeneme_"
            //  color="#808080"
              fontSize={14}
            />
          </View>
          <ScrollView horizontal contentContainerStyle={{paddingVertical: 24}}>
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

          <View style={{marginTop: 24, marginBottom: -12}}>
            <BoldText textContent="Most Rated" fontSize={16} />
            <RegularText
              textContent="Most Rated signal providers for the month"
              fontSize={13}
             // color="#808080"
            />
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: 6,
            }}>
            {userData.map(user => (
              <TouchableOpacity
                style={{
                  position: 'relative',
                  marginTop: user?.id > 2 ? -44 : 0,
                  marginBottom: user?.id > 2 ? 32 : 0,
                }}
                onPress={handlePress}>
                <Image
                  source={user.imageSource}
                  style={[styles.image, {width: width / 2.209}]}
                />
                <View style={styles.detailsContainer}>
                  <View style={{gap: 12}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 4,
                      }}>
                      <BoldText color="#fff" textContent={user.price} />
                    </View>
                    <View style={{marginTop: 40}}>
                      <BoldText
                        color="#fff"
                        textContent={user.name}
                        fontSize={13}
                      />
                      <View style={styles.starsContainer}>
                        {[...Array(5)].map((_, starIndex) => (
                          <Icon
                            key={starIndex}
                            name={
                              starIndex < user.rating
                                ? 'star-fill'
                                : 'star-half-s-line'
                            }
                            size={14}
                            color={Colors.primary}
                          />
                        ))}
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View
            style={{
              borderRadius: 12,
              paddingHorizontal: 12,
              paddingVertical: 12,
              backgroundColor: isDarkModeEnabled ? '#000000' : '#ffff',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}>
              <ScrollView
                horizontal
                contentContainerStyle={{gap: 12}}
                showsHorizontalScrollIndicator={false}>
                <TouchableOpacity
                  onPress={() => handleProductFilter('')}
                  style={{
                    backgroundColor:
                      productFilter === '' ? '#ffaa00' : '#ffaa0025',
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderRadius: 14,
                  }}>
                  <SemiBoldText
                    fontSize={14}
                    color={productFilter === '' ? '#fff' : '#ffaa00'}
                    textContent="All"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleProductFilter('crypto')}
                  style={{
                    backgroundColor:
                      productFilter === 'crypto' ? '#ffaa00' : '#ffaa0025',
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderRadius: 14,
                  }}>
                  <SemiBoldText
                    fontSize={14}
                    color={productFilter === 'crypto' ? '#fff' : '#ffaa00'}
                    textContent="Crypto"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleProductFilter('stocks')}
                  style={{
                    backgroundColor:
                      productFilter === 'stocks' ? '#ffaa00' : '#ffaa0025',
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderRadius: 14,
                  }}>
                  <SemiBoldText
                    fontSize={14}
                    color={productFilter === 'stocks' ? '#fff' : '#ffaa00'}
                    textContent="Stocks"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleProductFilter('forex')}
                  style={{
                    backgroundColor:
                      productFilter === 'forex' ? '#ffaa00' : '#ffaa0025',
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderRadius: 14,
                  }}>
                  <SemiBoldText
                    fontSize={14}
                    color={productFilter === 'forex' ? '#fff' : '#ffaa00'}
                    textContent="Forex"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleProductFilter('commodities')}
                  style={{
                    backgroundColor:
                      productFilter === 'commodities' ? '#ffaa00' : '#ffaa0025',
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderRadius: 14,
                  }}>
                  <SemiBoldText
                    fontSize={14}
                    color={productFilter === 'commodities' ? '#fff' : '#ffaa00'}
                    textContent="Commodities"
                  />
                </TouchableOpacity>
              </ScrollView>
            </View>

            {transactions
              .filter(
                transaction =>
                  productFilter === '' || transaction.product === productFilter,
              )
              .map(transaction => (
                <ClickableImage
                  key={transaction.id}
                  name={transaction.name}
                  subscriptionType={transaction.subscriptionType}
                  stars={transaction.stars}
                  price={transaction.price}
                  imageSource={transaction.imageSource}
                  isDarkModeEnabled={isDarkModeEnabled}
                  onPress={handlePress}
                />
              ))}
            {transactions.filter(
              transaction => transaction.product === productFilter,
            ).length === 0 && productFilter !== '' ? (
              <View style={{paddingVertical: 48}}>
                <BoldText
                  fontSize={14}
                  textAlign={true}
                  textContent={`No signal provided for ${productFilter}`}
                />
              </View>
            ) : null}
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

export default HomeScreen;
