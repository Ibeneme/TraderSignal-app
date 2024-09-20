import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  Modal,
  FlatList,
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
// import TransparentHeader from '../../Component/Header/Transparent';
import {useNavigation} from '@react-navigation/core';
import Icon from 'react-native-remix-icon';
import {Colors} from '../../Component/Colors/Colors';
import {useRoute, useFocusEffect} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../Redux/Store/Store';
import {getCurrentUser, getSingleUser} from '../../Redux/Profile/Profile';
import {
  getAllUsersPosts,
  getRating,
  getUsersSubCreated,
} from '../../Redux/Subscriptions/Sub';
import Channels from '../../Component/icons/Channels';
import Loader from '../../Component/Component/Loader';
import {calculateAverageRating} from '../Home/ViewAllProviders';
import Rating from '../Home/Rating';
import FastImage from 'react-native-fast-image';
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
  const route = useRoute();
  const {userId} = route.params; // Assuming userId is the name of the parameter

  // Function to format date
  const formatDate = dateString => {
    const options = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-GB', options);
  };

  const formatNumberWithCommas = number => {
    return number?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Now you have access to the userId parameter
  //console.log('User IDsss:', userId);
  const transaction = {
    id: 1,
    name: 'Sterling Josh',
    subscriptionType: 'Monthly Subscription',
    stars: 4,
    price: '$50',
    imageSource: require('../../../assets/images/user.png'),
    product: 'crypto',
  };

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSubscribe = () => {
    setModalVisible(true);
  };

  const handleModalClose = (itemId: string | undefined) => {
    console.log(itemId, 'lllllllooooo');
    if (itemId) {
      setModalVisible(false);
      navigation.navigate('CheckPay', {
        id: itemId?._id,
        creator: itemId?.creator,
      } as never);
    }
  };

  const dispatch = useDispatch<AppDispatch>();
  const [subDetails, setSubDetails] = useState([]);
  const [subDetailsJoin, setSubDetailsJoin] = useState([]);
  const [loading, setLoading] = useState(false);
  const [yourself, setYourSelf] = useState([]);
  const [providerPosts, getProvidersPosts] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      dispatch(getSingleUser(userId))
        .then(response => {
          //setLoading(false);
          //console.log('get sub getSingleUser:', response);
          //console.log('get getSingleUser retrieved:', response?.payload);
          setSubDetails(response?.payload);
          setSubDetailsJoin(response?.payload?.users);

          dispatch(getCurrentUser())
            .then(response => {
              //console.log('get subretrieved:', response);
              //console.log('get youtresld:', response?.payload?.user);
              setYourSelf(response?.payload?.user);
            })
            .catch(error => {
              //console.error('Error retrieving user sub', error);
            });
          dispatch(getUsersSubCreated(userId))
            .then(response => {
              setLoading(false);
              //console.log('get sub getSingleUser:', response);

              // setSubDetails(response?.payload);
              setSubDetailsJoin(response?.payload);
            })
            .catch(error => {
              setLoading(false);
              //console.error('Error retrieving user sub:', error);
            });

          dispatch(getAllUsersPosts(userId))
            .then(response => {
              //console.log('get subretrieved:', response);
              //console.log('get psosoooss:', response?.payload);
              getProvidersPosts(response?.payload);
            })
            .catch(error => {
              //console.error('Error retrieving user sub', error);
            });
        })
        .catch(error => {
          setLoading(false);
          //console.error('Error retrieving user sub:', error);
        });
    }, [dispatch]),
  );

  React.useEffect(() => {
    setLoading(true);
    dispatch(getUsersSubCreated(userId))
      .then(response => {
        setLoading(false);
        //console.log('get sub getSingleUser:', response);
        //console.log('get setSubDetailsJoin retrieved:', response?.payload);
        setSubDetailsJoin(response?.payload);
      })
      .catch(error => {
        setLoading(false);
        //console.error('Error retrieving user sub:', error);
      });
  }, [dispatch, userId]);

  const renderItem = ({item}) => {
    const limitedDescription = item.description.substring(0, 50);

    return (
      <TouchableOpacity
        key={item?._id}
        style={styles?.subscriptionContainer}
        onPress={() => handleModalClose(item)}>
        <View style={{width: '75%'}}>
          <SemiBoldText
            fontSize={14}
            textContent={item.title} // Title of the subscription
          />

          <Text
            style={{
              color: '#ffffff85',
              fontSize: 12,
              fontFamily: 'Plus Jakarta Sans Regular',
              marginTop: 6,
            }}>
            {item?.durationInDays}days
          </Text>
        </View>
        <View style={{width: '25%'}}>
          <Text
            style={{
              fontFamily: 'Plus Jakarta Sans SemiBold',
              fontSize: 16,
              color: '#ffaa00',
              textAlign: 'right',
            }}>
            {' '}
            ${item?.price}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeArea>
      <MainHeader />
      <BodyView paddingHorizontal={true}>
        {loading ? (
          <View
            style={[
              //styles.container,
              {
                height: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                alignSelf: 'center',
                marginTop: 240,
              },
            ]}>
            <Loader />
          </View>
        ) : (
          <View style={styles.container}>
            {/* <MainHeader /> */}
            <Modal
              visible={modalVisible}
              animationType="slide"
              transparent={true}>
              <View
                style={[styles.modalContainer, {backgroundColor: '#01081195'}]}>
                <View
                  style={[
                    styles.modalContent,
                    {
                      backgroundColor: Colors.newBG,
                      borderColor: Colors.primary,
                      borderWidth: 1.5,
                      padding: 16,
                      paddingTop: 32,
                    },
                  ]}>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={{
                      backgroundColor: '#ffaa0017',
                      padding: 8,
                      borderRadius: 244,

                      width: 40,
                      height: 40,
                      marginBottom: 24,
                    }}>
                    <Icon
                      name="arrow-left-s-line"
                      size={24}
                      color={'#ffaa00'}
                    />
                  </TouchableOpacity>

                  <Text
                    style={{
                      fontFamily: 'Plus Jakarta Sans Bold',
                      fontWeight: 900,
                      fontSize: 18,
                      marginVertical: 4,
                      marginBottom: 32,
                      color: '#ffaa00',
                      alignSelf: 'flex-start',
                      textAlign: 'center',
                      padding: 12,
                      width: '100%',
                    }}>
                    Choose a Subscription
                  </Text>

                  {subDetailsJoin?.length === 0 ? (
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                      }}>
                      <View
                        style={{
                          marginTop: 24,
                          //alignSelf: 'flex-start',
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
                          backgroundColor: '#ffaa0012',
                          padding: 12,
                          width: '100%',
                        }}>
                        This Provider doesn't have a Subscription created yet
                      </Text>
                    </View>
                  ) : (
                    <FlatList
                      data={subDetailsJoin}
                      renderItem={renderItem}
                      keyExtractor={item => item?._id}
                    />
                  )}
                </View>
              </View>
            </Modal>
            <View>
              {/* {!subDetails?.profilePhoto ? (
              <Image
                source={require('../../../assets/images/profileheaderbg.png')}
                style={[{width: '100%', height: 259}]}
              />
            ) : (
              <Image
                source={{uri: subDetails?.profilePhoto}}
                style={[{width: '100%', height: 259}]}
              />
            )} */}
            </View>
            {/* <View style={{position: 'absolute', top: 50, left: 16}}>
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
            </View> */}
            <View
              style={[
                styles.innerContainer,
                {
                  backgroundColor: isDarkModeEnabled
                    ? '#ffffff09'
                    : '#ffffff09',
                  margin: 12,
                  borderRadius: 12,
                },
              ]}>
              <View style={{margin: -8}}>
                {yourself?._id === subDetails?._id ? (
                  <TouchableOpacity
                    style={{
                      alignSelf: 'flex-end',
                      backgroundColor: '#ffffff21',
                      padding: 12,
                      borderRadius: 24,
                    }}
                    onPress={() =>
                      navigation.navigate('UpdateNiche' as never, {subDetails})
                    }>
                    <Text style={{color: '#fff', fontSize: 12}}>
                      Update your Providers Profile
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      alignSelf: 'flex-end',
                      backgroundColor: '#ffffff21',
                      padding: 12,
                      borderRadius: 24,
                    }}
                    onPress={() =>
                      navigation.navigate('ReportScreen' as never, {
                        id: subDetails?._id,
                      })
                    }>
                    <Text style={{color: '#fff', fontSize: 12}}>Report</Text>
                  </TouchableOpacity>
                )}

                <ClickableImage
                  followersCount={subDetails?.followersCount}
                  userId={subDetails?._id}
                  key={transaction.id}
                  name={`${subDetails?.username ? subDetails?.username : ' '}`}
                  subscriptionType={subDetails?.email}
                  stars={1}
                  followers={subDetails?.followers}
                  // price={subDetails?.averagePrice}
                  followerId={yourself?._id}
                  isDarkModeEnabled={isDarkModeEnabled}
                  niche={subDetails?.niche}
                  imageSource={
                    subDetails?.profilePhoto
                      ? {
                          uri: subDetails.profilePhoto,
                          priority: FastImage.priority.normal,
                        }
                      : require('../../../assets/images/profileheaderbg.png')
                  }
                />
                {/* <View style={{marginTop: 24}}>
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: 14,
                      fontFamily: 'Plus Jakarta Sans Regular',
                    }}>
                    Status
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 2,
                      alignItems: 'center',
                      marginTop: 0,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: 'white',
                        fontFamily: 'Plus Jakarta Sans SemiBold',
                      }}>
                      Verified
                    </Text>
                    <VerifiedBadge
                      width={16}
                      height={16}
                      color={isDarkModeEnabled ? '#ffaa00' : '#ffaa00'}
                    />
                  </View>
                </View> */}
                {yourself?._id === subDetails?._id ? null : (
                  <FullBtn
                    buttonText="View Subscription Packages"
                    onPress={handleSubscribe}
                  />
                )}
              </View>
            </View>
            <View
              style={[
                styles.innerContainer,
                {
                  backgroundColor: isDarkModeEnabled
                    ? '#ffffff09'
                    : '#ffffff09',
                  margin: 12,
                  borderRadius: 12,
                },
              ]}>
              <View style={{marginBottom: 36, marginTop: 12}}>
                <Text
                  style={{
                    fontSize: 13,
                    color: 'white',
                    fontWeight: 900,
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                  }}>
                  Subscription BreakDown and Benefits
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: '#ffffff99',
                    lineHeight: 20,
                    fontWeight: 400,
                    marginTop: 8,
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                  }}>
                  {subDetails?.breakdownsSubscriptionsBenefits}
                </Text>
              </View>
              <View style={{marginBottom: 36, marginTop: 12}}>
                <Text
                  style={{
                    fontSize: 13,
                    color: 'white',
                    fontWeight: 900,
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                  }}>
                  Risk Profile
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: '#ffffff99',
                    lineHeight: 20,
                    fontWeight: 400,
                    marginTop: 8,
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                  }}>
                  {subDetails?.riskProfile} Profile Trader
                </Text>
              </View>
              <View style={{marginBottom: 36, marginTop: 12}}>
                <Text
                  style={{
                    fontSize: 13,
                    color: 'white',
                    fontWeight: 900,
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                  }}>
                  Traders Bio
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: '#ffffff99',
                    lineHeight: 20,
                    fontWeight: 400,
                    marginTop: 8,
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                  }}>
                  {subDetails?.bio}
                </Text>
              </View>

              <View style={{marginBottom: 36, marginTop: 12}}>
                <Text
                  style={{
                    fontSize: 13,
                    color: 'white',
                    fontWeight: 900,
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                  }}>
                  Clear Description of Trading Strategy
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: '#ffffff99',
                    lineHeight: 20,
                    fontWeight: 400,
                    marginTop: 8,
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                  }}>
                  {subDetails?.clearDescriptionOfStrategy}
                </Text>
              </View>

              <View style={{marginBottom: 36, marginTop: 12}}>
                <Text
                  style={{
                    fontSize: 13,
                    color: 'white',
                    fontWeight: 900,
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                  }}>
                  Total Number of Subscribers
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: '#ffffff99',
                    lineHeight: 20,
                    fontWeight: 400,
                    marginTop: 8,
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                  }}>
                  {formatNumberWithCommas(
                    subDetails?.earnings?.filter(
                      earning => earning?.status === 'accepted',
                    )?.length,
                  )}
                </Text>
              </View>

              <View style={{marginBottom: 36, marginTop: 12}}>
                <Text
                  style={{
                    fontSize: 13,
                    color: 'white',
                    fontWeight: 900,
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                  }}>
                  Date of Provider's Approval
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: '#ffffff99',
                    lineHeight: 20,
                    fontWeight: 400,
                    marginTop: 8,
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                  }}>
                  {formatDate(subDetails?.dateBecameProvider)}
                </Text>
              </View>
              <View style={{marginBottom: 36, marginTop: 12}}>
                <Text
                  style={{
                    fontSize: 13,
                    color: 'white',
                    fontWeight: 900,
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                  }}>
                  Average Rating
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: '#ffffff99',
                    lineHeight: 20,
                    fontWeight: 400,
                    marginTop: 8,
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                  }}>
                  <Rating
                    rating={calculateAverageRating(subDetails?.ratings || [])}
                  />
                </Text>
              </View>
            </View>
            <View style={{paddingHorizontal: 12, paddingVertical: 24}}>
              <Text
                style={{
                  fontSize: 12,
                  color: 'white',
                  fontWeight: 900,
                  marginBottom: 12,
                  fontFamily: 'Plus Jakarta Sans SemiBold',
                }}>
                Free Community
              </Text>
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-start',
                  backgroundColor: '#ffffff12',
                  padding: 10,
                  width: '100%',
                  borderRadius: 12,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                onPress={() =>
                  navigation.navigate('FreeCommunitySocket', {
                    freeCommunityId: subDetails?._id,
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
                  {subDetails?.username} Community
                </Text>

                <Icon name="arrow-right-s-line" size={24} color={'#fff'} />
              </TouchableOpacity>
            </View>

            {providerPosts?.posts?.length > 0 ? (
              <View style={{paddingHorizontal: 12, marginTop: 48}}>
                <BoldText
                  textContent="Most Recent Signal Posts"
                  fontSize={16}
                />
              </View>
            ) : null}
            {providerPosts?.slice(0, 2)?.map(post => (
              <View style={{paddingHorizontal: 12}}>
                <TouchableOpacity
                  key={post._id}
                  style={{
                    marginVertical: 10,
                    backgroundColor: '#ffffff12',
                    padding: 16,
                    width: '100%',
                    borderRadius: 12,
                  }}
                  // onPress={() =>
                  //   navigation.navigate('SinglePostView', {
                  //     post,
                  //     subDetails: subDetails,
                  //   })
                  // }
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 4,
                      alignItems: 'center',
                      marginBottom: 4,
                    }}>
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: 'Plus Jakarta Sans Bold',
                        fontWeight: 900,
                        fontWeight: 'bold',
                        color: '#ffaa00',
                      }}>
                      Admin - {subDetails?.firstName} {subDetails?.lastName}
                    </Text>
                    {/* Make sure the VerifiedBadge component is wrapped in a View or Text */}
                    <View>
                      <VerifiedBadge color="#ffaa00" width={16} />
                    </View>
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Plus Jakarta Sans Bold',
                      fontWeight: 900,
                      color: 'white',
                      marginBottom: 6,
                    }}>
                    Pair: {post?.title}
                  </Text>
                  {/* Wrap the following text in a <Text> component */}
                  <Text
                    style={{
                      color: '#ffffff',
                      fontSize: 12,
                      fontFamily: 'Plus Jakarta Sans Regular',
                      marginVertical: 8,
                      lineHeight: 18,
                    }}>
                    Description: {post?.content}
                  </Text>

                  {post?.images ? (
                    <FastImage
                      source={{
                        uri: post?.images[0],
                        priority: FastImage.priority.normal,
                      }}
                      style={{
                        width: '100%',
                        height: 200,
                        marginVertical: 12,
                        borderRadius: 8,
                      }}
                      resizeMode={FastImage.resizeMode.cover} // or 'contain', 'stretch', etc.
                    />
                  ) : null}

                  <View
                    style={{
                      backgroundColor: '#ffaa0045',
                      padding: 8,
                      marginTop: 12,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 12,
                      width: '100%',
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'Plus Jakarta Sans Bold',
                        fontWeight: 900,
                        color: '#ffaa00',
                        // marginVertical: 12,
                      }}>
                      Entry Price: {post?.pair}
                    </Text>
                  </View>
                  <View
                    style={
                      {
                        // flexDirection: 'row',
                        // flexWrap: 'wrap',
                        // justifyContent: 'space-between',
                        // gap: 4,
                      }
                    }>
                    {post?.sl ? (
                      <View
                        style={{
                          // backgroundColor: '#ffaa0045',
                          // padding: 12,
                          // marginTop: 12,
                          // justifyContent: 'center',
                          // alignItems: 'center',
                          // borderRadius: 12,
                          // width: 100,
                          marginTop: 24,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Plus Jakarta Sans Regular',
                            color: '#ffaa00',
                            fontSize: 12,
                          }}>
                          SL: {post?.sl}
                        </Text>
                      </View>
                    ) : null}
                    {post?.tp1 ? (
                      <View
                        style={{
                          // backgroundColor: '#ffaa0045',
                          // padding: 12,
                          // marginTop: 12,
                          // justifyContent: 'center',
                          // alignItems: 'center',
                          // borderRadius: 12,
                          // width: 100,
                          marginTop: 24,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Plus Jakarta Sans Regular',
                            color: '#ffaa00',
                            fontSize: 12,
                          }}>
                          TP1: {post?.tp1}
                        </Text>
                      </View>
                    ) : null}
                    {post?.tp2 ? (
                      <View
                        style={{
                          // backgroundColor: '#ffaa0045',
                          // padding: 12,
                          // marginTop: 12,
                          // justifyContent: 'center',
                          // alignItems: 'center',
                          // borderRadius: 12,
                          // width: 100,
                          marginTop: 24,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Plus Jakarta Sans Regular',
                            color: '#ffaa00',
                            fontSize: 12,
                          }}>
                          TP2: {post?.tp2}
                        </Text>
                      </View>
                    ) : null}
                    {post?.tp3 ? (
                      <View
                        style={{
                          // backgroundColor: '#ffaa0045',
                          // padding: 12,
                          // marginTop: 12,
                          // justifyContent: 'center',
                          // alignItems: 'center',
                          // borderRadius: 12,
                          // width: 100,
                          marginTop: 24,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Plus Jakarta Sans Regular',
                            color: '#ffaa00',
                            fontSize: 12,
                          }}>
                          TP3: {post?.tp3}
                        </Text>
                      </View>
                    ) : null}

                    {post?.tp4 ? (
                      <View
                        style={{
                          // backgroundColor: '#ffaa0045',
                          // padding: 12,
                          // marginTop: 12,
                          // justifyContent: 'center',
                          // alignItems: 'center',
                          // borderRadius: 12,
                          // width: 100,
                          marginTop: 24,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Plus Jakarta Sans Regular',
                            color: '#ffaa00',
                            fontSize: 12,
                          }}>
                          TP4: {post?.tp4}
                        </Text>
                      </View>
                    ) : null}
                    {post?.tp5 ? (
                      <View
                        style={{
                          // backgroundColor: '#ffaa0045',
                          // padding: 12,
                          // marginTop: 12,
                          // justifyContent: 'center',
                          // alignItems: 'center',
                          // borderRadius: 12,
                          // width: 100,
                          marginTop: 24,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Plus Jakarta Sans Regular',
                            color: '#ffaa00',
                            fontSize: 12,
                          }}>
                          TP5: {post?.tp5}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                </TouchableOpacity>
              </View>
            ))}
            <View
              style={[
                //  styles.innerContainer,
                {
                  // backgroundColor: ,
                  margin: 12,
                  borderRadius: 12,
                  marginTop: 0,
                },
              ]}></View>
            {subDetails?.ratings?.length > 0 && (
              <View
                style={[
                  // styles.innerContainer,
                  {
                    backgroundColor: '#ffffff12',
                    margin: 12,
                    borderRadius: 12,
                    marginTop: 0,
                    padding: 12,
                  },
                ]}>
                <View style={{paddingVertical: 8, gap: 24}}>
                  {subDetails?.ratings?.length > 0 && (
                    <>
                      <Text
                        style={{
                          fontFamily: 'Plus Jakarta Sans Bold',
                          fontWeight: 900,
                          fontSize: 16,
                          color: '#fff',
                        }}>
                        Reviews
                      </Text>
                      <View>
                        {subDetails.ratings.map((review, index) => (
                          <ReviewItem key={index} reviewContent={review} />
                        ))}
                      </View>
                    </>
                  )}
                </View>

                {/* Add more details as needed */}
              </View>
            )}
          </View>
        )}
      </BodyView>
    </SafeArea>
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
    padding: 12,
  },
  subscriptionContainer: {
    marginTop: 24,
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    padding: 16,
    backgroundColor: '#ffffff12',
    borderRadius: 12,
  },
  modalContent: {
    padding: 12,
    borderRadius: 10,
    width: '100%',
    paddingBottom: 48,
    maxHeight: '80%',
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
