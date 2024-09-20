import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  useWindowDimensions,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import NewCustomTextInput from '../../Component/CustomInputs/NewCustomTextInput';
import SafeArea from '../../Component/SafeAreaViewCustom/SafeArea';
import MainHeader from '../../Component/Header/MainHeaders';
import BodyView from '../../Component/SafeAreaViewCustom/BodyView';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Colors} from '../../Component/Colors/Colors';
import {AppDispatch} from '../../Redux/Store/Store';
import {useDispatch} from 'react-redux';
import {login} from '../../Redux/Auth/Auth';
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';

// Validation schema using Yup
const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const SplashScreen = () => {
  const [formErrors, setFormErrors] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); // Introduce loading state
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState<String>();
  const [password, setPassword] = useState<String>();

  useFocusEffect(
    React.useCallback(() => {
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
              console.log('Registration successssssful', response);
              switch (response?.payload?.status || response?.payload?.token) {
                case response?.payload?.token:
                  //storeCredentials(email, password);
                  break;
              }
            })
            .catch(error => {
              navigation.navigate('LoginScreen' as never);

              console.log('Regsssistration failed', error);
            })
            .finally(() => {});
        })
        .catch(error => {
          navigation.navigate('LoginScreen' as never);

          console.error('Error retrieving email and password:', error);
        });
    }, [dispatch]),
  );

  useEffect(() => {
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
            console.log('Registration successssssful', response);
            switch (response?.payload?.status || response?.payload?.token) {
              case response?.payload?.token:
                //storeCredentials(email, password);
                break;
            }
          })
          .catch(error => {
            navigation.navigate('LoginScreen' as never);
            console.log('Regsssistration failed', error);
          })
          .finally(() => {});
      })
      .catch(error => {
        navigation.navigate('LoginScreen' as never);

        console.error('Error retrieving email and password:', error);
      });
  }, []);

  const {height} = useWindowDimensions();
  return (
    <SafeArea>
      <View style={{backgroundColor: Colors?.newBG, height: height}}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: height,
            marginTop: -24,
          }}>
          <Image
            source={require('../../../assets/images/logo.jpg')} // Use selected image URI
            style={{
              width: 86,
              height: 86,
              alignSelf: 'center',
              borderRadius: 333,
              justifyContent: 'center',
            }} // Set appropriate styling
          />
        </View>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    marginBottom: -12,
  },
  errorText: {
    color: 'red',
    fontFamily: 'Plus Jakarta Sans Regular',
  },
});

export default SplashScreen;
