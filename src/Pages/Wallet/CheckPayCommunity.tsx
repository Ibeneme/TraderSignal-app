import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  Alert,
  ToastAndroid,
  ActivityIndicator,
  ScrollView, // Import ToastAndroid for Android notifications
} from 'react-native';
import BodyView from '../../Component/SafeAreaViewCustom/BodyView';
import SafeArea from '../../Component/SafeAreaViewCustom/SafeArea';
import MainHeader from '../../Component/Header/MainHeaders';
import {useTheme} from '../../Context/ThemeProvidr';
import BoldText from '../../Component/Texts/BoldText';
import RegularText from '../../Component/Texts/RegularText';
import SemiBoldText from '../../Component/Texts/SemiBoldText';
import FullBtn from '../../Component/Buttons/FullBtn';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Icon from 'react-native-remix-icon';
import {Colors} from '../../Component/Colors/Colors';
import CreditCard from '../../Component/icons/CreditCard';
import MediumText from '../../Component/Texts/MediumText';
import Clipboard from '@react-native-clipboard/clipboard';
import CopyIcon from '../../Component/icons/CopyIcon';
import ImagePicker, {launchImageLibrary} from 'react-native-image-picker';
import UploadIcon from '../../Component/icons/UploadIcon';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../Redux/Store/Store';
import {
  createAcademyStatus,
  createComStatus,
  createProTraderStatus,
  createStatus,
  getUsersub,
  getWalletAddress,
} from '../../Redux/Subscriptions/Sub';
import {getCurrentUser, getUserProfile} from '../../Redux/Profile/Profile';
import ImageResizer from 'react-native-image-resizer';

interface Props {}

