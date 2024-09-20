import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Animated,
  Text,
  Modal,
  Linking,
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
import ProfileHeaders from '../../Component/Header/ProfileHeaders';
import VerifiedBadge from '../../Component/icons/VerifiedBadge';
import {useDispatch} from 'react-redux';
import {
  deleteUser,
  getCurrentUser,
  getUserProfile,
} from '../../Redux/Profile/Profile';
import {AppDispatch} from '../../Redux/Store/Store';
import Loader from '../../Component/Component/Loader';
import {useFocusEffect} from '@react-navigation/native';
import {logout, logoutUs} from '../../Redux/Auth/Auth';
import RNSecureStorage from 'rn-secure-storage';
import FastImage from 'react-native-fast-image';
const NewProfileScreen: React.FC = () => {
  const navigation = useNavigation();

  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [thisUser, setUser] = useState('');
  const [profilePics, setProfilePic] = useState('');
  const [pageIslLoading, setPageIsLoading] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUs());
    dispatch(logout());
    removeCredentials();
  };

  const handleDelete = () => {
    dispatch(deleteUser())
      .then(response => {
        removeCredentials();
        dispatch(logoutUs());
        dispatch(logout());
        console.log('User profile retrieved:', response);
      })
      .catch(error => {});
  };
  useEffect(() => {
    // Retrieve email and password from secure storage
    const getEmailAndPassword = async () => {
      try {
        const email = await RNSecureStorage.getItem('email');
        const password = await RNSecureStorage.getItem('password');
        console.log('Stored email:', email);
        console.log('Stored password:', password);
      } catch (error) {
        console.error('Error retrieving email and password:', error);
      }
    };

    getEmailAndPassword();
  }, []);

  const removeCredentials = async () => {
    try {
      await RNSecureStorage.removeItem('email');
      await RNSecureStorage.removeItem('password');
      console.log('Stored email and password removed successfully.');
    } catch (error) {
      console.error('Error removing stored email and password:', error);
    }
  };

  useEffect(() => {
    //setPageIsLoading(true);
    dispatch(getCurrentUser())
      .then(response => {
        console.log('User profile retrieved:', response);
        console.log('User profile retrieved:', response?.payload?.user?._id);
        if (response?.payload?.user?._id) {
          dispatch(getUserProfile(response?.payload?.user?._id))
            .then(response => {
              console.log('get profile retrieved:', response);
              setUser(response?.payload);
              setProfilePic(response?.payload?.profilePhoto);
              setPageIsLoading(false);
            })
            .catch(error => {
              setPageIsLoading(false);
              console.error('Error retrieving user profile:', error);
            });
        }
      })
      .catch(error => {
        setPageIsLoading(false);
        console.error('Error retrieving user profile:', error);
      });
  }, [dispatch]);

  useFocusEffect(
    React.useCallback(() => {
      //setPageIsLoading(true);
      dispatch(getCurrentUser())
        .then(response => {
          console.log('User profile retrieved:', response);
          console.log('User profile retrieved:', response?.payload?.user?._id);
          if (response?.payload?.user?._id) {
            dispatch(getUserProfile(response?.payload?.user?._id))
              .then(response => {
                console.log('get profile retrieved:', response);
                setUser(response?.payload);
                setProfilePic(response?.payload?.profilePhoto);
                //setPageIsLoading(false);
              })
              .catch(error => {
                //setPageIsLoading(false);
                console.error('Error retrieving user profile:', error);
              });
          }
        })
        .catch(error => {
          //setPageIsLoading(false);
          console.error('Error retrieving user profile:', error);
        });

      return () => {
        // Cleanup function when screen is unfocused
      };
    }, [dispatch]),
  );

  return (
    <SafeArea>
      <View style={{backgroundColor: '#f4f4f4', height: '100%'}}>
        <ProfileHeaders />

        {pageIslLoading ? (
          <Loader />
        ) : (
          <BodyView color="#f4f4f4">
            <View
              style={{
                //backgroundColor: isDarkModeEnabled ? '#00000045' : '#fff',
                //padding: 12,
                borderRadius: 24,
                marginTop: 12,
              }}>
              <FastImage
                source={require('../../../assets/images/profileheaderbg.png')}
                style={{width: '100%', height: 80, marginBottom: 12}}
                resizeMode={FastImage.resizeMode.cover}
              />
              <View
                style={{
                  flexDirection: 'column',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: -64,
                }}>
                {profilePics === null ? (
                  <TouchableOpacity
                    //onPress={handleUserImageClick}
                    style={{
                      padding: 14,
                      backgroundColor: Colors.newBG,
                      borderRadius: 64,
                      borderWidth: 3,
                      width: 96,
                      height: 96,
                      borderColor: Colors.primary,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon name="user-line" size={36} color={Colors?.primary} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    //onPress={handleUserImageClick}
                    style={{
                      padding: 14,
                      backgroundColor: Colors.newBG,
                      borderRadius: 64,
                      borderWidth: 3,
                      width: 96,
                      height: 96,
                      borderColor: Colors.primary,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <FastImage
                      resizeMode={FastImage.resizeMode.cover}
                      source={{
                        uri: profilePics,
                        priority: FastImage.priority.high,
                      }} // Use selected image URI
                      style={{width: 86, height: 86, borderRadius: 333}} // Set appropriate styling
                    />
                  </TouchableOpacity>
                )}
                <Text
                  style={{
                    fontFamily: 'Plus Jakarta Sans Bold',
                    fontWeight: 900,
                    fontSize: 16,
                    marginVertical: 4,
                    marginBottom: 2,
                    color: '#fff',
                    marginTop: 12,
                  }}>
                  {thisUser?.firstName} {thisUser?.lastName}
                </Text>

                <View style={{flexDirection: 'row', gap: 2}}>
                  <Text
                    style={{
                      fontFamily: 'Plus Jakarta Sans Regular',
                      fontSize: 12,
                      marginVertical: 4,
                      marginBottom: 32,
                      color: '#fff',
                    }}>
                    {thisUser?.email}
                  </Text>
                  {thisUser?.verified === true ? (
                    <VerifiedBadge color="#ffaa00" width={16} />
                  ) : null}
                </View>

                <View
                  style={{
                    justifyContent: 'center',
                    marginTop: 32,
                    width: '100%',
                    gap: -8,
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
                    General
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
                        paddingHorizontal: 12,
                      }}
                      onPress={() =>
                        navigation.navigate('GetUserProfileScreen' as never)
                      }>
                      <Text
                        style={{
                          fontFamily: 'Plus Jakarta Sans Medium',
                          fontSize: 14,
                          color: '#fff',
                        }}>
                        {' '}
                        My Profile
                      </Text>
                      <Icon
                        name="arrow-right-s-line"
                        size={24}
                        color={'#fff'}
                      />
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                        paddingHorizontal: 12,
                        paddingVertical: 12,
                      }}
                      onPress={() =>
                        navigation.navigate('CommunityChat' as never)
                      }>
                      <Text
                        style={{
                          fontFamily: 'Plus Jakarta Sans Medium',
                          fontSize: 14,
                          color: '#fff',
                        }}>
                        {' '}
                        Community Chat
                      </Text>
                      <Icon
                        name="arrow-right-s-line"
                        size={24}
                        color={'#fff'}
                      />
                    </TouchableOpacity> */}
                  </View>
                </View>

                <View
                  style={{
                    justifyContent: 'center',
                    marginTop: 32,
                    width: '100%',
                    gap: -8,
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
                    Subscriptions
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
                        paddingHorizontal: 12,
                        paddingVertical: 12,
                      }}
                      onPress={() => navigation.navigate('MySubs' as never)}>
                      <Text
                        style={{
                          fontFamily: 'Plus Jakarta Sans Medium',
                          fontSize: 14,
                          color: '#fff',
                        }}>
                        {' '}
                        Subscription Channels
                      </Text>
                      <Icon
                        name="arrow-right-s-line"
                        size={24}
                        color={'#fff'}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                        paddingHorizontal: 12,
                        paddingVertical: 12,
                      }}
                      onPress={() =>
                        navigation.navigate('MySubscription' as never)
                      }>
                      <Text
                        style={{
                          fontFamily: 'Plus Jakarta Sans Medium',
                          fontSize: 14,
                          color: '#fff',
                        }}>
                        {' '}
                        Subscriptions History
                      </Text>
                      <Icon
                        name="arrow-right-s-line"
                        size={24}
                        color={'#fff'}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                        paddingHorizontal: 12,
                        paddingVertical: 12,
                      }}
                      onPress={() =>
                        navigation.navigate('comsuball', {type: 'general'})
                      }>
                      <Text
                        style={{
                          fontFamily: 'Plus Jakarta Sans Medium',
                          fontSize: 14,
                          color: '#fff',
                        }}>
                        {' '}
                        Community Subscription History
                      </Text>
                      <Icon
                        name="arrow-right-s-line"
                        size={24}
                        color={'#fff'}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                        paddingHorizontal: 12,
                        paddingVertical: 12,
                      }}
                      onPress={() =>
                        navigation.navigate('comsuball', {type: 'pro_trader'})
                      }>
                      <Text
                        style={{
                          fontFamily: 'Plus Jakarta Sans Medium',
                          fontSize: 14,
                          color: '#fff',
                        }}>
                        {' '}
                        Pro Trader Subscription History
                      </Text>
                      <Icon
                        name="arrow-right-s-line"
                        size={24}
                        color={'#fff'}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                        paddingHorizontal: 12,
                        paddingVertical: 12,
                      }}
                      onPress={() =>
                        navigation.navigate('comsuball', {type: 'academy'})
                      }>
                      <Text
                        style={{
                          fontFamily: 'Plus Jakarta Sans Medium',
                          fontSize: 14,
                          color: '#fff',
                        }}>
                        {' '}
                        Academy Subscription History
                      </Text>
                      <Icon
                        name="arrow-right-s-line"
                        size={24}
                        color={'#fff'}
                      />
                    </TouchableOpacity>

                    {thisUser?.provider === true ? (
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          justifyContent: 'space-between',
                          paddingHorizontal: 12,
                          paddingVertical: 12,
                        }}
                        onPress={() =>
                          navigation.navigate('MyBalanceScreen' as never)
                        }>
                        <Text
                          style={{
                            fontFamily: 'Plus Jakarta Sans Medium',
                            fontSize: 14,
                            color: '#fff',
                          }}>
                          {' '}
                          Balance and Earnings
                        </Text>
                        <Icon
                          name="arrow-right-s-line"
                          size={24}
                          color={'#fff'}
                        />
                      </TouchableOpacity>
                    ) : null}
                  </View>
                </View>

                <View
                  style={{
                    justifyContent: 'center',
                    marginTop: 32,
                    width: '100%',
                    gap: -8,
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
                    Support
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
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                      }}
                      onPress={() => navigation.navigate('FAQScreen' as never)}>
                      <Text
                        style={{
                          fontFamily: 'Plus Jakarta Sans Medium',
                          fontSize: 14,
                          color: '#fff',
                        }}>
                        {' '}
                        FAQs
                      </Text>
                      <Icon
                        name="arrow-right-s-line"
                        size={24}
                        color={'#fff'}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                      }}
                      onPress={() => {
                        Linking.openURL('mailto:getotisignals@gmail.com');
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Plus Jakarta Sans Medium',
                          fontSize: 14,
                          color: '#fff',
                        }}>
                        {' '}
                        Contact Support
                      </Text>
                      <Icon
                        name="arrow-right-s-line"
                        size={24}
                        color={'#fff'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    justifyContent: 'center',
                    marginTop: 32,
                    width: '100%',
                    gap: -8,
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
                    More
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
                        paddingHorizontal: 12,
                        // paddingVertical: 12,
                      }}
                      onPress={() => setShowModal(true)}>
                      <Text
                        style={{
                          fontFamily: 'Plus Jakarta Sans Medium',
                          fontSize: 14,
                          color: '#fff',
                        }}>
                        {' '}
                        Logout
                      </Text>
                      <Icon
                        name="arrow-right-s-line"
                        size={24}
                        color={'#fff'}
                      />
                    </TouchableOpacity>

                    {thisUser?.provider === true ? null : thisUser
                        ?.profilePhotoOrVideo?.length > 0 ? (
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          justifyContent: 'space-between',
                          paddingHorizontal: 12,
                          paddingVertical: 12,
                        }}
                        onPress={() =>
                          //Niche
                          //KYCOptionsPage

                          navigation.navigate('NextKYCOptionsPage' as never)
                        }>
                        <Text
                          style={{
                            fontFamily: 'Plus Jakarta Sans Medium',
                            fontSize: 14,
                            color: '#fff',
                          }}>
                          {' '}
                          Become a Provider
                        </Text>

                        <View style={{flexDirection: 'row', gap: 12}}>
                          <View
                            style={{
                              paddingHorizontal: 12,
                              paddingVertical: 6,
                              backgroundColor: '#ffaa0029',
                            }}>
                            <Text
                              style={{
                                fontFamily: 'Plus Jakarta Sans SemiBold',
                                color: '#FFAA00',
                                fontSize: 12,
                              }}>
                              Pending
                            </Text>
                          </View>
                          <Icon
                            name="arrow-right-s-line"
                            size={24}
                            color={'#fff'}
                          />
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          justifyContent: 'space-between',
                          paddingHorizontal: 12,
                          paddingVertical: 12,
                        }}
                        onPress={() => navigation.navigate('Niche' as never)}>
                        <Text
                          style={{
                            fontFamily: 'Plus Jakarta Sans Medium',
                            fontSize: 14,
                            color: '#fff',
                          }}>
                          {' '}
                          Become a Provider
                        </Text>
                        <Icon
                          name="arrow-right-s-line"
                          size={24}
                          color={'#fff'}
                        />
                      </TouchableOpacity>
                    )}
                  </View>

                  <View
                    style={{
                      backgroundColor: '#ff000030',
                      borderRadius: 12,
                      marginVertical: 36,
                      paddingVertical: 6,
                    }}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                      }}
                      onPress={() => setShowModalDelete(true)}>
                      <Text
                        style={{
                          fontFamily: 'Plus Jakarta Sans SemiBold',
                          fontSize: 14,
                          color: '#ff0000',
                        }}>
                        {' '}
                        Delete Account
                      </Text>
                      <Icon
                        name="arrow-right-s-line"
                        size={24}
                        color={'#ff0000'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <Modal
                visible={showModal}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setShowModal(false)}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Text style={[styles.modalTitle, {marginTop: 24}]}>
                      Confirm you want to Logout
                    </Text>

                    <Text style={styles.modalText}>
                      Logging out, to log back in you'll use your email and
                      password
                    </Text>
                    <TouchableOpacity
                      style={[styles.modalButtonLine, {width: '100%'}]}
                      //</View> onPress={() => navigation.navigate('LoginScreen')}
                      onPress={() => setShowModal(false)}>
                      <Text style={styles.modalButtonTextLine}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.modalButton,
                        {width: '100%', marginTop: 10},
                      ]}
                      onPress={handleLogout}
                      //</View> onPress={() => navigation.navigate('LoginScreen')}
                    >
                      <Text style={styles.modalButtonText}>Logout</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>

              <Modal
                visible={showModalDelete}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setShowModalDelete(false)}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Text style={[styles.modalTitle, {marginTop: 24}]}>
                      Confirm you want to Delete Account
                    </Text>
                    <Text style={styles.modalText}>
                      Deleting your account will deactivate it permanently. Are
                      you sure you want to proceed?
                    </Text>

                    <TouchableOpacity
                      style={[styles.modalButtonLine, {width: '100%'}]}
                      //</View> onPress={() => navigation.navigate('LoginScreen')}
                      onPress={() => setShowModalDelete(false)}>
                      <Text style={styles.modalButtonTextLine}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.modalButton,
                        {width: '100%', marginTop: 10},
                      ]}
                      onPress={handleDelete}
                      //</View> onPress={() => navigation.navigate('LoginScreen')}
                    >
                      <Text style={styles.modalButtonText}>Delete Account</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>

              <View style={{marginBottom: 84}}></View>
            </View>
          </BodyView>
        )}
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
    paddingVertical: 8,
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

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
  },
  modalContent: {
    backgroundColor: Colors.newBG,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: '#FF000F',
    borderWidth: 2,
    width: '100%',
  },
  modalTitle: {
    fontFamily: 'Plus Jakarta Sans Bold',
    fontWeight: 900,
    fontSize: 16,
    marginBottom: 10,
    color: '#fff',
  },
  modalText: {
    fontFamily: 'Plus Jakarta Sans Regular',
    fontSize: 13,
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  modalButton: {
    backgroundColor: '#FF000F',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 5,
    marginTop: 36,
  },
  modalButtonLine: {
    backgroundColor: 'transparent',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 5,
    marginTop: 36,
    borderWidth: 1.3,
    borderColor: '#FF000F',
  },
  modalButtonTextLine: {
    fontFamily: 'Plus Jakarta Sans SemiBold',
    fontSize: 14,
    color: '#FF000F',
    textAlign: 'center',
  },
  modalButtonText: {
    fontFamily: 'Plus Jakarta Sans SemiBold',
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
});

export default NewProfileScreen;
