import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Image,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import NewCustomTextInput from '../../Component/CustomInputs/NewCustomTextInput';
import SafeArea from '../../Component/SafeAreaViewCustom/SafeArea';
import MainHeader from '../../Component/Header/MainHeaders';
import BodyView from '../../Component/SafeAreaViewCustom/BodyView';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Colors} from '../../Component/Colors/Colors';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../Redux/Store/Store';
import {
  forgotPassword,
  generateOTP,
  otpVerification,
  register,
} from '../../Redux/Auth/Auth';

const validationSchema = yup.object().shape({
  otp: yup.string().required('OTP is required'),
});

const ResstOTPScreen = ({}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const {email} = route.params;
  //console.log(values, 'values');

  const [countdown, setCountdown] = useState(300);
  const [resendVisible, setResendVisible] = useState(false);

  useEffect(() => {
    GenerateOTP();
    const timer = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown === 0) {
          clearInterval(timer);
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const dispatch = useDispatch<AppDispatch>();
  const [formErrors, setFormErrors] = useState<string>('');
  const [showLoading, setLoading] = useState(false);
  const [resendOTPs, setResend] = useState<string>('');

  const GenerateOTP = () => {
    setResend('');
    setFormErrors('');
    dispatch(forgotPassword(email))
      .then(response => {
        console.log('Registration lol', response?.payload);
        if (response?.payload?.otp || response?.payload?.email) {
          setResend(`OTP Sent Successfullly to the email address ${email}`);
        } else {
        }
      })
      .catch(error => {
        setResend('');
        console.log('Registration failed', error);
        setFormErrors('Network Error');
      })
      .finally(() => {
        //setResend('');
        //setSubmitting(false);
      });
  };

  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const handleVerifyOTP = ({otp}) => {
    setFormErrors('');
    console.log('Entered OTP:', otp);
    setLoading(true);
    dispatch(otpVerification({email: email, code: otp}))
      .then(response => {
        console.log('Registration lol', response);
        if (response?.payload?.msg === 'Verification Successful') {
          navigation.navigate('CreatePasswordScreen', {email});
        } else {
          setLoading(false);
          setFormErrors('Invalid OTP');
        }
      })
      .catch(error => {
        setLoading(false);
        console.log('Registration failed', error);
        setFormErrors('Network Error');
      })
      .finally(() => {
        setLoading(false);
        //setSubmitting(false);
      });
  };

  const formatTime = () => {
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const handleResendOTP = () => {
    setResend('');
    setFormErrors('');
    dispatch(forgotPassword(email))
      .then(response => {
        setResend(`OTP Sent Successfullly to the email address ${email}`);
        console.log('Registration lol', response?.payload);
        if (response?.payload?.otp || response?.payload?.email) {
        } else {
        }
      })
      .catch(error => {
        setResend('');
        console.log('Registration failed', error);
        setFormErrors('Network Error');
      })
      .finally(() => {
        //setResend('');
        //setSubmitting(false);
      });

    // setCountdown(300);
    // setResendVisible(false);
    // const timer = setInterval(() => {
    //   setCountdown(prevCountdown => {
    //     if (prevCountdown === 0) {
    //       clearInterval(timer);
    //       setResendVisible(true);
    //     }
    //     return prevCountdown - 1;
    //   });
    // }, 1000);
  };

  return (
    <SafeArea>
      <View style={{backgroundColor: 'white', height: '100%'}}>
        <MainHeader />
        <BodyView>
          <View style={{marginTop: 42}}>
            <Text style={styles.title}>Verify OTP</Text>
            <Text
              style={{
                fontFamily: 'Plus Jakarta Sans Regular',
                fontSize: 12,
                marginVertical: 4,
                marginBottom: 32,
                color: '#fff',
                lineHeight: 18,
              }}>
              Top Reset your password, Please Check your mail and Verify your
              OTP
            </Text>

            {resendOTPs ===
            `OTP Sent Successfullly to the email address ${email}` ? (
              <Text
                style={{
                  fontFamily: 'Plus Jakarta Sans Regular',
                  fontSize: 12,
                  marginVertical: 4,
                  marginBottom: 32,
                  color: '#fff',
                  lineHeight: 18,
                  backgroundColor: '#0fa31c',
                  padding: 12,
                  borderRadius: 4,
                }}>
                {resendOTPs}
              </Text>
            ) : null}
            <Formik
              initialValues={{
                otp: '',
              }}
              onSubmit={handleVerifyOTP}
              validationSchema={validationSchema}>
              {({handleChange, handleBlur, handleSubmit, values, errors}) => (
                <>
                  <NewCustomTextInput
                    label="OTP"
                    value={values.otp}
                    onChangeText={handleChange('otp')}
                    onBlur={handleBlur('otp')}
                    error={errors.otp}
                    placeholder="Enter OTP"
                    keyboardType="numeric"
                    maxLength={6}
                  />

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleSubmit()}>
                    {showLoading ? (
                      <ActivityIndicator color={'#fff'} size={16} />
                    ) : (
                      <Text
                        style={{
                          fontFamily: 'Plus Jakarta Sans Regular',
                          fontSize: 14,

                          color: Colors.newBG,
                        }}>
                        Verify OTP
                      </Text>
                    )}
                  </TouchableOpacity>
                </>
              )}
            </Formik>

            <TouchableOpacity
              style={{
                flexDirection: 'row-reverse',
                gap: 4,
                marginTop: -48,
                width: '100%',
                justifyContent: 'space-between',
              }}
              onPress={handleResendOTP}>
              <Text
                style={{
                  fontFamily: 'Plus Jakarta Sans SemiBold',
                  fontSize: 12,
                  marginVertical: 4,
                  marginBottom: 32,
                  color: Colors.primary,
                  lineHeight: 18,
                }}>
                Resend OTP
              </Text>
            </TouchableOpacity>
          </View>

          {formErrors ? (
            <View
              style={{
                backgroundColor: '#Ff0000',
                marginVertical: 24,
                padding: 16,
              }}>
              <Text style={styles.errorText}>{formErrors}</Text>
            </View>
          ) : null}
        </BodyView>
      </View>

      <Modal
        visible={showModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={require('../../../assets/images/green.png')}
              style={styles.image}
            />
            <Text style={styles.modalTitle}>Account Creation Successful</Text>

            <Text style={styles.modalText}>
              Your account has been successfully created.
            </Text>
            <TouchableOpacity
              style={[styles.modalButton, {width: '100%'}]}
              onPress={() => navigation.navigate('LoginScreen' as never)}>
              <Text style={styles.modalButtonText}>Proceed to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 64,
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
    borderColor: '#62D944',
    borderWidth: 2,
    width: '100%',
  },
  modalTitle: {
    fontFamily: 'Plus Jakarta Sans Bold',
    fontWeight: 900,
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
    backgroundColor: '#62D944',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 5,
    marginTop: 36,
  },
  modalButtonText: {
    fontFamily: 'Plus Jakarta Sans SemiBold',
    fontSize: 14,
    color: Colors.newBG,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  errorText: {
    color: 'white',
    fontFamily: 'Plus Jakarta Sans Regular',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Plus Jakarta Sans Bold',
    fontWeight: 900,
    marginBottom: 6,
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },

  // button: {
  //   backgroundColor: Colors.primary,
  //   paddingHorizontal: 20,
  //   paddingVertical: 16,
  //   borderRadius: 5,
  //   marginTop: 20,
  //   alignItems: 'center',
  //   marginBottom: 64,
  // },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ResstOTPScreen;
