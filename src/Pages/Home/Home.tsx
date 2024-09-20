import React, {useEffect, useState, useMemo} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Text,
  FlatList,
} from 'react-native';
import SafeArea from '../../Component/SafeAreaViewCustom/SafeArea';
import BoldText from '../../Component/Texts/BoldText';
import Icon from 'react-native-remix-icon';
import {Colors} from '../../Component/Colors/Colors';
import {useNavigation} from '@react-navigation/core';
import HomeHeaders from '../../Component/Header/HomeHeaders';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../Redux/Store/Store';
import {
  getCurrentUser,
  getProviders,
  getUserProfile,
} from '../../Redux/Profile/Profile';
import {useFocusEffect} from '@react-navigation/native';
import Rating from './Rating';
import {getGroupMessages, getUserStatus} from '../../Redux/Subscriptions/Sub';
import Slideshow from './SlideShow';
import VerifiedBadge from '../../Component/icons/VerifiedBadge';
import {calculateAverageRating} from './ViewAllProviders';
import FastImage from 'react-native-fast-image';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {baseApiUrl} from '../../Redux/Auth/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const getProvidersQuery = async () => {
//   try {
//     const accessToken = await AsyncStorage.getItem('tradersignalsapp_access_token');
//     if (!accessToken) {
//       throw new Error('Access token not found');
//     }
//     const response = await axios.get(`${baseApiUrl}/api/v1/auth/users/providers`, {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw error; // Important to throw the error for React Query to handle
//   }
// };

