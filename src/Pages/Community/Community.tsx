import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  TextInput,
  Button,
  View,
  Modal,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  SafeAreaView,
} from 'react-native';
import io from 'socket.io-client';
import SafeArea from '../../Component/SafeAreaViewCustom/SafeArea';
import BodyView from '../../Component/SafeAreaViewCustom/BodyView';
import MainHeader from '../../Component/Header/MainHeaders';
import TimeAgo from './TimeAgo';
import {useFocusEffect} from '@react-navigation/native';
import {getCurrentUser} from '../../Redux/Profile/Profile';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../Redux/Store/Store';
import CustomTextInput from '../../Component/CustomInputs/CustomTextInput';
import NewCustomTextInput from '../../Component/CustomInputs/NewCustomTextInput';
import SendMessageIcon from '../../Component/icons/SendMessageIcon';
import {Colors} from '../../Component/Colors/Colors';
import {baseApiUrl} from '../../Redux/Auth/Auth';
import {getCommunityMessages} from '../../Redux/Subscriptions/Sub';

const socket = io(`${baseApiUrl}`); // Change the URL to match your server
export const getTimeDifference = (timestamp: string): string => {
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
const CommunityChat = () => {


  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch<AppDispatch>();
  const [oldMessages, setOldMessages] = useState([]);
  const scrollViewRef = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getCurrentUser())
        .then(response => {
          console.log('get getCurrentUser retrieved:', response);
          console.log('get getCurrentUser retrieved:', response?.payload);
          setUserId(response?.payload?.user?._id);
        })
        .catch(error => {
          console.error('Error retrieving user sub:', error);
        });

      dispatch(getCommunityMessages())
        .then(response => {
          console.log(
            'get getCommunityMessagesgetCommunityMessages retrieved:',
            response?.payload,
          );
          setOldMessages(response?.payload);
        })
        .catch(error => {
          console.error('Error retrieving user sub:', error);
        });
    }, [dispatch]),
  );

  useEffect(() => {
    socket.emit('join community', userId);
    socket.on('community message', msg => {
      console.log(msg, 'msgmsg');
      setMessages(prevMessages => [...prevMessages, msg]);
      scrollToBottom();
    });

    return () => {
      socket.off('community message');
    };
  }, [userId]);

  const sendMessage = () => {
    console.log(userId, 'pppp');
    if (message.trim() !== '') {
      socket.emit('community message', userId, {msg: message});
      setMessage('');
    }
  };

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  };

  console.log(oldMessages, 'msgmsgmsg');

  const {height} = useWindowDimensions();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.newBG}}>
      <View style={{marginBottom: 72}}>
        <MainHeader title="Community Channel" />
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() => scrollToBottom()}>
          <View style={{paddingBottom: 200}}>
            {oldMessages.map((msg, index) => (
              <View
                key={index}
                style={{
                  backgroundColor:
                    msg?.userId != userId ? '#ffffff25' : '#FFAA0025',
                  marginVertical: 6,
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  borderRadius: 12,
                  maxWidth: '80%',
                  alignSelf: msg?.userId === userId ? 'flex-end' : 'flex-start',
                }}>
                <Text
                  style={{
                    color: msg?.userId != userId ? '#fff' : '#FFAA00',
                    fontFamily: 'Plus Jakarta Sans Bold',
                    fontWeight: 900,
                    fontSize: 10,
                    marginVertical: 4,
                  }}>
                  {msg?.firstName} {msg?.lastName}{' '}
                </Text>
                <Text
                  style={{
                    color: msg?.userId != userId ? '#fff' : '#FFAA00',
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                    fontSize: 13,
                    marginVertical: 2,
                  }}>
                  {msg?.message}
                </Text>
                <Text
                  style={{
                    color: msg?.userId != userId ? '#fff' : '#FFAA00',
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                    fontSize: 9,
                    marginBottom: 6,
                  }}>
                  {getTimeDifference(msg?.timestamp)}
                </Text>
              </View>
            ))}
            {messages.map((msg, index) => (
              <View
                key={index}
                style={{
                  backgroundColor:
                    msg?.userId != userId ? '#ffffff25' : '#FFAA0025',
                  marginVertical: 6,
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  borderRadius: 12,
                  maxWidth: '80%',
                  alignSelf: msg?.userId === userId ? 'flex-end' : 'flex-start',
                }}>
                <Text
                  style={{
                    color: msg?.userId != userId ? '#fff' : '#FFAA00',
                    fontFamily: 'Plus Jakarta Sans Bold',
                    fontWeight: 900,
                    fontSize: 10,
                    marginVertical: 4,
                  }}>
                  {msg?.firstName} {msg?.lastName}{' '}
                </Text>
                <Text
                  style={{
                    color: msg?.userId != userId ? '#fff' : '#FFAA00',
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                    fontSize: 13,
                    marginVertical: 2,
                  }}>
                  {msg?.message}
                </Text>
                <Text
                  style={{
                    color: msg?.userId != userId ? '#fff' : '#FFAA00',
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                    fontSize: 9,
                    marginBottom: 6,
                  }}>
                  {getTimeDifference(msg?.timestamp)}
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
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={12}
              placeholder="Type your comment here"
              placeholderTextColor="#ccc"
            />

            <TouchableOpacity
              onPress={sendMessage}
              style={{
                width: ' 22%',
                borderRadius: 12,
                alignItems: 'flex-end',
                justifyContent: 'center',
                marginRight: 24,
                paddingTop: -36,
              }}>
              <SendMessageIcon color="#ffaa00" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    gap: 8,
    // borderTopColor: '#ccc',
    position: 'absolute',
    bottom: -2,
    left: 0,
    right: 0,
    backgroundColor: Colors?.newBG,
    paddingTop: -16,
  },
  container: {
    flex: 1,
  },
});

export default CommunityChat;
