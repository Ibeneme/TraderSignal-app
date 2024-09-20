import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions,
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
import {getCurrentUser, getUserProfile} from '../../Redux/Profile/Profile';
import {
  getUsersSubCreated,
  getUsersub,
  getUsersubJoined,
} from '../../Redux/Subscriptions/Sub';
import {useNavigation} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';

const MySubs: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false); // State to control visibility
  const [subType, setSubType] = useState('created'); // State to track subscription type
  const toggleVisibility = (type: string) => {
    setIsVisible(!isVisible); // Toggle visibility state
    setSubType(type); // Set subscription type
  };

  const dispatch = useDispatch<AppDispatch>();
  const [subDetails, setSubDetails] = useState([]);
  const [subDetailsJoin, setSubDetailsJoin] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getCurrentUser())
        .then(response => {
          console.log('User sub retrieved:', response);
          console.log('User sub retrieved:', response?.payload?.user?._id);
          if (response?.payload?.user?._id) {
            dispatch(getUserProfile(response?.payload?.user?._id))
              .then(response => {
                // console.log(
                //   response?.payload,
                //   'response?.payload?.user?.provider)',
                // );
                getYouSelf(response?.payload?.provider);
              })
              .catch(error => {
                console.error('Error retrieving user sub', error);
              });
            dispatch(getUsersSubCreated(response?.payload?.user?._id))
              .then(response => {
                console.log('get subretrieved:', response);
                console.log('get subretrieved:', response?.payload[0]?.users);
                setSubDetails(response?.payload);
              })
              .catch(error => {
                console.error('Error retrieving user sub', error);
              });

            dispatch(getUsersubJoined(response?.payload?.user?._id))
              .then(response => {
                console.log('get setSubDetailsJoin:', response);
                console.log('get userss:', response?.payload[0]?.users);
                setSubDetailsJoin(response?.payload);
              })
              .catch(error => {
                console.error('Error retrieving user sub', error);
              });
          }
        })
        .catch(error => {
          console.error('Error retrieving user sub:', error);
        });

      dispatch(getCurrentUser())
        .then(response => {
          console.log('User sub retrieved:', response);
          console.log('User sub retrieved:', response?.payload?.user?._id);
          if (response?.payload?.user?._id) {
            dispatch(getUsersSubCreated(response?.payload?.user?._id))
              .then(response => {
                console.log('get subretrieved:', response);
                console.log('get subretrieved:', response?.payload[0]?.users);
                setSubDetails(response?.payload);
              })
              .catch(error => {
                console.error('Error retrieving user sub', error);
              });
            dispatch(getUsersubJoined(response?.payload?.user?._id))
              .then(response => {
                console.log('get setSubDetailsJoin:', response);
                console.log('get userss:', response?.payload);
                setSubDetailsJoin(response?.payload);
              })
              .catch(error => {
                console.error('Error retrieving user sub', error);
              });
          }
          // setLoading(false); // Set loading to false after data fetching completes
        })
        .catch(error => {
          console.error('Error retrieving user sub:', error);
          // setLoading(false); // Set loading to false in case of error
        });
    }, [dispatch]),
  );

  const [yourSelf, getYouSelf] = useState(false);
  useEffect(() => {
    //setPageIsLoading(true);
  }, [dispatch]);

  const {fontScale} = useWindowDimensions();
  const navigation = useNavigation();

  const sortSubscriptionsByDate = (subscriptions: any) => {
    return subscriptions.sort(
      (a, b) => new Date(b?.createdAt) - new Date(a.createdAt),
    );
  };

  console.log(subDetails, 'pspskssj');
  return (
    <SafeArea>
      <View style={styles.container}>
        <ProfileHeaders />
        <BodyView color="#f4f4f4">
          <View style={styles.formContainer}>
            <View
              style={{
                marginTop: 24,
                alignSelf: 'flex-start',
                backgroundColor: '#ffaa0012',
                padding: 16,
                borderRadius: 36,
                marginBottom: 16,
              }}>
              <Channels color="#ffaa00" width={32} height={32} />
            </View>
            <Text
              style={{
                fontFamily: 'Plus Jakarta Sans Bold',
                fontWeight: 900,
                fontSize: 18,
                color: '#fff',
                fontWeight: 900,
                alignSelf: 'flex-start',
              }}>
              Subscription Channels
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
              View all your subscription channels here
            </Text>
            {yourSelf === true ? (
              <View style={{width: '100%'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#Ffaa00',
                    alignSelf: 'flex-start',
                    padding: 16,
                    borderRadius: 12,
                    paddingHorizontal: 18,
                    marginBottom: 36,
                  }}
                  onPress={() => navigation.navigate('CreateSub' as never)}>
                  <Text style={{fontFamily: 'Plus Jakarta Sans SemiBold'}}>
                    Create a Subscription
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'flex-start',
                    gap: 16,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity onPress={() => toggleVisibility('created')}>
                    <View
                      style={[
                        styles.labelContainer,
                        subType === 'created' && styles.selectedLabelView,
                      ]}>
                      <Text
                        style={[
                          styles.label,
                          subType === 'created' && styles.selectedLabel,
                        ]}>
                        You Created
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => toggleVisibility('joined')}>
                    <View
                      style={[
                        styles.labelContainer,
                        subType === 'joined' && styles.selectedLabelView,
                      ]}>
                      <Text
                        style={[
                          styles.label,
                          subType === 'joined' && styles.selectedLabel,
                        ]}>
                        You Joined
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                {!isVisible ? (
                  <View style={{paddingBottom: 90}}>
                    {sortSubscriptionsByDate(subDetails)?.map(
                      (subscription: any, index: any) => (
                        <TouchableOpacity
                          key={index}
                          style={[styles.content]}
                          onPress={() => {
                            navigation.navigate('GetSub', {
                              id: subscription?.id,
                            } as never);
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              justifyContent: 'space-between',
                            }}>
                            <View style={{width: '75%'}}>
                              <Text
                                style={{
                                  fontFamily: 'Plus Jakarta Sans Bold',
                                  fontWeight: 900,
                                  color: 'white',
                                  fontSize: 14,
                                }}>
                                {subscription?.title}
                              </Text>
                              <Text
                                style={{
                                  fontFamily: 'Plus Jakarta Sans Regular',
                                  color: '#ffffff90',
                                  marginTop: 6,
                                  fontSize: 12,
                                }}>
                                {subscription?.description}
                              </Text>
                            </View>

                            <View
                              style={{width: '25%', alignItems: 'flex-end'}}>
                              <Text
                                style={{
                                  fontFamily: 'Plus Jakarta Sans Bold',
                                  fontWeight: 900,
                                  color: 'white',
                                  fontSize: 14 * fontScale,
                                }}>
                                ${subscription?.price}
                              </Text>
                            </View>
                          </View>

                          <View style={{flexDirection: 'row', gap: 8}}>
                            <View
                              style={{
                                backgroundColor: '#ffaa0027',
                                padding: 12,
                                marginTop: 12,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 12,
                              }}>
                              <Text
                                style={{
                                  fontFamily: 'Plus Jakarta Sans Regular',
                                  color: '#ffaa00',
                                  fontSize: 12,
                                }}>
                                {subscription?.users?.length} Subscribers
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      ),
                    )}
                    {subDetails && subDetails.length === 0 && (
                      <View
                        style={{
                          width: '100%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            marginTop: 120,
                            //alignSelf: 'flex-start',
                            backgroundColor: '#ffaa0012',
                            padding: 16,
                            borderRadius: 36,
                            marginBottom: 32,
                          }}>
                          <Channels
                            color="#ffaa0065"
                            width={120}
                            height={120}
                          />
                        </View>
                        <Text
                          style={{
                            fontFamily: 'Plus Jakarta Sans SemiBold',
                            fontSize: 13,
                            marginVertical: 4,
                            marginBottom: 73,
                            color: '#ffaa00',
                            alignSelf: 'flex-start',
                            textAlign: 'center',
                            width: '100%',
                          }}>
                          No Subscription logs yet
                        </Text>
                      </View>
                    )}
                  </View>
                ) : (
                  <View>
                    {sortSubscriptionsByDate(subDetailsJoin)?.map(
                      (subscription: any, index: any) => (
                        <TouchableOpacity
                          key={index}
                          style={[styles.content]}
                          onPress={() => {
                            navigation.navigate('GetSub', {
                              id: subscription?.id,
                            } as never);
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              justifyContent: 'space-between',
                            }}>
                            <View style={{width: '75%'}}>
                              <Text
                                style={{
                                  fontFamily: 'Plus Jakarta Sans Bold',
                                  fontWeight: 900,
                                  color: 'white',
                                  fontSize: 14,
                                }}>
                                {subscription?.title}
                              </Text>
                              <Text
                                style={{
                                  fontFamily: 'Plus Jakarta Sans Regular',
                                  color: '#ffffff90',
                                  marginTop: 6,
                                  fontSize: 12,
                                }}>
                                {subscription?.description}
                              </Text>
                            </View>

                            <View
                              style={{width: '25%', alignItems: 'flex-end'}}>
                              <Text
                                style={{
                                  fontFamily: 'Plus Jakarta Sans Bold',
                                  fontWeight: 900,
                                  color: 'white',
                                  fontSize: 14 * fontScale,
                                }}>
                                ${subscription?.price}
                              </Text>
                            </View>
                          </View>

                          <View style={{flexDirection: 'row', gap: 8}}>
                            <View
                              style={{
                                backgroundColor: '#ffaa0027',
                                padding: 12,
                                marginTop: 12,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 12,
                              }}>
                              <Text
                                style={{
                                  fontFamily: 'Plus Jakarta Sans Regular',
                                  color: '#ffaa00',
                                  fontSize: 12,
                                }}>
                                {subscription?.users?.length} Subscribers
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      ),
                    )}
                    {subDetailsJoin && subDetailsJoin?.length === 0 && (
                      <View
                        style={{
                          width: '100%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            marginTop: 120,
                            //alignSelf: 'flex-start',
                            backgroundColor: '#ffaa0012',
                            padding: 16,
                            borderRadius: 36,
                            marginBottom: 32,
                          }}>
                          <Channels
                            color="#ffaa0065"
                            width={120}
                            height={120}
                          />
                        </View>
                        <Text
                          style={{
                            fontFamily: 'Plus Jakarta Sans SemiBold',
                            fontSize: 13,
                            marginVertical: 4,
                            marginBottom: 73,
                            color: '#ffaa00',
                            alignSelf: 'flex-start',
                            textAlign: 'center',
                            width: '100%',
                          }}>
                          No Subscription logs yet
                        </Text>
                      </View>
                    )}
                  </View>
                )}
              </View>
            ) : (
              <View>
                {subDetailsJoin?.map((subscription, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.content]}
                    onPress={() => {
                      navigation.navigate('GetSub', {
                        id: subscription?.id,
                      } as never);
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{width: '75%'}}>
                        <Text
                          style={{
                            fontFamily: 'Plus Jakarta Sans Bold',
                            fontWeight: 900,
                            color: 'white',
                            fontSize: 14,
                          }}>
                          {subscription?.title}
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Plus Jakarta Sans Regular',
                            color: '#ffffff90',
                            marginTop: 6,
                            fontSize: 12,
                          }}>
                          {subscription?.description}
                        </Text>
                      </View>

                      <View style={{width: '25%', alignItems: 'flex-end'}}>
                        <Text
                          style={{
                            fontFamily: 'Plus Jakarta Sans Bold',
                            fontWeight: 900,
                            color: 'white',
                            fontSize: 14 * fontScale,
                          }}>
                          ${subscription?.price}
                        </Text>
                      </View>
                    </View>

                    <View style={{flexDirection: 'row', gap: 8}}>
                      <View
                        style={{
                          backgroundColor: '#ffaa0027',
                          padding: 12,
                          marginTop: 12,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 12,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Plus Jakarta Sans Regular',
                            color: '#ffaa00',
                            fontSize: 12,
                          }}>
                          {subscription?.users?.length} Subscribers
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
                {subDetailsJoin && subDetailsJoin?.length === 0 && (
                  <View>
                    <View
                      style={{
                        marginTop: 120,
                        alignSelf: 'flex-start',
                        backgroundColor: '#ffaa0012',
                        padding: 16,
                        borderRadius: 36,
                        marginBottom: 32,
                      }}>
                      <Channels color="#ffaa0065" width={120} height={120} />
                    </View>
                    <Text
                      style={{
                        fontFamily: 'Plus Jakarta Sans SemiBold',
                        fontSize: 13,
                        marginVertical: 4,
                        marginBottom: 32,
                        color: '#ffaa00',
                        alignSelf: 'flex-start',
                        textAlign: 'center',
                      }}>
                      No Subscription logs yet
                    </Text>
                  </View>
                )}
              </View>
            )}
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
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    borderRadius: 24,
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

export default MySubs;
