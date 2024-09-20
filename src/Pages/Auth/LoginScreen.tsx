import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
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

const LoginScreen = () => {
  
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
              console.log('Regsssistration failed', error);
            })
            .finally(() => {});
        })
        .catch(error => {
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
            console.log('Regsssistration failed', error);
          })
          .finally(() => {});
      })
      .catch(error => {
        console.error('Error retrieving email and password:', error);
      });
  }, []);

  const handleLogin = (
    values: FormData,
    {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void},
  ) => {
    setLoading(true); // Set loading state to true when login begins
    setFormErrors('');
    dispatch(login(values))
      .then(response => {
        console.log('Registration successful', response?.status);
        switch (response?.payload?.status || response?.payload?.token) {
          case response?.payload?.token:
            RNSecureStorage.multiSet(
              {
                email: values?.email,
                password: values?.password,
              },
              {accessible: ACCESSIBLE.WHEN_UNLOCKED},
            )
              .then(() => {
                console.log('User credentials securely stored.');
              })
              .catch(error => {
                console.error('Error storing user credentials:', error);
              });
            RNSecureStorage.getItem('email')
              .then(email => {
                console.log('Stored email:', email);
              })
              .catch(error => {
                console.error('Error retrieving email:', error);
              });

            RNSecureStorage.getItem('password')
              .then(password => {
                console.log('Stored password:', password);
              })
              .catch(error => {
                console.error('Error retrieving password:', error);
              });
            //  navigation?.navigate('Main' as never);
            break;
          case 422:
            setFormErrors('Please fill your email and password correctly');
            break;
          case 400:
            setFormErrors('Your email or password is incorrect');
            break;
          default:
            setFormErrors('Network Error.');
            break;
        }
      })
      .catch(error => {
        console.log('Registration failed', error);
        setFormErrors('Network Error');
      })
      .finally(() => {
        setLoading(false); // Set loading state to false after login ends
        setSubmitting(false);
      });
  };

  return (
    <SafeArea>
      <View style={{backgroundColor: 'white', height: '100%'}}>
        <MainHeader />
        <BodyView>
          <Text
            style={{
              fontFamily: 'Plus Jakarta Sans Bold',
              fontWeight: 900,
              fontSize: 18,
              color: '#fff',
              marginTop: 48,
            }}>
            Login
          </Text>
          <Text
            style={{
              fontFamily: 'Plus Jakarta Sans Regular',
              fontSize: 12,
              marginVertical: 4,
              marginBottom: 32,
              color: '#fff',
            }}>
            Please enter your email and password to login.
          </Text>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={handleLogin}
            validationSchema={validationSchema}>
            {({handleChange, handleSubmit, values, errors, isSubmitting}) => (
              <>
                <NewCustomTextInput
                  label="Email Address"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  error={errors.email}
                  placeholder="Enter Email Address"
                />
                <NewCustomTextInput
                  label="Password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  error={errors.password}
                  placeholder="Enter Password"
                  secureTextEntry
                />
                <TouchableOpacity
                  style={{
                    flexDirection: 'row-reverse',
                    gap: 4,
                    marginTop: -16,
                    width: '100%',
                    justifyContent: 'space-between',
                  }}
                  onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                  <Text
                    style={{
                      fontFamily: 'Plus Jakarta Sans SemiBold',
                      fontSize: 12,
                      marginVertical: 4,
                      marginBottom: 32,
                      color: Colors.primary,
                      lineHeight: 18,
                    }}>
                    Forgot Password?
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Plus Jakarta Sans Regular',
                      fontSize: 12,
                      marginVertical: 4,
                      marginBottom: 32,
                      color: '#fff',
                      lineHeight: 18,
                    }}></Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, loading && {backgroundColor: '#ccc'}]}
                  onPress={handleSubmit} // handleSubmit is already provided by Formik
                  disabled={loading || isSubmitting}>
                  {loading ? (
                    <ActivityIndicator color={Colors.newBG} /> // Show activity indicator while loading
                  ) : (
                    <Text
                      style={{
                        fontFamily: 'Plus Jakarta Sans Regular',
                        fontSize: 14,
                        color: Colors.newBG,
                      }}>
                      Login
                    </Text>
                  )}
                </TouchableOpacity>

                {formErrors ? (
                  <View
                    style={{
                      backgroundColor: '#Ff000045',
                      marginVertical: 24,
                      padding: 16,
                    }}>
                    <Text style={styles.errorText}>{formErrors}</Text>
                  </View>
                ) : null}
              </>
            )}
          </Formik>
          <TouchableOpacity
            style={{
              width: '100%',
              justifyContent: 'center',
              marginTop: 36,
              flexDirection: 'row',
              gap: 4,
            }}
            onPress={() => navigation.navigate('CreateAccount')}>
            <Text
              style={{
                fontFamily: 'Plus Jakarta Sans Regular',
                fontSize: 13,
                marginVertical: 4,
                marginBottom: 32,
                color: '#fff',
              }}>
              Don't Have an Account?
            </Text>
            <Text
              style={{
                fontFamily: 'Plus Jakarta Sans SemiBold',
                fontSize: 13,
                marginVertical: 4,
                marginBottom: 32,
                color: '#ffaa00',
              }}>
              {' '}
              Create an Account
            </Text>
          </TouchableOpacity>
        </BodyView>
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

export default LoginScreen;
