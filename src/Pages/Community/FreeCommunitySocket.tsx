import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import io from 'socket.io-client';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {getCurrentUser, getUserProfile} from '../../Redux/Profile/Profile';
import {AppDispatch} from '../../Redux/Store/Store';
import {baseApiUrl} from '../../Redux/Auth/Auth';
import {Colors} from '../../Component/Colors/Colors';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import SendMessageIcon from '../../Component/icons/SendMessageIcon';
import MainHeader from '../../Component/Header/MainHeaders';
import {launchImageLibrary} from 'react-native-image-picker';
import ImageView from 'react-native-image-viewing';
import Icon from 'react-native-remix-icon';
import CancelIcon from '../../Component/icons/CancelIcon';
import GalleryIcon from '../../Component/icons/GalleryIcon';
import FastImage from 'react-native-fast-image';

const SOCKET_URL = `${baseApiUrl}`;

export const formatTimestamp = (timestamp: string): string => {
  const currentTime = new Date();
  const pastTime = new Date(timestamp);
  const timeDifference = Math.floor(
    (currentTime.getTime() - pastTime.getTime()) / 1000,
  );

  if (timeDifference < 60) {
    return `${timeDifference} second${timeDifference !== 1 ? 's' : ''} ago`;
  } else if (timeDifference < 3600) {
    const minutes = Math.floor(timeDifference / 60);
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else if (timeDifference < 86400) {
    const hours = Math.floor(timeDifference / 3600);
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else {
    // Handle cases for days, weeks, months, etc. if needed
    // For simplicity, let's return the full timestamp
    return timestamp;
  }
};

const FreeCommunitySocket = () => {
  const dispatch = useDispatch<AppDispatch>();
  const route = useRoute();
  const freeCommunityId = route.params?.freeCommunityId || '';
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messageClicked, setMessagesClicked] = useState([]);
  const [messageClickedImages, setMessagesClickedImages] = useState([]);
  const [messagesEmitted, setMessagesEmitted] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userDataProvider, setUserDataProvider] = useState(null);
  const [image, setImage] = useState('');
  const [isImageViewVisible, setImageViewVisible] = useState(false);
  const [isReplyView, setReplyView] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const scrollViewRef = useRef(null);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  };

  useEffect(() => {
    const socketInstance = io(SOCKET_URL);
    setSocket(socketInstance);

    socketInstance.on('freeCommunityIdmessage', msg => {
      setMessagesEmitted(prevMessages => [...prevMessages, msg]);
    });

    socketInstance.on('connect', () => {
      setIsConnected(true);
      socketInstance.emit('joinRoomfreeCommunitySockets', {freeCommunityId});
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [freeCommunityId]);

  useFocusEffect(
    useCallback(() => {
      setMessagesLoading(true);
      const fetchUserData = async () => {
        try {
          const response = await dispatch(getCurrentUser());
          const userId = response?.payload?.user?._id;
          setUserId(userId);

          const profileResponse = await dispatch(getUserProfile(userId));
          setUserData(profileResponse?.payload);

          const profileResponseS = await dispatch(
            getUserProfile(freeCommunityId),
          );
          setUserDataProvider(profileResponseS?.payload);
          setMessagesLoading(false);
        } catch (error) {
          console.error('Error retrieving user or profile:', error);
        }
      };

      const fetchMessages = async () => {
        try {
          const response = await axios.get(
            `${baseApiUrl}/api/v1/freeCommunitySockets/${freeCommunityId}`,
          );
          const fetchedMessages = response.data;
          const formattedMessages = fetchedMessages.map(message => ({
            ...message,
            _id: message?._id,
            sender: message.sender._id,
            repliedMessage: message?.repliedMessage,
            repliedImageUrl: message?.repliedImageUrl,
            repliedMessageID: message?.repliedMessageID,
            imageUrl: message?.imageUrl,
            timestamp: new Date(message.timestamp)?.toLocaleTimeString(),
          }));
          setMessages(formattedMessages);
        } catch (error) {
          setError('Failed to fetch messages');
          console.error('Error fetching messages:', error);
        }
      };

      fetchUserData();
      fetchMessages();
    }, [dispatch, freeCommunityId]),
  );

  const handleSelectImages = () => {
    launchImageLibrary(
      {mediaType: 'photo', selectionLimit: 0},
      async response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.error('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const images = response.assets;

          images.forEach(image => {
            const formData = new FormData();
            formData.append('file', {
              uri: image.uri,
              type: image.type,
              name: image.fileName || 'photo.jpg',
            });

            socket?.emit(
              'sendMessagefreeCommunitySockets',
              {
                userId,
                freeCommunityId,
                message: '',
                image: formData?._parts,
              },
              ack => {
                if (ack.error) {
                  console.log('Message send failed:', ack.error);
                  setError('Failed to send message');
                }
              },
            );
          });
        } else {
          console.log('No images selected');
        }
      },
    );
  };

  const renderMessages = () => {
    return [...messages, ...messagesEmitted].map(item => (
      <TouchableOpacity
        key={item?._id}
        style={{
          backgroundColor: item?.sender !== userId ? '#ffffff25' : '#FFAA0025',
          marginVertical: 6,
          paddingVertical: 6,
          paddingHorizontal: 10,
          borderRadius: 12,
          maxWidth: '80%',
          alignSelf: item?.sender === userId ? 'flex-end' : 'flex-start',
        }}>
        <View>
          {item?.repliedMessage && (
            <TouchableOpacity
              style={{
                backgroundColor: '#ffaa00',
                marginVertical: 8,
                padding: 6,
                borderRadius: 6,
              }}>
              <Text
                style={{
                  color: 'fff',

                  paddingTop: 3,

                  fontWeight: 900,
                  fontSize: 12,
                }}>
                Replying to Message
              </Text>
              <Text
                style={{
                  color: 'fff',
                  backgroundColor: '#ffaa00',
                  marginVertical: 4,
                  padding: 3,
                  borderRadius: 12,
                }}>
                {item?.repliedMessage}
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => {
              setReplyView(true);
              if (item?.imageUrl) {
                setSelectedImage(item?.imageUrl);
                setSelectedImage('');
                setImageViewVisible(true);
                setMessagesClickedImages(item);
              } else {
                setMessagesClicked(item);
                setSelectedImage(item);
                setMessagesClickedImages('');
                console.log('render', item);
              }
            }}
            onLongPress={() => {
              setReplyView(true);
              if (item?.imageUrl) {
                setMessagesClicked('');
                setMessagesClickedImages(item);
              } else {
                setMessagesClicked(item);
                setSelectedImage(item);
                setMessagesClickedImages('');
                console.log('render', item);
              }
            }}>
            <Text
              style={{
                color: item?.sender !== userId ? '#fff' : '#FFAA00',
                fontFamily: 'Plus Jakarta Sans Bold',
                fontWeight: 'bold',
                fontSize: 10,
              }}>
              {item?.sender === userId ? 'You' : 'User'}
            </Text>
            {item?.message && (
              <Text
                style={{
                  color: item?.sender !== userId ? '#fff' : '#FFAA00',
                  fontFamily: 'Plus Jakarta Sans SemiBold',
                  fontSize: 13,
                  marginVertical: 2,
                }}>
                {item?.message}
              </Text>
            )}
            {item?.imageUrl && (
              <FastImage
                resizeMode={FastImage.resizeMode.cover}
                source={{
                  uri: item?.imageUrl,
                  priority: FastImage.priority.high,
                }}
                style={{
                  width: 100,
                  height: 100,
                  marginVertical: 6,
                  borderRadius: 10,
                }}
              />
            )}
            <Text
              style={{
                color: item?.sender !== userId ? '#fff' : '#FFAA00',
                fontFamily: 'Plus Jakarta Sans SemiBold',
                fontSize: 9,
                marginBottom: 6,
              }}>
              {formatTimestamp(item?.timestamp)}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    ));
  };
  console.log(messageClicked, 'messageClickedmessageClicked');
  return (
    <SafeAreaView style={styles.safeArea}>
      {messagesLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={{height: '100%', width: '100%'}}>
          <MainHeader
            title={
              userDataProvider?.username
                ? `${userDataProvider.username}'s Community`
                : `${
                    freeCommunityId === 'Pro Trader'
                      ? `Pro Trader's Community`
                      : freeCommunityId === 'General User'
                      ? `General Users Community`
                      : 'Community'
                  }  `
            }
          />
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.select({ios: 80, android: 50})}>
            <ScrollView
              ref={scrollViewRef}
              contentContainerStyle={{paddingVertical: 10}}
              onContentSizeChange={() => scrollToBottom()}>
              {renderMessages()}
            </ScrollView>
            <View>
              {isReplyView && (
                <Pressable
                  onPress={() => {
                    setReplyView(false);
                    setMessagesClickedImages('');
                    setMessagesClicked('');
                  }}
                  style={{marginBottom: 12}}>
                  <CancelIcon color="#ffaa00" width={28} height={28} />
                </Pressable>
              )}
              {isReplyView && (
                <View style={{padding: 0}}>
                  <View
                    style={{
                      backgroundColor: '#ffaa00',
                      // // borderTopLeftRadius: 12,
                      // // borderTopRightRadius: 12,
                      //borderRadius: 0,
                      padding: 12,
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontWeight: 'bold',
                        fontSize: 15,
                        marginBottom: 4,
                      }}>
                      Replying to Message{messageClicked?.sender?.username}{' '}
                    </Text>
                    <Text style={{color: '#000', fontSize: 12}}>
                      {messageClicked?.message}
                    </Text>
                    {messageClickedImages?.imageUrl && (
                      <FastImage
                        resizeMode={FastImage.resizeMode.cover}
                        source={{
                          uri: messageClickedImages?.imageUrl,
                          priority: FastImage.priority.high,
                        }}
                        style={{
                          width: '100%',
                          height: 200,

                          borderRadius: 0,
                        }}
                      />
                    )}
                  </View>
                </View>
              )}
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, {maxHeight: 150, minHeight: 50}]}
                  placeholder="Type a message"
                  value={messageInput}
                  onChangeText={setMessageInput}
                  placeholderTextColor={'#ffaa0085'}
                  multiline={true}
                />
                <TouchableOpacity
                  onPress={handleSelectImages}
                  style={styles.imagePickerButton}>
                  <GalleryIcon color="#ffaa0085" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (isReplyView === true) {
                      socket.emit('sendMessagefreeCommunitySockets', {
                        userId,
                        freeCommunityId,
                        message: messageInput,
                        image: null,
                        repliedMessage: messageClicked?.message || null,
                        repliedImageUrl: messageClickedImages?.imageUrl || null,
                        repliedMessageID:
                          messageClicked?._id ||
                          messageClickedImages?._id ||
                          null,
                      });
                      setMessageInput('');
                    } else {
                      socket.emit('sendMessagefreeCommunitySockets', {
                        userId,
                        freeCommunityId,
                        message: messageInput,
                        image: null,
                      });
                      setMessageInput('');
                    }
                  }}
                  style={[styles.sendButton]}>
                  <SendMessageIcon color="#ffaa00" />
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
          <ImageView
            images={[{uri: selectedImage}]}
            imageIndex={0}
            visible={isImageViewVisible}
            onRequestClose={() => setImageViewVisible(false)}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.newBG,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    // paddingHorizontal: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ffaa0085',
    borderTopWidth: 1,
    paddingTop: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ffaa0085',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 13,
    color: '#ffff',
    paddingTop: 14,
  },
  sendButton: {
    marginLeft: 10,
  },
  imagePickerButton: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePickerText: {
    fontSize: 20,
    color: '#007BFF',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default FreeCommunitySocket;
