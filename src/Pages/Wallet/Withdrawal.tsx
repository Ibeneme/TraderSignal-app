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
import {getCurrentUser, getUserProfile} from '../../Redux/Profile/Profile';

// Assuming item?.time is a timestamp or a date string
export const formatDate = time => {
  const date = new Date(time);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';

  // Convert hours from 24-hour format to 12-hour format
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

  // Add 'rd' to the day (assuming 1 <= day <= 31)
  const dayWithSuffix =
    day +
    (day % 10 === 1 && day !== 11
      ? 'st'
      : day % 10 === 2 && day !== 12
      ? 'nd'
      : day % 10 === 3 && day !== 13
      ? 'rd'
      : 'th');

  return `${dayWithSuffix} ${month} ${year} ${formattedHours}:${formattedMinutes}${ampm}`;
};

const WithdrawalScreen: React.FC = () => {
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
              setPendingItemsList(response?.payload?.withdrawnFunds);

              console.log(
                response?.payload?.withdrawnFunds,
                'hometabshometabs?.payload',
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
    // Dispatch the action to fetch user statuses
    dispatch(getWithdrawals())
      .then(response => {
        console.log('get statusss retrieved:', response?.payload?.userStatuses);
        // Check if response contains data before updating state
        if (response?.payload?.withdrawals) {
          //setPendingItemsList(response.payload);
        }
      })
      .catch(error => {
        // Handle error if needed
        console.error('Error fetching user status:', error);
      });

    // dispatch(getBalance())
    //   .then(response => {
    //     console.log('getbalancs:', response?.payload);
    //     setBalance(response?.payload);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching user status:', error);
    //   });
  }, [dispatch]);

  const PendingItemsList = ({pendingItemsList}) => {
    return (
      <FlatList
        data={pendingItemsList}
        keyExtractor={item => item?._id}
        renderItem={({item}) => (
          <View style={{marginBottom: 10}}>
            <Text>Title: {item?.title}</Text>
            <Text>
              Description: {item?.description || 'No description available'}
            </Text>
            <Text>Duration: {item?.durationInDays} days</Text>
            <Text>Amount: ${item?.amount}</Text>
            <Text>Status: {item?.status}</Text>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
                marginVertical: 5,
              }}
            />
          </View>
        )}
      />
    );
  };

  const navigation = useNavigation();

  // Usage example:
  //const formattedDate = formatDate(item?.time);
  //console.log(formattedDate); // Output: "34rd June 2021 07:34am"

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
                fontWeight: 900,
                fontSize: 18,
                color: '#fff',

                alignSelf: 'flex-start',
              }}>
              Withdrawals
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
              Here's to all your balance and withdrawals
            </Text>

            <View
              style={{
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'column',
              }}>
              <View>
                <Text
                  style={{
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                    fontSize: 12,
                    marginVertical: 24,
                    marginBottom: 12,
                    color: '#ffffff65',
                    alignSelf: 'flex-start',
                    textAlign: 'center',
                  }}>
                  Total Amount Withdrawn
                </Text>
                <Text
                  style={{
                    fontFamily: 'Plus Jakarta Sans Bold',
                    fontWeight: 900,
                    fontSize: 24,
                    // marginVertical: 24,
                    marginBottom: 48,
                    color: '#ffaa00',

                    textAlign: 'center',
                  }}>
                  -$
                  {userFetched?.totalWithdrawn?.toLocaleString('en-US', {
                    minimumFractionDigits: 2, // Display at least two decimal places
                    maximumFractionDigits: 2, // Limit to two decimal places
                  })}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: '#ffaa0018',
                  padding: 16,
                  borderRadius: 16,
                  paddingHorizontal: 48,
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 48,
                }}
                onPress={() =>
                  navigation.navigate('LoggedOTPScreen', {
                    page: 'WithdrawalInputScreen',
                  })
                }>
                <Text
                  style={{
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                    fontSize: 14,
                    color: '#ffaa00',
                    alignSelf: 'flex-end',
                    textAlign: 'center',
                  }}>
                  Request a Withdrawal
                </Text>
              </TouchableOpacity>
            </View>
            {pendingItemsList
              ?.slice()
              ?.reverse()
              ?.map((item, index) => (
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
                          : item?.status === 'approved'
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
                          : item?.status === 'approved'
                          ? 'wallet-fill'
                          : 'wallet-fill' // Default icon name
                      }
                      size={28}
                      color={
                        item?.status === 'pending'
                          ? '#ffaa00'
                          : item?.status === 'rejected'
                          ? '#ff0000'
                          : item?.status === 'approved'
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
                        fontWeight: 900,
                        fontSize: 14,
                        marginBottom: 4,
                      }}>
                      Withdrawal {item?.status} for ${item?.amount}
                    </Text>

                    <Text
                      style={{
                        color: '#fff',
                        fontFamily: 'Plus Jakarta Sans Regular',
                        fontSize: 12,
                        marginBottom: 4,
                      }}>
                      Payment Reference:
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
                              : item?.status === 'approved'
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
                                : item?.status === 'approved'
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

            {pendingItemsList?.length === 0 ? (
              <View>
                <View
                  style={{
                    marginTop: 64,
                    alignSelf: 'flex-start',
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
                  }}>
                  No Withdrawal logs yet
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

export default WithdrawalScreen;
