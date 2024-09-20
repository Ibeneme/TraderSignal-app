import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import io from 'socket.io-client';
import MainHeader from '../../Component/Header/MainHeaders';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../Redux/Store/Store';
import {Colors} from '../../Component/Colors/Colors';
import {baseApiUrl} from '../../Redux/Auth/Auth';
import {getCommunityMessagesNoToken} from '../../Redux/Subscriptions/Sub';

const socket = io(`${baseApiUrl}`); // Change the URL to match your server

interface Message {
  firstName: string;
  lastName: string;
  message: string;
  timestamp: any; // Assuming timestamp is a number
  // Add other properties if needed
}

const NoCommunityChat = () => {
  const userId = '123456789123456789123456789123456789123456789123456789';
  const [messages, setMessages] = useState<Message[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const [oldMessages, setOldMessages] = useState<Message[]>([]);
  const scrollViewRef = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getCommunityMessagesNoToken())
        .then(response => {
          setOldMessages(response?.payload);
        })
        .catch(error => {
          console.log('Error retrieving user sub:', error);
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

  const navigation = useNavigation();
  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      (scrollViewRef.current as ScrollView).scrollToEnd({animated: true});
    }
  };

  console.log(oldMessages, 'msgmsgmsg');
  const getTimeDifference = (timestamp: string): string => {
    const currentTime = new Date();
    const pastTime = new Date(timestamp);
    const timeDifference = Math?.floor(
      (currentTime?.getTime() - pastTime?.getTime()) / 1000,
    );

    if (timeDifference < 60) {
      return `${timeDifference} second${timeDifference !== 1 ? 's' : ''} ago`;
    } else if (timeDifference < 3600) {
      const minutes = Math?.floor(timeDifference / 60);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (timeDifference < 86400) {
      const hours = Math?.floor(timeDifference / 3600);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      return timestamp;
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.newBG}}>
      <View style={{marginBottom: 72}}>
        <MainHeader title="Community Channel" />
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() => scrollToBottom()}>
          <View style={{paddingBottom: 200}}>
            {oldMessages?.map((msg, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: '#FFAA0025',
                  marginVertical: 6,
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  borderRadius: 12,
                  maxWidth: '80%',
                  alignSelf: 'flex-start',
                }}>
                <Text
                  style={{
                    color: '#FFAA00',
                    fontFamily: 'Plus Jakarta Sans Bold',
                    fontWeight: 900,
                    fontSize: 10,
                    marginVertical: 4,
                  }}>
                  {msg?.firstName} {msg?.lastName}{' '}
                </Text>
                <Text
                  style={{
                    color: '#FFAA00',
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                    fontSize: 13,
                    marginVertical: 2,
                  }}>
                  {msg?.message}
                </Text>
                <Text
                  style={{
                    color: '#FFAA00',
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                    fontSize: 9,
                    marginBottom: 6,
                  }}>
                  {getTimeDifference(msg?.timestamp)}
                </Text>
              </View>
            ))}
            {messages?.map((msg, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: '#FFAA0025',
                  marginVertical: 6,
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  borderRadius: 12,
                  maxWidth: '80%',
                  alignSelf: 'flex-start',
                }}>
                <Text
                  style={{
                    color: '#FFAA00',
                    fontFamily: 'Plus Jakarta Sans Bold',
                    fontWeight: 900,
                    fontSize: 10,
                    marginVertical: 4,
                  }}>
                  {msg?.firstName} {msg?.lastName}{' '}
                </Text>
                <Text
                  style={{
                    color: '#FFAA00',
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                    fontSize: 13,
                    marginVertical: 2,
                  }}>
                  {msg?.message}
                </Text>
                <Text
                  style={{
                    color: '#FFAA00',
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                    fontSize: 9,
                    marginBottom: 6,
                  }}>
                  {/* {getTimeDifference(msg?.timestamp)} */}
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
              marginTop: -140,
              padding: 16,

              backgroundColor: Colors.newBG,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('CreateAccount' as never)}
              style={{
                backgroundColor: '#ffaa00',
                padding: 16,
                borderRadius: 12,
              }}>
              <Text
                style={{
                  color: Colors.newBG,
                  fontSize: 14,
                  textAlign: 'center',
                  fontFamily: 'Plus Jakarta Sans Bold',
                  fontWeight: 900,
                }}>
                Create an account to join this converstaion
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen' as never)}
              style={{
                backgroundColor: Colors.newBG,
                padding: 16,
                borderRadius: 12,
                marginTop: 16,
                borderWidth: 1,
                borderColor: '#ffaa00',
              }}>
              <Text
                style={{
                  color: '#ffaa00',
                  fontSize: 14,
                  textAlign: 'center',
                  fontFamily: 'Plus Jakarta Sans Bold',
                  fontWeight: 900,
                }}>
                Already have an account? Login
              </Text>
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

export default NoCommunityChat;
