import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import SafeArea from '../../Component/SafeAreaViewCustom/SafeArea';
import {Formik} from 'formik';
import * as Yup from 'yup';
import NewCustomTextInput from '../../Component/CustomInputs/NewCustomTextInput';
import {Colors} from '../../Component/Colors/Colors';
import ProfileHeaders from '../../Component/Header/ProfileHeaders';
import BodyView from '../../Component/SafeAreaViewCustom/BodyView';
import Icon from 'react-native-remix-icon';
import CreditCard from '../../Component/icons/CreditCard';
import Channels from '../../Component/icons/Channels';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../Redux/Store/Store';
import {
  getCurrentUser,
  getFreeCommunityFollowed,
  getSingleUser,
  getUserProfile,
} from '../../Redux/Profile/Profile';
import {
  getUsersSubCreated,
  getUsersub,
  getUsersubJoined,
} from '../../Redux/Subscriptions/Sub';
import {useNavigation} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';

const MySubsCommunities: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false); // State to control visibility
  const [subType, setSubType] = useState('created'); // State to track subscription type
  const toggleVisibility = (type: string) => {
    setIsVisible(!isVisible); // Toggle visibility state
    setSubType(type); // Set subscription type
  };

  const dispatch = useDispatch<AppDispatch>();
  const [subDetails, setSubDetails] = useState([]);
  const [subDetailsJoin, setSubDetailsJoin] = useState([]);
  const [userFetched, setUserFetched] = useState([]);
  const [followsDetails, setFollowsDetails] = useState([]);
  const [freeCommunityFollowed, setFreeCommunityFollowed] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getCurrentUser())
        .then(response => {
          if (response?.payload?.user?._id) {
            dispatch(getUserProfile(response?.payload?.user?._id))
              .then(response => {
                setUserFetched(response?.payload);
                getYouSelf(response?.payload?.provider);
              })
              .catch(error => {});
            dispatch(getUsersSubCreated(response?.payload?.user?._id))
              .then(response => {
                setSubDetails(response?.payload);
              })
              .catch(error => {});

            dispatch(getUsersubJoined(response?.payload?.user?._id))
              .then(response => {
                setSubDetailsJoin(response?.payload);
              })
              .catch(error => {});

            dispatch(getFreeCommunityFollowed(response?.payload?.user?._id))
              .then(response => {
                const followedIds = response?.payload?.freeCommunityFollowed;
                setFreeCommunityFollowed(followedIds);
                const fetchPromises = followedIds?.map(followedId =>
                  dispatch(getSingleUser(followedId)),
                );

                Promise.all(fetchPromises).then(followedUsersResponses => {
                  const userDetails = followedUsersResponses.map(
                    userRes => userRes.payload,
                  );
                  setFollowsDetails(userDetails); // Save details of all followed users
                });
              })
              .catch(error => {});
          }
        })
        .catch(error => {});

      dispatch(getCurrentUser())
        .then(response => {
          if (response?.payload?.user?._id) {
            dispatch(getUsersSubCreated(response?.payload?.user?._id))
              .then(response => {
                setSubDetails(response?.payload);
              })
              .catch(error => {});
            dispatch(getUsersubJoined(response?.payload?.user?._id))
              .then(response => {
                setSubDetailsJoin(response?.payload);
              })
              .catch(error => {});
          }
        })
        .catch(error => {});
    }, [dispatch]),
  );

  const [yourSelf, getYouSelf] = useState(false);
  useEffect(() => {}, [dispatch]);

  const {fontScale} = useWindowDimensions();
  const navigation = useNavigation();

  const sortSubscriptionsByDate = (subscriptions: any) => {
    return subscriptions.sort(
      (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt),
    );
  };

  //console.log(followsDetails, 'pspskssj');

  const handleNavigation = type => {
    if (userFetched?.communitySub === true) {
      //navigation.navigate('CommunityChat' as never);
      navigation.navigate('FreeCommunitySocket', {
        freeCommunityId: 'General User',
      });
    } else if (userFetched?.communitySubWaiting === true) {
      navigation.navigate('community' as never, {type});
    } else {
      navigation.navigate('CheckPayCommunity', {type});
      // navigation.navigate('Benefits', {type} as never);
    } //CheckPayCommunity
  };

  const handleNavigationProTrader = type => {
    navigation.navigate('CheckPayCommunity', {type});
   
    if (userFetched?.proTraderSub === true) {
      navigation.navigate('FreeCommunitySocket', {
        freeCommunityId: 'Pro Trader',
      });
    } else if (userFetched?.proTraderSubWaiting === true) {
      navigation.navigate('community' as never, {type});
    } else {
      navigation.navigate('CheckPayCommunity', {type});
      // navigation.navigate('Benefits', {type} as never);
    } //CheckPayCommunity
  };

  const handleNavigationAcademy = type => {
    navigation.navigate('CheckPayCommunity', {type});
   
    if (
      
      userFetched?.academySub === true ||
      userFetched?.proTraderSub === true
    ) {
      navigation.navigate('CoursePageHome' as never);
    } else if (userFetched?.academySubWaiting === true) {
      navigation.navigate('community' as never, {type});
    } else {
      navigation.navigate('CheckPayCommunity', {type});
      // navigation.navigate('Benefits', {type} as never);
    } //CheckPayCommunity

    // navigation.navigate('CoursePageHome' as never);
  };
  const handleNavigationProvidersCommunity = () => {
    navigation.navigate('FreeCommunitySocket' as never);
  };
  //
  return (
    <SafeArea>
      <View style={styles.container}>
        <ProfileHeaders />
        <ScrollView style={{backgroundColor: Colors.newBG}}>
          <View style={styles.formContainer}>
            <View
              style={{
                marginTop: 24,
                alignSelf: 'flex-start',
                backgroundColor: '#ffaa0012',
                padding: 10,
                borderRadius: 36,
                marginBottom: 16,
              }}>
              <Icon name="message-3-fill" size={16} color={Colors.primary} />
            </View>
            <Text
              style={{
                fontFamily: 'Plus Jakarta Sans Bold',
                fontWeight: 900,
                fontSize: 18,
                color: '#fff',

                alignSelf: 'flex-start',
              }}>
              Communities
            </Text>
            <Text
              style={{
                fontFamily: 'Plus Jakarta Sans Regular',
                fontSize: 13,
                marginVertical: 4,
                marginBottom: 32,
                color: '#fff',
                alignSelf: 'flex-start',
              }}>
              View all your Communities here
            </Text>

            <View style={{gap: 8}}>
              <View style={{marginBottom: 48}}>
                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-start',
                    backgroundColor: '#ffaa00',
                    padding: 10,
                    width: '100%',
                    borderRadius: 12,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  onPress={() => navigation.navigate('Channels' as never)}>
                  <Text
                    style={{
                      fontFamily: 'Plus Jakarta Sans Bold',
                      fontSize: 13,
                      color: '#000',
                      fontWeight: 900,
                      alignSelf: 'flex-start',
                      paddingVertical: 8,
                    }}>
                    Premium Subscriptions Channels
                  </Text>

                  <Icon name="arrow-right-s-line" size={24} color={'#000'} />
                </TouchableOpacity>
              </View>

              <Text
                style={{
                  fontFamily: 'Plus Jakarta Sans Bold',
                  fontSize: 14,
                  color: '#fff',
                  fontWeight: 900,
                  alignSelf: 'flex-start',
                  paddingVertical: 8,
                  marginTop: -16,
                }}>
                OTI Communities
              </Text>

              <TouchableOpacity
                style={{
                  alignSelf: 'flex-start',
                  backgroundColor: '#ffffff21',
                  padding: 10,
                  width: '100%',
                  borderRadius: 12,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                onPress={() => handleNavigation('general')}>
                <Text
                  style={{
                    fontFamily: 'Plus Jakarta Sans Bold',
                    fontSize: 13,
                    color: '#fff',
                    fontWeight: 900,
                    alignSelf: 'flex-start',
                    paddingVertical: 8,
                  }}>
                  General Community
                </Text>

                <Icon name="arrow-right-s-line" size={24} color={'#fff'} />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  alignSelf: 'flex-start',
                  backgroundColor: '#ffffff21',
                  padding: 10,
                  width: '100%',
                  borderRadius: 12,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                onPress={() => handleNavigationProTrader('pro_trader')}>
                <Text
                  style={{
                    fontFamily: 'Plus Jakarta Sans Bold',
                    fontSize: 13,
                    color: '#fff',
                    fontWeight: 900,
                    alignSelf: 'flex-start',
                    paddingVertical: 8,
                  }}>
                  For Pro Traders
                </Text>

                <Icon name="arrow-right-s-line" size={24} color={'#fff'} />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  alignSelf: 'flex-start',
                  backgroundColor: '#ffffff21',
                  padding: 10,
                  width: '100%',
                  borderRadius: 12,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                onPress={() => handleNavigationAcademy('academy')}>
                <Text
                  style={{
                    fontFamily: 'Plus Jakarta Sans Bold',
                    fontSize: 13,
                    color: '#fff',
                    fontWeight: 900,
                    alignSelf: 'flex-start',
                    paddingVertical: 8,
                  }}>
                  OTI Academy
                </Text>

                <Icon name="arrow-right-s-line" size={24} color={'#fff'} />
              </TouchableOpacity>
            </View>

            {userFetched?.provider === true && (
              <View style={{marginTop: 0}}>
                <Text
                  style={{
                    fontFamily: 'Plus Jakarta Sans Bold',
                    fontSize: 14,
                    color: '#fff',
                    fontWeight: 900,
                    alignSelf: 'flex-start',
                    paddingVertical: 8,
                    marginTop: 48,
                  }}>
                  Your Personal Community
                </Text>

                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-start',
                    backgroundColor: '#ffffff21',
                    padding: 10,
                    width: '100%',
                    borderRadius: 12,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  onPress={() =>
                    navigation.navigate('FreeCommunitySocket', {
                      freeCommunityId: userFetched?._id,
                    })
                  }>
                  <Text
                    style={{
                      fontFamily: 'Plus Jakarta Sans Bold',
                      fontSize: 13,
                      color: '#fff',
                      fontWeight: 900,
                      alignSelf: 'flex-start',
                      paddingVertical: 8,
                    }}>
                    {userFetched?.username} Community
                  </Text>

                  <Icon name="arrow-right-s-line" size={24} color={'#fff'} />
                </TouchableOpacity>
              </View>
            )}

            <View style={{gap: 8}}>
              {followsDetails?.length === 0 ? (
                <Text></Text>
              ) : (
                <Text
                  style={{
                    fontFamily: 'Plus Jakarta Sans Bold',
                    fontSize: 14,
                    color: '#fff',
                    fontWeight: 900,
                    alignSelf: 'flex-start',
                    paddingVertical: 8,
                    marginTop: 48,
                  }}>
                  Communities you follow
                </Text>
              )}

              {followsDetails?.map((user, index) => (
                <View key={index}>
                  <TouchableOpacity
                    style={{
                      alignSelf: 'flex-start',
                      backgroundColor: '#ffffff21',
                      padding: 10,
                      width: '100%',
                      borderRadius: 12,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                    onPress={() =>
                      navigation.navigate('FreeCommunitySocket', {
                        freeCommunityId: user?._id,
                      })
                    }>
                    <Text
                      style={{
                        fontFamily: 'Plus Jakarta Sans Bold',
                        fontSize: 13,
                        color: '#fff',
                        fontWeight: 900,
                        alignSelf: 'flex-start',
                        paddingVertical: 8,
                      }}>
                      {user?.username}'s Community
                    </Text>

                    <Icon name="arrow-right-s-line" size={24} color={'#fff'} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    borderRadius: 24,
    marginBottom: 120,
    padding: 16,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    fontFamily: 'Plus Jakarta Sans SemiBold',
    fontSize: 14,
    color: Colors.newBG,
  },
  labelContainer: {
    //paddingVertical: 16,
  },
  label: {
    fontFamily: 'Plus Jakarta Sans Regular',
    fontSize: 13,
    color: '#fff', // Default label color
    paddingVertical: 12,
  },
  selectedLabel: {
    color: '#ffaa00', // Selected label color
    fontFamily: 'Plus Jakarta Sans Bold',
    fontWeight: 900,
    fontSize: 17,
  },
  selectedLabelView: {
    color: '#ffaa00', // Selected label color
    fontFamily: 'Plus Jakarta Sans Bold',
    fontWeight: 900,
    fontSize: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#ffaa00',
  },
  content: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#ffffff17',
    borderRadius: 12,
    paddingVertical: 16,
  },
  subHeaderText: {
    fontFamily: 'Plus Jakarta Sans Regular',
    fontSize: 13,
    color: '#333', // Default text color
    marginBottom: 8,
  },
});

export default MySubsCommunities;
