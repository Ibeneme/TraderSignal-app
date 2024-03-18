import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  Modal,
} from 'react-native';
import SafeArea from '../../Component/SafeAreaViewCustom/SafeArea';
import MainHeader from '../../Component/Header/MainHeaders';
import BodyView from '../../Component/SafeAreaViewCustom/BodyView';
import {useTheme} from '../../Context/ThemeProvidr';
import ClickableImage from '../../Component/Component/ClickableImage';
import RegularText from '../../Component/Texts/RegularText';
import BoldText from '../../Component/Texts/BoldText';
import VerifiedBadge from '../../Component/icons/VerifiedBadge';
import FullBtn from '../../Component/Buttons/FullBtn';
import ReviewItem from '../../Component/Component/Review';
import SemiBoldText from '../../Component/Texts/SemiBoldText';
import {renderUserObject} from '../Signals/UserObject';
import TransparentHeader from '../../Component/Header/Transparent';
import {useNavigation} from '@react-navigation/core';
import Icon from 'react-native-remix-icon';
import {Colors} from '../../Component/Colors/Colors';

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
    firstName: 'Most Rated',
    lastName: 'Signal Call',
    username: '22nd February 2024',
    profilePicture: require('../../../assets/images/pic.png'),
    backgroundImage: require('../../../assets/images/post.png'),
  },
];

const ProfileDetailsPage: React.FC = () => {
  const {width} = useWindowDimensions();
  const {isDarkModeEnabled} = useTheme();

  const transaction = {
    id: 1,
    name: 'Sterling Josh',
    subscriptionType: 'Monthly Subscription',
    stars: 4,
    price: '$50',
    imageSource: require('../../../assets/images/user.png'),
    product: 'crypto',
  };

  const reviews = [
    {
      profilePic: require('../../../assets/images/user.png'),
      rating: 4.5,
      reviewText: 'This app is amazing! I love it.',
      verified: 'Simba Paula',
    },
    {
      profilePic: require('../../../assets/images/user.png'),
      rating: 3.8,
      reviewText: 'Good app, but needs improvement.',
      verified: 'Ebuka Simon',
    },
    // Add more reviews as needed
  ];
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSubscribe = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    navigation.navigate('CheckPay' as never);
  };

  return (
    <BodyView color="#f4f4f4" paddingHorizontal={true}>
      <View style={styles.container}>
        {/* <MainHeader /> */}
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View
            style={[
              styles.modalContainer,
              {backgroundColor: isDarkModeEnabled ? '#00000095' : '#00000095'},
            ]}>
            <View
              style={[
                styles.modalContent,
                {backgroundColor: isDarkModeEnabled ? '#000' : '#fff'},
              ]}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  backgroundColor: '#ffaa00',
                  padding: 8,
                  borderRadius: 244,
                  borderWidth: 2,
                  borderColor: '#fff',
                  width: 48,
                  marginBottom: 24,
                }}>
                <Icon name="arrow-left-s-line" size={24} color={'#fff'} />
              </TouchableOpacity>

              <BoldText textContent="Choose Subscription" />
              <TouchableOpacity
                style={[
                  {
                    marginTop: 24,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    width: '100%',
                  },
                ]}
                onPress={handleModalClose}>
                <View>
                  <SemiBoldText
                    fontSize={14}
                    textContent="Monthly Subscription"
                  />

                  <RegularText
                    fontSize={12}
                   // color="#808080"
                    textContent="Runs from 0 - 30days"
                  />
                </View>
                <BoldText textContent="$45" fontSize={24} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  {
                    marginTop: 24,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    width: '100%',
                  },
                ]}
                onPress={handleModalClose}>
                <View>
                  <SemiBoldText
                    fontSize={14}
                    textContent="Weekly Subscription"
                  />

                  <RegularText
                    fontSize={12}
                   // color="#808080"
                    textContent="Runs from 0 - 7days"
                  />
                </View>
                <BoldText textContent="$25" fontSize={24} />
              </TouchableOpacity>
              {/* Add more subscription options as needed */}
            </View>
          </View>
        </Modal>

        <Image
          source={require('../../../assets/images/user.png')}
          style={[{width: '100%', height: 300}]}
        />
        <View style={{position: 'absolute', top: 50, left: 16}}>
          <TouchableOpacity
            onPress={handleBackPress}
            style={{
              backgroundColor: '#ffaa00',
              padding: 8,
              borderRadius: 244,
              borderWidth: 2,
              borderColor: '#fff',
            }}>
            <Icon name="arrow-left-s-line" size={24} color={'#fff'} />
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.innerContainer,
            {
              backgroundColor: isDarkModeEnabled ? '#000' : '#fff',
              margin: 12,
              borderRadius: 12,
            },
          ]}>
          <View style={{margin: -8}}>
            <ClickableImage
              key={transaction.id}
              name={transaction.name}
              subscriptionType={transaction.subscriptionType}
              stars={transaction.stars}
              price={transaction.price}
              isDarkModeEnabled={isDarkModeEnabled}
            />

            <View style={{marginTop: 24}}>
              <RegularText
                textContent="Status"
                fontSize={12}
               // color={'#808080'}
              />
              <View
                style={{
                  flexDirection: 'row',
                  gap: 2,
                  alignItems: 'center',
                  marginTop: 0,
                }}>
                <BoldText textContent="Verified" fontSize={16} />
                <VerifiedBadge
                  width={16}
                  height={16}
                  color={isDarkModeEnabled ? '#ffaa00' : '#ffaa00'}
                />
              </View>
            </View>

            <FullBtn buttonText="Subscribe $50" onPress={handleSubscribe} />
          </View>
        </View>

        <View
          style={[
            styles.innerContainer,
            {
              backgroundColor: isDarkModeEnabled ? '#000' : '#fff',
              margin: 12,
              borderRadius: 12,
              marginTop: 0,
            },
          ]}>
          {users?.map((user, index) => (
            <TouchableOpacity
              key={index}
              style={{
                backgroundColor: isDarkModeEnabled ? '#000' : '#fff',
                marginVertical: 6,
                borderRadius: 16,
              }}
              // onPress={() => handleItemClick(user)}
            >
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
        </View>
        <View
          style={[
            styles.innerContainer,
            {
              backgroundColor: isDarkModeEnabled ? '#000' : '#fff',
              margin: 12,
              borderRadius: 12,
              marginTop: 0,
            },
          ]}>
          <View style={{paddingVertical: 8, gap: 24}}>
            <BoldText textContent="Reviews" fontSize={16} />
            <View>
              {reviews.map((review, index) => (
                <ReviewItem key={index} review={review} />
              ))}
            </View>
          </View>

          {/* Add more details as needed */}
        </View>
      </View>
    </BodyView>
  );
};

const styles = StyleSheet.create({
  container: {
    //margin: -14,
  },
  innerContainer: {
    flex: 1,
    // Assuming you want a white background
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 12
  
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    width: '100%',
    paddingBottom: 48

  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subscriptionOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  subscriptionOptionText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ProfileDetailsPage;
