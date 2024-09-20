import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions,
  Image,
} from 'react-native';
import SafeArea from '../../Component/SafeAreaViewCustom/SafeArea';
import {Formik} from 'formik';
import * as Yup from 'yup';
import NewCustomTextInput from '../../Component/CustomInputs/NewCustomTextInput';
import {Colors} from '../../Component/Colors/Colors';
import ProfileHeaders from '../../Component/Header/ProfileHeaders';
import BodyView from '../../Component/SafeAreaViewCustom/BodyView';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../Redux/Store/Store';
import {getCurrentUser} from '../../Redux/Profile/Profile';
import {
  getPostPerSubscription,
  //getUsersPosts,
  getUsersSubCreated,
  getUsersub,
  getUsersubJoined,
} from '../../Redux/Subscriptions/Sub';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import SubHeaders from '../../Component/Header/SubHeaders';
import PostIcon from '../../Component/icons/PostIcon';
import SemiBoldText from '../../Component/Texts/SemiBoldText';
import VerifiedBadge from '../../Component/icons/VerifiedBadge';
import FastImage from 'react-native-fast-image';
const GetSub: React.FC = () => {
  const route = useRoute();
  const {id} = route.params;

  const [isVisible, setIsVisible] = useState(false); // State to control visibility
  const [subType, setSubType] = useState('created'); // State to track subscription type
  const toggleVisibility = (type: string) => {
    setIsVisible(!isVisible);
    setSubType(type);
  };

  const dispatch = useDispatch<AppDispatch>();
  const [subDetails, setSubDetails] = useState([]);
  const [subDetailsJoin, setSubDetailsJoin] = useState([]);
  const [user, setUser] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getUsersub(id))
        .then(response => {
          setSubDetails(response?.payload);

          dispatch(getPostPerSubscription(response?.payload?._id))
            .then(response => {
              setSubDetailsJoin(response?.payload);
            })
            .catch(error => {});

          dispatch(getCurrentUser())
            .then(response => {
              setUser(response?.payload);
            })
            .catch(error => {});
        })
        .catch(error => {});
    }, [dispatch]),
  );

  const {fontScale} = useWindowDimensions();
  const navigation = useNavigation();

  console.log(subDetails, 'useruser');
  return (
    <SafeArea>
      <View style={styles.container}>
        <SubHeaders
          GroupName={subDetails?.title}
          count={subDetails?.users?.length}
          id={subDetails?.id}
          creator={subDetails?.creator}
        />
        <BodyView color="#f4f4f4">
          <View
            style={[
              styles.formContainer,
              {marginBottom: 48, position: 'relative'},
            ]}>
            {subDetailsJoin?.map(post => (
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
                //   navigation.navigate('SinglePost', {
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
                    Admin - {post?.authorFirstName} {post?.authorLastName}
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
                      priority: FastImage.priority.high,
                    }}
                    style={{
                      width: '100%',
                      height: 200,
                      marginVertical: 12,
                      borderRadius: 8,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
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
            ))}

            {subDetailsJoin?.length === 0 && (
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
                  <View>
                    <PostIcon color="#ffaa0065" width={120} height={120} />
                  </View>
                </View>

                <Text
                  style={{
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                    fontSize: 13,
                    marginVertical: 4,
                    marginBottom: 32,
                    color: '#ffaa00',
                    textAlign: 'center',
                  }}>
                  No Signals Posted yet
                </Text>
              </View>
            )}
          </View>
        </BodyView>
        {user?.user?._id === subDetails?.creator ? (
          <View style={styles.floatingButton}>
            <TouchableOpacity
              style={styles.createPostButton}
              onPress={() => {
                navigation.navigate('CreatePost', {subID: id} as never);
              }}>
              <Text style={styles.createPostButtonText}>+ Create</Text>
            </TouchableOpacity>
          </View>
        ) : null}
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
    position: 'relative',
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

  floatingButton: {
    position: 'absolute',
    padding: 8,
    backgroundColor: '#ffaa0045',
    borderRadius: 12,
    bottom: 20, // Adjust this value as needed to position the button
    right: 20, // Adjust this value as needed to position the button
  },
  createPostButton: {
    backgroundColor: '#ffaa00',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  createPostButtonText: {
    fontFamily: 'Plus Jakarta Sans SemiBold',
    fontSize: 14,
    color: '#fff',
  },
});

export default GetSub;
