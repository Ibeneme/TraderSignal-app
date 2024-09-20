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
  getAcademyHistory,
  getCommunity,
  getProTraderHistory,
  getUserStatus,
} from '../../Redux/Subscriptions/Sub';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

export const formatDate = (timestamp: any) => {
  const date = new Date(timestamp);
  const options = {month: 'long', year: 'numeric'};
  const formattedDate = date.toLocaleDateString('en-US', options);

  // Adding ordinal suffix to day
  const day = date.getDate();
  const ordinalSuffix = day => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  return `${day}${ordinalSuffix(day)} ${formattedDate}`;
};

const ComSUBSaLL: React.FC = () => {
  const handleSubmit = (values: {oldPassword: string; newPassword: string}) => {
    // Handle form submission here
    console.log('Form submitted with values:', values);
  };

  const route = useRoute();
  const {type} = route.params as {type: string};

  // Def

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

  useFocusEffect(
    React.useCallback(() => {
      if (type === 'general') {
        const fetchData = async () => {
          try {
            // Dispatch the action to fetch user statuses
            const response = await dispatch(getCommunity());
            console.log(
              'get statusss retrieved:',
              response?.payload?.userStatuses,
            );

            // Filter out expired statuses
            const filteredStatuses = response?.payload?.userStatuses.filter(
              item => !item?.isExpired,
            );
            setPendingItemsList(response?.payload?.userStatuses);
          } catch (error) {
            // Handle error if needed
            console.error('Error fetching user status:', error);
          }
        };

        fetchData();
      } else if (type === 'pro_trader') {
        const fetchData = async () => {
          try {
            // Dispatch the action to fetch user statuses
            const response = await dispatch(getProTraderHistory());
            console.log(
              'get statusss retrieved:',
              response?.payload?.userStatuses,
            );

            // Filter out expired statuses
            const filteredStatuses = response?.payload?.userStatuses.filter(
              item => !item?.isExpired,
            );
            setPendingItemsList(response?.payload?.userStatuses);
          } catch (error) {
            // Handle error if needed
            console.error('Error fetching user status:', error);
          }
        };

        fetchData();
      } else if (type === 'academy') {
        const fetchData = async () => {
          try {
            // Dispatch the action to fetch user statuses
            const response = await dispatch(getAcademyHistory());
            console.log(
              'get statusss retrieved:',
              response?.payload?.userStatuses,
            );

            // Filter out expired statuses
            const filteredStatuses = response?.payload?.userStatuses.filter(
              item => !item?.isExpired,
            );
            setPendingItemsList(response?.payload?.userStatuses);
          } catch (error) {
            // Handle error if needed
            console.error('Error fetching user status:', error);
          }
        };

        fetchData();
      }
      return () => {
        // Cleanup function (optional)
      };
    }, [dispatch]),
  );

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
              <CreditCard color="#ffaa00" width={32} height={32} />
            </View>
            <Text
              style={{
                fontFamily: 'Plus Jakarta Sans Bold',
                fontWeight: 900,
                fontSize: 18,
                color: '#fff',

                alignSelf: 'flex-start',
              }}>
              {type === 'general' &&
                'General Users Community Subscription History'}
              {type === 'pro_trader' &&
                'Pro Traders Community Subscription History'}
              {type === 'academy' && 'Academy Subscription History'}
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
              View all your subscriptions here
            </Text>
            {pendingItemsList?.map((item, index) => (
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

                onPress={() => {
                  if (item?.status === 'accepted') {
                    navigation.navigate('CommunityChat' as never);
                  } else if (item?.status === 'expired') {
                    navigation.navigate('CheckPayCommunity' as never);
                  } else {
                    navigation.navigate('StatusSpecific', {item} as never);
                  }
                }}>
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
                      fontWeight: 900,
                      fontSize: 14,
                      marginBottom: 4,
                    }}>
                    {item?.status
                      ? item?.status?.charAt(0)?.toUpperCase() +
                        item?.status?.slice(1)?.toLowerCase()
                      : ''}{' '}
                    {type === 'general' &&
                      'General Users Community Subscription'}
                    {type === 'pro_trader' &&
                      'Pro Traders Community Subscription'}
                    {type === 'academy' && 'Academy Subscription'}
                  </Text>

                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Plus Jakarta Sans Regular',
                      fontSize: 12,
                      marginBottom: 4,
                    }}>
                    Subscription Title:{' '}
                    {item?.title || 'No description available'}
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
                        {item?.durationInDays} days
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
                        ${item?.price}
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
                        {formatDate(item?.createdAt)}
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
                  No Subscription logs yet
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

export default ComSUBSaLL;