const CheckPayCommunity: React.FC<Props> = () => {
  const {isDarkModeEnabled} = useTheme();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [subDetails, setSubDetails] = useState([]);
  const [subDetailsJoin, setSubDetailsJoin] = useState([]);
  const [thisUser, setUser] = useState('');
  const [copiedToClipboard, setCopiedToClipboard] = useState(false); // State variable to track if text is copied
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  //TRKkaP6AEzCPVbs1usq1N7HrpzeTbhRLmj
  const [amount, setAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');

  const route = useRoute();
  const {type} = route.params || 'academy'; // Assuming userId is the name of the parameter
  console.log(type, 'typetype');
  useEffect(() => {
    dispatch(getCurrentUser())
      .then(response => {
        if (response?.payload?.user?._id) {
          dispatch(getUserProfile(response?.payload?.user?._id))
            .then(response => {
              // console.log('get profile retrieved:', response);
              setUser(response?.payload);
            })
            .catch(error => {});
        }
      })
      .catch(error => {});
    if (type === 'general') {
      dispatch(getWalletAddress('community'))
        .then(response => {
          console.log(response, 'walletAddress');
          setWalletAddress(response?.payload?.address);
        })
        .catch(error => {});
    } else if (type === 'academy') {
      dispatch(getWalletAddress('community'))
        .then(response => {
          console.log(response, 'walletAddress');
          setWalletAddress(response?.payload?.address);
        })
        .catch(error => {});
      //setWalletAddress('academy');
    } else {
      dispatch(getWalletAddress('community'))
        .then(response => {
          console.log(response, 'walletAddress');
          setWalletAddress(response?.payload?.address);
        })
        .catch(error => {});
      //setWalletAddress('pro-trader');
    }
  }, [dispatch]);

  const handleSubscriber = () => {
    console.log(thisUser, 'subDetails.durationInDaysdurationInDays');

    if (selectedImage) {
      console.log(`let's go`, selectedImage);

      const statusData = {
        subscriberId: thisUser?._id,
        status: 'pending',
      };

      const formData = new FormData();
      formData.append('image', {
        uri: selectedImage,
        type: 'image/jpeg', // Adjust the type according to your image file type
        name: 'image.jpg', // You can give any name you want here
      });

      console.log(statusData, 'statusData');
      setLoadingSubmit(true);

      if (type === 'pro_trader') {
        dispatch(
          createProTraderStatus({
            subscriberId: thisUser?._id,
            status: 'pending',
            image: formData,
          }),
        )
          .then(response => {
            setLoadingSubmit(false);
            if (response?.payload?.message === 'Status created successfully') {
              navigation.navigate('community' as never, {type});
              setModalVisible(false);
              Alert.alert(
                'Your payment received successfully. Awaiting confirmation.',
                '',
                [
                  {
                    text: 'OK',
                    onPress: () =>
                      navigation.navigate('community' as never, {type}),
                  },
                ],
              );
            }

            // Handle success response here
            console.log('Success:', response);
          })
          .catch(error => {
            setLoadingSubmit(false);
            // Handle error here
            console.error('Error:', error);
          });
      } else if (type === 'general') {
        dispatch(
          createComStatus({
            subscriberId: thisUser?._id,
            status: 'pending',
            image: formData,
          }),
        )
          .then(response => {
            setLoadingSubmit(false);
            if (response?.payload?.message === 'Status created successfully') {
              navigation.navigate('community' as never, {type});
              setModalVisible(false);
              Alert.alert(
                'Your payment received successfully. Awaiting confirmation.',
                '',
                [
                  {
                    text: 'OK',
                    onPress: () =>
                      navigation.navigate('community' as never, {type}),
                  },
                ],
              );
            }

            // Handle success response here
            console.log('Success:', response);
          })
          .catch(error => {
            setLoadingSubmit(false);
            // Handle error here
            console.error('Error:', error);
          });
      } else if (type === 'academy') {
        dispatch(
          createAcademyStatus({
            subscriberId: thisUser?._id,
            status: 'pending',
            image: formData,
          }),
        )
          .then(response => {
            setLoadingSubmit(false);
            if (response?.payload?.message === 'Status created successfully') {
              navigation.navigate('community' as never, {type});
              setModalVisible(false);
              Alert.alert(
                'Your payment received successfully. Awaiting confirmation.',
                '',
                [
                  {
                    text: 'OK',
                    onPress: () =>
                      navigation.navigate('community' as never, {type}),
                  },
                ],
              );
            }

            // Handle success response here
            console.log('Success:', response);
          })
          .catch(error => {
            setLoadingSubmit(false);
            // Handle error here
            console.error('Error:', error);
          });
      }
    } else {
      console.log(`lol's go`);
    }
  };

  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, async response => {
      if (!response.didCancel) {
        const fileSizeInBytes = response.assets[0]?.fileSize;
        if (fileSizeInBytes && fileSizeInBytes > 10 * 1024 * 1024) {
          // Display an alert if file size exceeds 10MB
          Alert.alert('File Size Exceeded', 'File size should be below 10MB');
        } else {
          const newWidth = 300;
          const newHeight = 500;
          const quality = 100;
          const selectedImage = response.assets[0].uri;
          try {
            // Resize the image before uploading
            const resizedImage = await ImageResizer.createResizedImage(
              selectedImage,
              newWidth, // Specify the width you want for the resized image
              newHeight, // Specify the height you want for the resized image
              'JPEG', // Image format (JPEG, PNG)
              quality, // Image quality (0 to 100)
            );

            // Set the selected image URI if file size is within the limit
            setSelectedImage(resizedImage.uri);
          } catch (error) {
            console.error('Error resizing image:', error);
            // Handle error, e.g., display an alert to the user
            Alert.alert('Error', 'Failed to resize image');
          }
        }
      }
    });
  };

  const handleModalClose = () => {
    setModalVisible(false);
    //navigation.navigate('CheckPay' as never);
  };
  const handleCopyToClipboard = text => {
    Clipboard.setString(text);
    setCopiedToClipboard(true); // Set the state variable to true when text is copied
  };
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const today = formatDate(new Date());

  useEffect(() => {
    if (copiedToClipboard) {
      // Show notification when text is copied to clipboard
      ToastAndroid.show('Text Copied to Clipboard', ToastAndroid.SHORT);
      setCopiedToClipboard(false); // Reset the state variable after showing the notification
    }
  }, [copiedToClipboard]);

  return (
    <SafeArea>
      <MainHeader />
      <BodyView paddingHorizontal={true}>
        <View style={{padding: 12, marginTop: 36}}>
          <View
            style={{
              marginTop: 24,
              alignSelf: 'flex-start',
              backgroundColor: '#ffaa0012',
              padding: 16,
              borderRadius: 36,
              marginBottom: 16,
            }}>
            <CreditCard color="#ffaa00" width={32} height={32} />
          </View>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              fontFamily: 'Plus Jakarta Sans Bold',
              fontWeight: 900,
              marginTop: 24,
            }}>
            Subscribe to{' '}
            {type === 'general' && 'Join our Community for General Users'}
            {type === 'pro_trader' && 'Join our Community for Pro Traders'}
            {type === 'academy' && 'Join our Academy'}
          </Text>
          <Text
            style={{
              color: '#ffaa00',
              fontSize: 48,
              fontFamily: 'Plus Jakarta Sans Bold',
              fontWeight: 900,
              marginTop: 24,
            }}>
            {type === 'general' && '$1'}
            {type === 'pro_trader' && '$10'}
            {type === 'academy' && '$3.5'}
            <Text
              style={{
                color: '#ffaa00',
                fontSize: 16,
                fontFamily: 'Plus Jakarta Sans Bold',
                fontWeight: 900,
                marginTop: 6,
              }}>
              monthly
            </Text>
          </Text>
        </View>
        <View
          style={{
            backgroundColor: '#ffaa0015',
            padding: 12,
            borderLeftWidth: 4,
            borderLeftColor: '#ffaa00',
            margin: 16,
          }}>
          <MediumText
            fontSize={12}
            color="#ffaa00"
            textContent="Ensure you copy the valid USDT Trc-20 address, sending USDT to the wrong address is not refundable, ensure you use the description as transaction narration, failure to may lead to loss of assets"
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            marginTop: 32,
            width: '100%',
            gap: -8,
            padding: 12,
          }}>
          <Text
            style={{
              fontFamily: 'Plus Jakarta Sans Bold',
              fontWeight: 900,
              fontSize: 14,
              marginVertical: 4,
              marginBottom: 16,
              color: '#fff',
            }}>
            Transaction Description
          </Text>
          <View
            style={{
              backgroundColor: '#ffffff10',
              borderRadius: 12,
              paddingVertical: 12,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                paddingHorizontal: 16,
                paddingVertical: 4,
              }}
              onPress={() =>
                handleCopyToClipboard(
                  `${thisUser?.email}-${'community'}-${today}-${type}-${
                    thisUser?.firstName
                  }`,
                )
              }>
              <Text
                style={{
                  fontFamily: 'Plus Jakarta Sans Medium',
                  fontSize: 14,
                  color: '#fff',
                  width: '95%',
                  height: 24,
                }}
                onLongPress={() =>
                  handleCopyToClipboard(
                    `${thisUser?.email}-${'community'}-${today}-${type}-${
                      thisUser?.firstName
                    }`,
                  )
                }>
                {`${
                  thisUser?.email && today
                    ? `${thisUser?.email}-${'community'}-${today}-${type}-${
                        thisUser?.firstName
                      }
                    `
                    : 'Loading.....'
                }`}
              </Text>

              <View style={{width: '12%'}}>
                <CopyIcon color="#ffaa00" width={24} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            marginTop: 32,
            width: '100%',
            gap: -8,
            padding: 12,
          }}>
          <Text
            style={{
              fontFamily: 'Plus Jakarta Sans Bold',
              fontWeight: 900,
              fontSize: 14,
              marginVertical: 4,
              marginBottom: 16,
              color: '#fff',
            }}>
            Wallet Address
          </Text>
          <View
            style={{
              backgroundColor: '#ffffff10',
              borderRadius: 12,
              paddingVertical: 12,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                paddingHorizontal: 16,
                paddingVertical: 4,
              }}
              onPress={() => handleCopyToClipboard(`${walletAddress}`)}>
              <Text
                style={{
                  fontFamily: 'Plus Jakarta Sans Medium',
                  fontSize: 14,
                  color: '#fff',
                  width: '95%',
                  height: 24,
                }}
                onLongPress={() => handleCopyToClipboard(`${walletAddress}`)}>
                {walletAddress}
              </Text>

              <View style={{width: '12%'}}>
                <CopyIcon color="#ffaa00" width={24} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button]}
          onPress={() => setModalVisible(true)} // handleSubmit is already provided by Formik
          //disabled={loading || isSubmitting}
        >
          <Text
            style={{
              fontFamily: 'Plus Jakarta Sans Regular',
              fontSize: 14,
              color: Colors.newBG,
            }}>
            Sent
          </Text>
        </TouchableOpacity>
      </BodyView>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View
          style={[
            styles.modalContainer,
            {backgroundColor: isDarkModeEnabled ? '#00000045' : '#00000045'},
          ]}>
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: isDarkModeEnabled
                  ? Colors.newBG
                  : Colors.newBG,
                borderWidth: 1.3,
                paddingVertical: 32,
                borderColor: '#ffaa00',
              },
            ]}>
            <ScrollView>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  backgroundColor: '#ffaa0017',
                  padding: 8,
                  borderRadius: 244,
                  height: 36,
                  width: 36,
                  marginBottom: 24,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon name="arrow-left-s-line" size={24} color={'#ffaa00'} />
              </TouchableOpacity>

              <BoldText
                fontSize={16}
                textContent="Upload a Screenshot of your transaction"
              />
              <ScrollView>
                {selectedImage ? (
                  <Image
                    source={{uri: selectedImage}}
                    style={{
                      width: 130,
                      height: 260,
                      marginTop: 16,
                      alignSelf: 'center',
                      borderRadius: 12,
                    }}
                  />
                ) : (
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      height: 200,
                      marginTop: 16,
                      alignSelf: 'center',
                      borderRadius: 12,
                      backgroundColor: '#ffaa0025',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={handleImagePicker}>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <UploadIcon color="#ffaa00" height={32} width={32} />
                      <Text
                        style={{
                          color: '#ffaa00',
                          fontSize: 14,
                          fontFamily: 'Plus Jakarta Sans SemiBold',
                        }}>
                        {' '}
                        Tap to Upload an Image
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </ScrollView>

              <View style={{marginTop: 32}}>
                <TouchableOpacity
                  style={[
                    styles.buttonNew,
                    loadingSubmit && {backgroundColor: '#ccc'},
                  ]}
                  onPress={handleSubscriber} // handleSubmit is already provided by Formik
                  disabled={loadingSubmit}>
                  {loadingSubmit ? (
                    <ActivityIndicator color={Colors.newBG} /> // Show activity indicator while loading
                  ) : (
                    <Text
                      style={{
                        fontFamily: 'Plus Jakarta Sans Regular',
                        fontSize: 14,
                        color: Colors.newBG,
                      }}>
                      Upload your transaction Receipt
                    </Text>
                  )}
                </TouchableOpacity>
                <View>
                  {loadingSubmit ? null : (
                    <TouchableOpacity onPress={handleImagePicker}>
                      <Text
                        style={{
                          color: '#ffaa00',
                          fontSize: 14,
                          fontFamily: 'Plus Jakarta Sans SemiBold',
                          textAlign: 'center',
                          marginVertical: 16,
                        }}>
                        Tap to Change Image
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </ScrollView>
            {/* Display selected image */}
          </View>
        </View>
      </Modal>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '93%',
    margin: 12,
    borderRadius: 24,
    padding: 16,
    paddingTop: 24,
  },
  transactionNarration: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 12,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    width: '100%',
    height: '75%',
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
  buttonNew: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 12,
  },

  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 120,
    marginHorizontal: 12,
  },
});

export default CheckPayCommunity;
