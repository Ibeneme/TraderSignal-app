import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  useWindowDimensions,
  FlatList,
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
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../Redux/Store/Store';
import {
  getBalance,
  getUserStatus,
  getWithdrawals,
} from '../../Redux/Subscriptions/Sub';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {formatDate} from '../Wallet/Withdrawal';
import {getCurrentUser, getUserProfile} from '../../Redux/Profile/Profile';

const MyBalanceScreen: React.FC = () => {
  const handleSubmit = (values: {oldPassword: string; newPassword: string}) => {
    // Handle form submission here
    console.log('Form submitted with values:', values);
  };

  // Define Yup validation schema
  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string()
      .required('New Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
      ),
  });

  const {width} = useWindowDimensions();
  const dispatch = useDispatch<AppDispatch>();
  const [pendingItemsList, setPendingItemsList] = useState([]);
  const [balance, setBalance] = useState([]);
  const [mainBal, setMainBal] = useState([]);
  const [userFetched, setUserFetched] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getCurrentUser())
        .then(response => {
          console.log('get getCurrentUser retrieved:', response);
          console.log('get getCurrentUser retrieved:', response?.payload);

          dispatch(getUserProfile(response?.payload?.user?._id))
            .then(response => {
              setUserFetched(response?.payload);
              console.log(
                response?.payload?.earnings,
                'hometabshometabs sssgetUserProfile?.payload',
              );
            })
            .catch(error => {
              console.error('Erhmetab hometabs user sub:', error);
            });
        })
        .catch(error => {
          console.error('Error retrieving user sub:', error);
        });

      return () => {
        // Cleanup function (optional)
      };
    }, [dispatch]),
  );

  useEffect(() => {
    dispatch(getUserStatus())
      .then(response => {
        console.log('get status retrieved:', response?.payload?.userStatuses);

        const filteredStatuses = response?.payload?.userStatuses?.filter(
          item => item.status === 'accepted',
        );

        console.log('Filtered statuses:', filteredStatuses);

        // Assuming userFetch is an array containing objects with _id property
        const matchedItems = userFetch.filter(
          item => item?._id === '664429f485a0f39290e2aff0',
        );

        console.log('Matched items:', matchedItems);

        setPendingItemsList(filteredStatuses);
      })
      .catch(error => {
        // Handle error if needed
        console.error('Error fetching user status:', error);
      });

    dispatch(getBalance())
      .then(response => {
        console.log('getbalancs:', response?.payload);
        setBalance(response?.payload);
      })
      .catch(error => {
        console.error('Error fetching user status:', error);
      });

    dispatch(getWithdrawals())
      .then(response => {
        console.log('get statusss retrieved:', response?.payload?.userStatuses);
        // Check if response contains data before updating state
        if (response?.payload?.withdrawals) {
          setMainBal(response.payload);
        }
      })
      .catch(error => {
        // Handle error if needed
        console.error('Error fetching user status:', error);
      });
  }, [dispatch]);

  const navigation = useNavigation();

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
              <Icon
                name={
                  'wallet-fill' // Default icon name
                }
                size={28}
                color={
                  '#ffaa00' // Default icon name
                }
              />
            </View>
            <Text
              style={{
                fontFamily: 'Plus Jakarta Sans Bold',
                fontSize: 18,
                color: '#fff',
                fontWeight: 900,
                alignSelf: 'flex-start',
              }}>
              Balance and Earnings
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
              Here's to all your balance and earnings
            </Text>

            {/* <View>
              <Text
                style={{
                  fontFamily: 'Plus Jakarta Sans Bold',
                  fontSize: 14,
                  marginVertical: 12,
                  marginBottom: 0,
                  color: '#ffffff85',
                  alignSelf: 'flex-start',
                }}>
                Balance
              </Text>

              <Text
                style={{
                  fontFamily: 'Plus Jakarta Sans Bold',
                  fontSize: 24,
                  marginVertical: 6,
                  marginBottom: 48,
                  color: '#ffaa00',
                  alignSelf: 'flex-start',
                }}>
                $
                {userFetched
                  ? userFetched?.totalBalance?.toLocaleString('en-US', {
                      minimumFractionDigits: 2, // Display at least two decimal places
                      maximumFractionDigits: 2, // Limit to two decimal places
                    })
                  : '00.00'}
              </Text>
            </View> */}

            <View
              style={{
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View>
                <Text
                  style={{
                    fontFamily: 'Plus Jakarta Sans Bold',
                    fontSize: 14,
                    marginVertical: 12,
                    marginBottom: 0,
                    color: '#ffffff85',
                    alignSelf: 'flex-start',
                  }}>
                  Total Earnings
                </Text>

                <Text
                  style={{
                    fontFamily: 'Plus Jakarta Sans Bold',
                    fontSize: 24,
                    marginVertical: 6,
                    marginBottom: 48,
                    color: '#ffaa00',
                    alignSelf: 'flex-start',
                  }}>
                  $
                  {userFetched?.totalEarnings?.toLocaleString('en-US', {
                    minimumFractionDigits: 2, // Display at least two decimal places
                    maximumFractionDigits: 2, // Limit to two decimal places
                  })}
                </Text>
              </View>

              <View>
                <Text
                  style={{
                    fontFamily: 'Plus Jakarta Sans Bold',
                    fontSize: 14,
                    marginVertical: 12,
                    marginBottom: 0,
                    color: '#ffffff85',
                    alignSelf: 'flex-start',
                  }}>
                  Total Withdrawn
                </Text>

                <Text
                  style={{
                    fontFamily: 'Plus Jakarta Sans Bold',
                    fontSize: 24,
                    marginVertical: 6,
                    marginBottom: 48,
                    color: '#ffaa00',
                    alignSelf: 'flex-end',
                  }}>
                  - $
                  {userFetched?.totalWithdrawn?.toLocaleString('en-US', {
                    minimumFractionDigits: 2, // Display at least two decimal places
                    maximumFractionDigits: 2, // Limit to two decimal places
                  })}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: '#ffaa0017',
                paddingHorizontal: 24,
                padding: 16,
                marginBottom: 48,
                borderRadius: 12,
              }}
              onPress={() => navigation.navigate('WithdrawalScreen')}>
              <Text
                style={{
                  fontFamily: 'Plus Jakarta Sans SemiBold',
                  fontSize: 14,

                  color: '#ffaa00',
                  alignSelf: 'flex-end',
                }}>
                View all Withdrawals
              </Text>
            </TouchableOpacity>
            {userFetched?.earnings?.slice()?.reverse()?.map((item, index) => (
              <TouchableOpacity
                style={{
                  marginBottom: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  gap: 4,
                  padding: 12,
                  backgroundColor: '#ffffff12',
                  borderRadius: 8,
                }}
                key={index}
                // onPress={() =>
                //   navigation.navigate('StatusSpecific', {item} as never)
                // }
              >
                <View
                  style={{
                    marginTop: 12,
                    alignSelf: 'flex-start',
                    backgroundColor:
                      item?.status === 'pending'
                        ? '#ffaa0045'
                        : item?.status === 'rejected'
                        ? '#ff000045'
                        : item?.status === 'accepted'
                        ? '#62D94445'
                        : '#ffaa0045', // Default icon name
                    padding: 16,
                    borderRadius: 36,
                    marginBottom: 0,
                    width: 48,
                    height: 48,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name={
                      item?.status === 'pending'
                        ? 'loader-2-fill'
                        : item?.status === 'rejected'
                        ? 'error-warning-fill'
                        : item?.status === 'accepted'
                        ? 'wallet-fill'
                        : 'wallet-fill' // Default icon name
                    }
                    size={28}
                    color={
                      item?.status === 'pending'
                        ? '#ffaa00'
                        : item?.status === 'rejected'
                        ? '#ff0000'
                        : item?.status === 'accepted'
                        ? '#62D944'
                        : '#ffaa00' // Default icon name
                    }
                  />
                </View>
                <View style={{width: '83%'}}>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Plus Jakarta Sans Bold',
                      fontSize: 14,
                      marginBottom: 4,
                    }}>
                    Subscription Payment
                  </Text>

                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Plus Jakarta Sans Regular',
                      fontSize: 12,
                      marginBottom: 4,
                    }}>
                    Subscriber's Name: {item?.subscriberFirstName}{' '}
                    {item?.subscriberLastName}
                  </Text>

                  <Text
                    style={{
                      color: '#ffffff65',
                      fontFamily: 'Plus Jakarta Sans Bold',
                      fontSize: 12,
                      marginBottom: 4,
                    }}>
                    Reference:
                    {item?._id || 'No description available'}
                  </Text>

                  <View style={{flexDirection: 'row', gap: 4}}>
                    <View
                      style={{
                        backgroundColor:
                          item?.status === 'pending'
                            ? '#ffaa0045'
                            : item?.status === 'rejected'
                            ? '#ff000045'
                            : item?.status === 'accepted'
                            ? '#62D94445'
                            : '#ffaa0045', // Default icon name
                        padding: 8,
                        borderRadius: 12,
                        marginTop: 6,
                      }}>
                      <Text
                        style={{
                          color:
                            item?.status === 'pending'
                              ? '#ffaa00'
                              : item?.status === 'rejected'
                              ? '#ff0000'
                              : item?.status === 'accepted'
                              ? '#62D944'
                              : '#ffaa00',
                          fontFamily: 'Plus Jakarta Sans SemiBold',
                          fontSize: 12,
                          marginBottom: 4,
                        }}>
                        {item?.durationIndays} days
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor:
                          item?.status === 'pending'
                            ? '#ffaa0045'
                            : item?.status === 'rejected'
                            ? '#ff000045'
                            : item?.status === 'accepted'
                            ? '#62D94445'
                            : '#ffaa0045', // Default icon name
                        padding: 8,
                        borderRadius: 12,
                        marginTop: 6,
                      }}>
                      <Text
                        style={{
                          color:
                            item?.status === 'pending'
                              ? '#ffaa00'
                              : item?.status === 'rejected'
                              ? '#ff0000'
                              : item?.status === 'accepted'
                              ? '#62D944'
                              : '#ffaa00',
                          fontFamily: 'Plus Jakarta Sans SemiBold',
                          fontSize: 12,
                          marginBottom: 4,
                        }}>
                        ${item?.amountEarned}
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor:
                          item?.status === 'pending'
                            ? '#ffaa0045'
                            : item?.status === 'rejected'
                            ? '#ff000045'
                            : item?.status === 'accepted'
                            ? '#62D94445'
                            : '#ffaa0045', // Default icon name
                        padding: 8,
                        borderRadius: 12,
                        marginTop: 6,
                      }}>
                      <Text
                        style={{
                          color:
                            item?.status === 'pending'
                              ? '#ffaa00'
                              : item?.status === 'rejected'
                              ? '#ff0000'
                              : item?.status === 'accepted'
                              ? '#62D944'
                              : '#ffaa00',
                          fontFamily: 'Plus Jakarta Sans SemiBold',
                          fontSize: 12,
                          marginBottom: 4,
                        }}>
                        {formatDate(item?.timestamp)}
                      </Text>
                    </View>
                  </View>

                  {/* <Text style={{color: '#fff'}}>Title: {item?.title}</Text>
                  <Text style={{color: '#fff'}}>
                    Description:{' '}
                    {item?.description || 'No description available'}
                  </Text>
                  <Text style={{color: '#fff'}}>
                    Duration: {item?.durationInDays} days
                  </Text>
                  <Text style={{color: '#fff'}}>Price: ${item?.price}</Text>
                  <Text style={{color: '#fff'}}>Status: {item?.status}</Text>
                */}
                </View>
              </TouchableOpacity>
            ))}

            {userFetched?.earnings?.length === 0 ? (
              <View style={{width: '100%'}}>
                <View
                  style={{
                    marginTop: 64,
                    alignSelf: 'center',
                    backgroundColor: '#ffaa0012',
                    padding: 16,
                    borderRadius: 36,
                    marginBottom: 32,
                  }}>
                  <CreditCard color="#ffaa0065" width={120} height={120} />
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
                    width: '100%',
                  }}>
                  No Earnings yet
                </Text>
              </View>
            ) : null}

            <View style={{marginBottom: 120}}></View>
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
});

export default MyBalanceScreen;
