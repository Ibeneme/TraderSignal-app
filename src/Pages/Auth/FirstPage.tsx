import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Image,
} from 'react-native';
import SafeArea from '../../Component/SafeAreaViewCustom/SafeArea';
import BodyView from '../../Component/SafeAreaViewCustom/BodyView';
import {Colors} from '../../Component/Colors/Colors';
import HomeHeaders from '../../Component/Header/HomeHeaders';
//import VideoPlayer from 'react-native-video-player';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import RNSecureStorage from 'rn-secure-storage';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../Redux/Store/Store';
import {login} from '../../Redux/Auth/Auth';
import Loader from '../../Component/Component/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FirstPage: React.FC = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (title: string) => {
    setOpenAccordion(openAccordion === title ? null : title);
  };

  const renderAccordionItem = (title: string, videoUrl: string) => (
    <View key={title} style={styles.accordionItem}>
      <TouchableOpacity
        onPress={() => toggleAccordion(title)}
        style={[styles.videoContainer, {height: 200}]}>
        {/* <VideoPlayer
          video={{uri: videoUrl}}
          thumbnail={{uri: videoUrl}} // Provide the same video URL as thumbnail URL
          videoWidth={1600}
          videoHeight={900}
          resizeMode="contain"
          autoplay={false}
          defaultMuted={true}
          disableControls={true}
          loop={true}
        /> */}
      </TouchableOpacity>
    </View>
  );

  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(false); // Introduce loading state

  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const token = await AsyncStorage.getItem(
          'tradersignalsapp_access_token',
        );
        console.log(token, 'accessToken');
        setAccessToken(token);
      } catch (error) {
        console.error('Error retrieving access token:', error);
      }
    };

    getAccessToken(); // Call the function when the component mounts

    // Clean-up function (optional)
    return () => {
      // Add clean-up code if needed
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getAccessToken();
      setLoading(true);
      Promise.all([
        RNSecureStorage.getItem('email'),
        RNSecureStorage.getItem('password'),
      ])
        .then(([email, password]) => {
          console.log('Stored email:', email);
          console.log('Stored password:', password);
          console.log(email, password, 'pppp');
          const values = {
            email: email,
            password: password,
          };

          dispatch(login(values))
            .then(response => {
              setLoading(false);
              console.log('Registration successssssful', response);
              switch (response?.payload?.status || response?.payload?.token) {
                case response?.payload?.token:
                  //storeCredentials(email, password);
                  break;
              }
            })
            .catch(error => {
              setLoading(false);
              console.log('Regsssistration failed', error);
            })
            .finally(() => {
              setLoading(false);
            });
        })
        .catch(error => {
          setLoading(false);
          console.error('Error retrieving email and password:', error);
        });
    }, [dispatch]),
  );

  useEffect(() => {
    getAccessToken();
    setLoading(true);
    Promise.all([
      RNSecureStorage.getItem('email'),
      RNSecureStorage.getItem('password'),
    ])
      .then(([email, password]) => {
        console.log('Stored email:', email);
        console.log('Stored password:', password);
        console.log(email, password, 'pppp');
        const values = {
          email: email,
          password: password,
        };

        dispatch(login(values))
          .then(response => {
            setLoading(false);
            console.log('Registration successssssful', response);
            switch (response?.payload?.status || response?.payload?.token) {
              case response?.payload?.token:
                //storeCredentials(email, password);
                break;
            }
          })
          .catch(error => {
            setLoading(false);
            console.log('Regsssistration failed', error);
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch(error => {
        setLoading(false);
        console.error('Error retrieving email and password:', error);
      });
  }, []);

  const {height} = useWindowDimensions();

  const getAccessToken = async (): Promise<string | null> => {
    try {
      const accessToken = await AsyncStorage.getItem(
        'tradersignalsapp_access_token',
      );
      console.log(accessToken, 'accessToken');
      return accessToken;
    } catch (error) {
      console.log('Error retrieving access token:', error);
      return null;
    }
  };

  return (
    <SafeArea>
      <BodyView>
        {loading ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              height: height,
            }}>
            <Loader />
          </View>
        ) : (
          <ScrollView>
            <View
              style={{
                marginTop: 48,
                height: height / 2.2,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <View>
                <Image
                  source={require('../../../assets/images/logo.jpg')}
                  style={{
                    width: 120,
                    height: 120,
                    alignSelf: 'center',
                    borderRadius: 120,
                    marginTop: 120,
                    marginBottom: 48,
                  }}
                />

                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'Plus Jakarta Sans Bold',
                    fontWeight: 900,
                    fontSize: 22,
                    marginBottom: 16,
                    textAlign: 'center',
                  }}>
                  {' '}
                  Welcome to OTI Signals
                </Text>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'Plus Jakarta Sans Regular',
                    fontSize: 14,
                    marginBottom: 16,
                    textAlign: 'center',
                  }}>
                  {' '}
                  Let's Get you Started
                </Text>
              </View>
            </View>
            <View style={{marginTop: 120, marginBottom: 120}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('LoginScreen' as never)}
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
                  Login
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('CreateAccount' as never)}
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
                  Create an Account
                </Text>
              </TouchableOpacity>

              {/* <TouchableOpacity
                onPress={() => navigation.navigate('CreateAccount' as never)}
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
                  Sign Up to Subscriber
                </Text>
              </TouchableOpacity> */}

              {/* <TouchableOpacity
                onPress={() => navigation.navigate('Academy' as never)}
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
                  Learn more on how to trade
                </Text>
              </TouchableOpacity> */}

              {/* <TouchableOpacity
                onPress={() => navigation.navigate('NoCommunityChat' as never)}
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
                  Join Our Conversation
                </Text>
              </TouchableOpacity> */}
            </View>
          </ScrollView>
        )}
      </BodyView>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  accordionItem: {
    marginBottom: 4,
  },
  videoContainer: {
    marginBottom: 10,
    height: 500,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ffaa00',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Plus Jakarta Sans Bold',
    fontWeight: 900,
    fontSize: 16,
  },
});

export default FirstPage;