const HomeScreen: React.FC = () => {
  const [productFilter, setProductFilter] = useState('');
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);
  const {width} = useWindowDimensions();
  const [subDetails, setSubDetails] = useState([]);
  const [subDetailsJoin, setSubDetailsJoin] = useState([]);
  const [pendingItemsList, setPendingItemsList] = useState([]);
  const [userFetched, setUserFetched] = useState([]);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ['providers'],
  //   queryFn: getProvidersQuery,
  //   staleTime: 1000 * 60 * 5,
  //   //cacheTime: 1000 * 60 * 10,
  //   refetchInterval: 1000 * 60 * 10, // Refetch every 10 minutes
  // });

  // console.log(data, 'datadatadatadatadata')
  // useEffect(() => {
  //   console.log('Component re-rendered');
  // }, [data, isLoading, error]);

  const handleProductFilter = (product: string) => {
    setProductFilter(product);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timer);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [minutes, seconds]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getProviders())
        .then(response => {
          setSubDetails(response?.payload);
          setSubDetailsJoin(response?.payload?.users);
        })
        .catch(error => {
          console.error('Error retrieving user sub:', error);
        });

      const groupID = '123456';
      dispatch(getGroupMessages(groupID))
        .then(response => {
          console.log('Group messages retrieved:', response?.payload);
        })
        .catch(error => {
          console.error('Error retrieving group messages:', error);
        });

      dispatch(getUserStatus())
        .then(response => {
          const filteredStatuses = response?.payload?.userStatuses.filter(
            item => !item?.isExpired,
          );
          setPendingItemsList(filteredStatuses);
        })
        .catch(error => {
          console.error('Error fetching user status:', error);
        });

      dispatch(getCurrentUser())
        .then(response => {
          const userId = response?.payload?.user?._id;
          dispatch(getUserProfile(userId))
            .then(profileResponse => {
              setUserFetched(profileResponse?.payload);
            })
            .catch(error => {
              console.error('Error retrieving user profile:', error);
            });
        })
        .catch(error => {
          console.error('Error retrieving current user:', error);
        });
    }, [dispatch]),
  );

  // Memoize the list of providers to avoid re-rendering unnecessarily
  const memoizedSubDetails = useMemo(
    () => subDetails?.slice(0, 3),
    [subDetails],
  );
  const memoizedRemainingSubDetails = useMemo(
    () => subDetails?.slice(3),
    [subDetails],
  );

  const renderItem = ({user, index}: any) => (
    <TouchableOpacity
      key={index}
      style={styles.userItem}
      onPress={() => handlePress(user?._id)}>
      <View style={styles.userItemLeft}>
        {!user?.profilePhoto ? (
          <TouchableOpacity style={styles.iconContainer}>
            <Icon name="user-line" size={18} color={Colors?.primary} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.iconContainer}>
            <FastImage
              resizeMode={FastImage.resizeMode.cover}
              source={{
                uri: user?.profilePhoto,
                priority: FastImage.priority.high,
              }}
              style={styles.userImage}
            />
          </TouchableOpacity>
        )}

        <View style={styles.userInfo}>
          <Text style={styles.userName}>
            {user?.username || `${user?.firstName ?? ''}`.trim()}
          </Text>
          <View style={styles.userRatings}>
            <Rating rating={calculateAverageRating(user?.ratings || [])} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handlePress = (userId: string) => {
    navigation.navigate('ProfileDetailsPage', {userId});
  };

  return (
    <SafeArea>
      <HomeHeaders />
      <View style={{height: '100%', padding: 12}}>
        <ScrollView style={{backgroundColor: Colors.newBG}}>
          <View style={{marginTop: 48}}></View>
          <View style={{flexDirection: 'row', gap: 4}}>
            <Text
              style={{
                fontFamily: 'Plus Jakarta Sans Bold',
                fontWeight: 900,
                fontSize: 15,
                color: '#fff',
                marginTop: 2,
                textAlign: 'left',
                marginBottom: 24,
              }}>
              {userFetched?.firstName} {userFetched?.lastName}
            </Text>
            {userFetched?.provider === true ? (
              <VerifiedBadge color="#ffaa00" width="16" />
            ) : null}
          </View>
          <Slideshow />
          <ScrollView
            horizontal
            contentContainerStyle={{paddingVertical: 24}}></ScrollView>
          <FlatList
            data={subDetails?.slice(0, 3)}
            renderItem={({item, index}) => renderItem({user: item, index})}
            keyExtractor={(user, index) => index.toString()}
          />
          <View
            style={{
              marginTop: 24,
              marginBottom: -12,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text
                style={{
                  fontFamily: 'Plus Jakarta Sans Bold',
                  fontWeight: 900,
                  fontSize: 15,
                  color: '#fff',
                  marginTop: 2,
                  textAlign: 'left',
                }}>
                Most Rated Signal Providers
              </Text>
              <Text
                style={{
                  fontFamily: 'Plus Jakarta Sans Regular',
                  fontSize: 12,
                  color: '#ffffff85',
                  marginTop: 2,
                  textAlign: 'left',
                }}>
                Most Rated signal providers
              </Text>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: '#ffaa0017',
                padding: 12,
                borderRadius: 12,
              }}
              onPress={() =>
                navigation.navigate('ViewAllProviders' as never, {subDetails})
              }>
              <Text
                style={{
                  fontFamily: 'Plus Jakarta Sans Bold',
                  fontWeight: 900,
                  fontSize: 12,
                  color: '#ffaa00',
                  marginTop: 2,
                  textAlign: 'left',
                }}>
                View More
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: 6,
            }}>
            {subDetails?.slice(1, 5)?.map((user, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  position: 'relative',
                  marginTop: index >= 2 ? -40 : 12,
                  marginBottom: index < 2 ? 0 : 32,
                }}
                onPress={() => handlePress(user._id)}>
                {!user?.profilePhoto ? (
                  <FastImage
                    resizeMode={FastImage.resizeMode.cover}
                    source={require('../../../assets/images/cardstestorange.png')}
                    style={[
                      styles.image,
                      {
                        width: width / 2.209,
                        borderWidth: 1.7,
                        borderColor: '#ffaa0025',
                      },
                    ]}
                  />
                ) : (
                  <FastImage
                    resizeMode={FastImage.resizeMode.cover}
                    source={{
                      uri: user?.profilePhoto,
                      priority: FastImage.priority.high,
                    }}
                    style={[
                      styles.image,
                      {
                        width: width / 2.209,
                        borderWidth: 1.7,
                        borderColor: '#ffaa0025',
                      },
                    ]}
                  />
                )}

                <View style={styles.detailsContainer}>
                  <View style={{gap: 12}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 4,
                      }}>
                      <BoldText
                        color="transparent"
                        textContent={user?.averagePrice}
                      />
                    </View>
                    <View style={{marginTop: 40}}>
                      <Text
                        style={{
                          fontFamily: 'Plus Jakarta Sans Bold',
                          fontWeight: 900,
                          fontSize: 13,
                          color: '#fff',
                          marginTop: 2,
                          textAlign: 'left',
                        }}>
                        {user?.username}
                      </Text>
                      <View style={styles.starsContainer}>
                        {[...Array(5)].map((_, starIndex) => (
                          <Icon
                            key={starIndex}
                            name={
                              starIndex < user?.ratings
                                ? 'star-fill'
                                : 'star-line'
                            }
                            size={14}
                            color={'#fff'}
                          />
                        ))}
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
            {subDetails?.length === 0 && (
              <Text
                style={{
                  marginVertical: 48,
                  color: Colors.primary,
                  fontSize: 12,
                  fontFamily: 'Plus Jakarta Sans Bold',
                  fontWeight: 900,
                  backgroundColor: '#ffaa0021',
                  padding: 24,
                  width: '100%',
                  textAlign: 'center',
                  paddingVertical: 64,
                }}>
                No Providers Verified yet
              </Text>
            )}
          </View>

          <View style={{marginBottom: 96}}>
            <FlatList
              data={subDetails?.slice(3)} // Start from the fourth item
              renderItem={({item, index}) => renderItem({user: item, index})}
              keyExtractor={(user, index) => index.toString()}
            />
          </View>
        </ScrollView>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 12},
  userHeader: {flexDirection: 'row', gap: 4, marginBottom: 24},
  userName: {
    fontFamily: 'Plus Jakarta Sans Bold',
    fontWeight: '900',
    fontSize: 15,
    color: '#fff',
  },
  userItem: {
    flexDirection: 'row',
    marginVertical: 6,
    backgroundColor: '#ffffff18',
    padding: 16,
    borderRadius: 16,
  },
  userItemLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    width: '75%',
  },
  iconContainer: {
    padding: 14,
    backgroundColor: Colors.newBG,
    borderRadius: 64,
    borderWidth: 1.4,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImage: {width: 36, height: 36, borderRadius: 36},
  userInfo: {width: '100%'},
  userRatings: {marginTop: 6},
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  sectionTitle: {
    fontFamily: 'Plus Jakarta Sans Bold',
    fontWeight: '900',
    fontSize: 15,
    color: '#fff',
  },
  viewMoreButton: {backgroundColor: '#ffaa0017', padding: 12, borderRadius: 12},
  viewMoreText: {
    fontSize: 12,
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '600',
    color: '#fff',
  },
  userGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    flexWrap: 'wrap',
  },
  userCard: {
    width: '47%',
    backgroundColor: '#ffaa00',
    borderRadius: 18,
    padding: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  userCardImage: {width: 64, height: 64, borderRadius: 64},
  detailsContainer: {marginTop: 8, alignItems: 'center'},
  starsContainer: {flexDirection: 'row', gap: 2, marginTop: 8},
  noProvidersText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '600',
    color: '#fff',
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

  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#888',
  },
  detailsContainers: {
    marginLeft: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default HomeScreen;
