import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Modal,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import SafeArea from '../../Component/SafeAreaViewCustom/SafeArea';
import NewCustomTextInput from '../../Component/CustomInputs/NewCustomTextInput';
import {Colors} from '../../Component/Colors/Colors';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../Redux/Store/Store';
import {getCurrentUser, getUserProfile} from '../../Redux/Profile/Profile';
import {createRating, getGroupMessages} from '../../Redux/Subscriptions/Sub';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import SubHeaders from '../../Component/Header/SubHeaders';
import VerifiedBadge from '../../Component/icons/VerifiedBadge';
import io from 'socket.io-client';
import SendMessageIcon from '../../Component/icons/SendMessageIcon';
import Icon from 'react-native-remix-icon';
import {baseApiUrl} from '../../Redux/Auth/Auth';
import FreeCommunitySocket from '../Community/FreeCommunitySocket';

const socket = io(`${baseApiUrl}`);

const SinglePost: React.FC = () => {
  const route = useRoute();
  const {post, subDetails} = route.params;
  const [isVisible, setIsVisible] = useState(false); // State to control visibility
  const [subType, setSubType] = useState('created'); // State to track subscription type
  const toggleVisibility = (type: string) => {
    setIsVisible(!isVisible); // Toggle visibility state
    setSubType(type); // Set subscription type
  };
  const dispatch = useDispatch<AppDispatch>();
  const [subDetailsJoin, setSubDetailsJoin] = useState([]);
  const [messages, setMessage] = useState([]);
  const [user, setUser] = useState([]);
  const [thisUser, setThisUser] = useState([]);

  const groupId = post?._id;
  const userId = user?.user?._id;
  const [haveRatings, setHaveRatings] = useState(false);
  const scrollViewRef = useRef(null);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getCurrentUser())
        .then(response => {
          setUser(response?.payload);
        })
        .catch(error => {});

      dispatch(getGroupMessages(post?._id))
        .then(response => {
          ////console.log(response?.payload, 'posststtsmes');
          setSubDetailsJoin(response?.payload);
        })
        .catch(error => {});
    }, [dispatch]),
  );

  const [showModal, setShowModal] = useState(false);
  const [showModalRating, setShowModalRating] = useState(false);

  useEffect(() => {
    dispatch(getUserProfile(post?.author))
      .then(response => {
        setThisUser(response?.payload);
        const userHasRatings = response?.payload?.ratings?.some(
          rating => rating?.user === userId,
        );

        if (userHasRatings) {
          setHaveRatings(true);
          //console.log(`User with ID ${userId} has ratings.`);
        } else {
          setHaveRatings(false);
          //console.log(`User with ID ${userId} does not have any ratings.`);
        }
      })
      .catch(error => {});
    socket.on('connect', () => {
      console.log('Connected to server');
    });
    // Join the group and set up event listeners
    socket.emit('join group', userId, groupId);
    socket.on('chat message', data => {
      //console.log(data, 'ldata');
      setMessage(prevMessages => [...prevMessages, data]); // Spread previous messages and add new message separately
      scrollToBottom();
    });

    // Clean up event listener on component unmount
    return () => {
      socket.off('chat message');
    };
  }, [groupId, userId]);

  const formatRelativeTime = timestamp => {
    const currentTime = new Date();
    const messageTime = new Date(timestamp);
    const difference = currentTime - messageTime;
    const seconds = Math?.floor(difference / 1000);
    const minutes = Math?.floor(seconds / 60);
    const hours = Math?.floor(minutes / 60);
    const days = Math?.floor(hours / 24);
    const weeks = Math?.floor(days / 7);
    const months = Math?.floor(days / 30);
    const years = Math?.floor(days / 365);

    if (years > 0) {
      return years === 1 ? 'a year ago' : `${years} years ago`;
    } else if (months > 0) {
      return months === 1 ? 'a month ago' : `${months} months ago`;
    } else if (weeks > 0) {
      return weeks === 1 ? 'a week ago' : `${weeks} weeks ago`;
    } else if (days > 0) {
      return days === 1 ? 'a day ago' : `${days} days ago`;
    } else if (hours > 0) {
      return hours === 1 ? 'an hour ago' : `${hours} hours ago`;
    } else if (minutes > 0) {
      return minutes === 1 ? 'a minute ago' : `${minutes} minutes ago`;
    } else {
      return seconds === 1 ? 'a second ago' : `${seconds} seconds ago`;
    }
  };

  const {fontScale} = useWindowDimensions();
  const navigation = useNavigation();

  ////onsole.log(subDetailsJoin, 'subDetailsJoin');

  const [messageInput, setMessageInput] = useState(''); // State to track the message input

  // Function to handle sending the message
  const sendMessage = () => {
    if (messageInput.trim() !== '') {
      const timestamp = Date.now(); // Get current timestamp
      const message = {
        msg: messageInput, // Assuming "msg" is the key for the message content
        timestamp: timestamp,
        sender: user?.user?._id,
        admin: post?.author,
      };

      console.log(message, 'messagemessage');
      socket.emit('chat message', userId, message, groupId); // Emit userId along with message
      setMessageInput(''); // Clear the message input after sending
    }
  };

  const [rating, setRating] = useState(0); // State to track the rating

  const handleStarClick = starIndex => {
    setRating(starIndex + 1);
  };
  //console.log(rating, 'ratingratingv');

  const [values, setValues] = useState({
    review: '', // Initialize review state
  });
  const [touched, setTouched] = useState({
    review: false, // Initialize touched state for review
  });
  const [errors, setErrors] = useState({
    review: '', // Initialize error state for review
  });

  const handleChange = name => text => {
    // Update the state based on the input name
    setValues({...values, [name]: text});
    // Reset the error for the input
    setErrors({...errors, [name]: ''});
  };

  const handleBlur = name => () => {
    // Mark the input as touched
    setTouched({...touched, [name]: true});
    // Perform validation on the input
    if (!values[name]) {
      // If the input is empty, set an error message
      setErrors({...errors, [name]: 'This field is required'});
    }
  };

  const handleSubmit = () => {
    // Perform any validation if needed

    if (rating === 0 || values?.review?.trim() === '') {
      // If rating is 0 or review is empty, show an alert and return early
      setShowModalRating(false);
      return Promise.reject('Rating is 0 or review is empty');
    }

    const review = values?.review;
    const _id = thisUser?._id;
    // Dispatch the createRating action with the review and rating
    return dispatch(createRating({review, rating, _id}))
      .then(response => {
        if (response?.payload?.message === 'User rated successfully') {
          //console.log(response, 'rrrrra');
          //console.log('Rating submitted successfully:', response);
          setRating(0);
          setValues({...values, review: ''});
          Alert.alert('Success', 'Rating submitted successfully');
          setShowModalRating(false);
        } else {
          Alert.alert('Error', 'An Error while Rating this User');
        }
      })
      .catch(error => {
        //console.error('Error submitting rating:', error);
        Alert.alert(
          'Error',
          'Failed to submit rating. Please try again later.',
        );
        return Promise.reject(error);
      });
  };

  const {width} = useWindowDimensions();
  return (
    <SafeArea>
      <View style={[styles.container, {backgroundColor: Colors?.newBG}]}>
        <SubHeaders
          GroupName={subDetails?.title}
          count={subDetails?.users?.length}
          id={subDetails?.id}
        />

        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() => scrollToBottom()}>
          <View
            style={[
              styles.formContainer,
              {
                marginBottom: 48,
                height: '100%',
                position: 'relative',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: 12,
              },
            ]}>
            {haveRatings === false ? (
              <View>
                <TouchableOpacity
                  style={{
                    marginVertical: 10,
                    backgroundColor: '#ffffff12',
                    padding: 16,
                    width: '100%',
                    borderRadius: 12,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  onPress={() => setShowModalRating(true)}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: 'Plus Jakarta Sans Bold',
                      fontWeight: 'bold',
                      color: '#ffaa00',
                    }}>
                    Rate this Provider
                  </Text>
                  <TouchableOpacity
                    style={{
                      padding: 8,
                      backgroundColor: '#ffffff25',
                      paddingHorizontal: 24,
                      borderRadius: 12,
                    }}
                    onPress={() => setShowModalRating(true)}>
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: 'Plus Jakarta Sans Bold',
                        fontWeight: 'bold',
                        color: '#fff',
                      }}>
                      Yes
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
                {showModalRating ? (
                  <View
                    style={{
                      width: width / 1.07,
                      borderColor: '#ffaa00',
                      borderWidth: 1,
                      padding: 16,
                      borderRadius: 16,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 12,
                      }}>
                      {[...Array(5)].map((_, starIndex) => (
                        <TouchableOpacity
                          key={starIndex}
                          style={{
                            alignSelf: 'center',
                          }}
                          onPress={() => handleStarClick(starIndex)}>
                          <Icon
                            name={
                              starIndex < rating ? 'star-fill' : 'star-line'
                            } // Fill stars up to the clicked one
                            size={36}
                            color={starIndex < rating ? '#ffaa00' : '#ffffff'}
                          />
                        </TouchableOpacity>
                      ))}
                    </View>

                    <View style={{width: '100%'}}>
                      <NewCustomTextInput
                        label="Review"
                        value={values.review}
                        onChangeText={handleChange('review')}
                        onBlur={handleBlur('review')}
                        error={touched.review && errors.review}
                        placeholder="Enter your review"
                        height={80}
                        multiline
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginBottom: 12,
                        alignSelf: 'flex-end',
                      }}>
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#ffaa0035',
                          paddingVertical: 16,
                          borderRadius: 12,
                          marginTop: 16,
                          alignItems: 'center',
                          paddingHorizontal: 36,
                          marginRight: 12,
                        }}
                        onPress={() => setShowModalRating(false)}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: 'Plus Jakarta Sans Bold',
                            color: '#ffaa00',
                          }}>
                          Cancel
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#ffaa00',
                          paddingVertical: 16,
                          borderRadius: 12,
                          marginTop: 16,
                          alignItems: 'center',
                          paddingHorizontal: 36,
                        }}
                        onPress={handleSubmit}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: 'Plus Jakarta Sans Bold',
                            color: '#fff',
                          }}>
                          Submit
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : null}
              </View>
            ) : null}

            <View
              key={post._id}
              style={{
                marginTop: 6,
                backgroundColor: '#ffffff12',
                padding: 16,
                width: '100%',
                borderRadius: 12,
                marginBottom: 16,
              }}>
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
                <Image
                  source={{uri: post?.images[0]}}
                  style={{
                    width: '100%',
                    height: 200,
                    marginVertical: 12,
                    borderRadius: 8,
                  }}
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
                    // fontSize: 14,
                    // fontFamily: 'Plus Jakarta Sans Bold',
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
            </View>
            {/* <FreeCommunitySocket freeCommunityId={post?._id} /> */}
            {subDetailsJoin?.map((message, index) => (
              <View
                key={index}
                style={{
                  maxWidth: 300,
                  backgroundColor:
                    message?.sender === post?.author
                      ? '#ffaa0021'
                      : message?.sender === user?.user?._id
                      ? '#ffffff25'
                      : '#ffffff15',
                  padding: 12,
                  borderRadius: 12,
                  marginBottom: 6,
                  alignSelf:
                    message?.sender === post?.author
                      ? 'flex-end '
                      : 'flex-start',
                }}>
                <Text
                  style={{
                    fontFamily: 'Plus Jakarta Sans Bold',
                    color:
                      message?.sender === post?.author
                        ? '#ffaa00'
                        : message?.sender === user?.user?._id
                        ? '#fff'
                        : '#ffaa00',
                    fontSize: 14,
                  }}>
                  {message?.sender === post?.author
                    ? 'Admin'
                    : message?.sender === user?.user?._id
                    ? 'You'
                    : '********'}
                </Text>

                <Text
                  style={{
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                    color:
                      message?.sender === post?.author
                        ? '#ffaa00'
                        : message?.sender === user?.user?._id
                        ? '#fff'
                        : '#ffffff',
                    fontSize: 12,
                  }}>
                  {message?.msg || 'No message'}
                </Text>

                <Text
                  style={{
                    fontFamily: 'Plus Jakarta Sans Bold',
                    color:
                      message?.sender === post?.author
                        ? '#ffaa0095'
                        : message?.sender === user?.user?._id
                        ? '#fff'
                        : '#ffffff75',
                    fontSize: 10,
                    paddingTop: 12,
                  }}>
                  {formatRelativeTime(message?.timestamp)}
                </Text>
              </View>
            ))}

            {messages?.map((message, index) => (
              <View
                key={index}
                style={{
                  maxWidth: 300,
                  backgroundColor:
                    message?.sender === post?.author
                      ? '#ffaa0025'
                      : '#ffffff25',
                  padding: 12,
                  borderRadius: 12,
                  marginBottom: 6,
                  alignSelf:
                    message?.sender === post?.author
                      ? 'flex-end '
                      : 'flex-start',
                }}>
                <Text
                  style={{
                    fontFamily: 'Plus Jakarta Sans Bold',
                    color:
                      message?.sender === post?.author
                        ? '#ffaa00'
                        : message?.sender === user?.user?._id
                        ? '#fff'
                        : '#ffaa00',
                    fontSize: 14,
                  }}>
                  {message?.sender === post?.author
                    ? 'Admin'
                    : message?.sender === user?.user?._id
                    ? 'You'
                    : '********'}
                </Text>

                <Text
                  style={{
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                    color:
                      message?.sender === post?.author ? '#ffaa00' : '#Fff',
                    fontSize: 12,
                  }}>
                  {message?.msg}
                </Text>

                <Text
                  style={{
                    fontFamily: 'Plus Jakarta Sans Bold',
                    color:
                      message?.sender === post?.author
                        ? '#ffaa0095'
                        : '#ffffff75',
                    fontSize: 10,
                    paddingTop: 12,
                  }}>
                  {formatRelativeTime(message?.timestamp)}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>

        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior based on platform
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // marginBottom: 48,
              marginTop: -72,
              backgroundColor: Colors.newBG,
              borderTopWidth: 1,
              borderTopColor: '#ffaa00',
              paddingVertical: 12,
            }}>
            <TextInput
              style={[
                {
                  color: '#fff',
                  flex: 1,
                  height: 60,
                  borderRadius: 12,
                  paddingLeft: 24,
                  fontFamily: 'Plus Jakarta Sans Regular',
                  width: '70%',
                },
              ]}
              value={messageInput}
              multiline
              numberOfLines={12}
              onChangeText={setMessageInput}
              placeholder="Type your comment here"
              placeholderTextColor="#ccc"
            />

            <TouchableOpacity
              onPress={sendMessage}
              style={{
                width: ' 22%',
                //backgroundColor: '#ffaa00',
                // height: 50,
                borderRadius: 12,
                alignItems: 'flex-end',
                justifyContent: 'center',
                marginRight: 24,
                paddingTop: -36,

                // marginTop: -16
              }}>
              <SendMessageIcon color="#ffaa00" />
              {/* <Text
                style={{
                  color: Colors?.newBG,
                  fontSize: 14,
                  fontFamily: 'Plus Jakarta Sans Regular',
                }}>
                Send
              </Text> */}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>

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
                Logging out, to log back in you'll use your email and password
              </Text>
              <TouchableOpacity
                style={[styles.modalButtonLine, {width: '100%'}]}
                //</View> onPress={() => navigation.navigate('LoginScreen')}
                onPress={() => setShowModal(false)}>
                <Text style={styles.modalButtonTextLine}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, {width: '100%', marginTop: 10}]}
                onPress={() =>
                  //console.log('pppssss')}
                  //</View> onPress={() =>
                  navigation.navigate('LoginScreen')
                }>
                <Text style={styles.modalButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    borderRadius: 24,
    position: 'relative',
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
    fontSize: 17,
  },
  selectedLabelView: {
    color: '#ffaa00', // Selected label color
    fontFamily: 'Plus Jakarta Sans Bold',
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

export default SinglePost;
