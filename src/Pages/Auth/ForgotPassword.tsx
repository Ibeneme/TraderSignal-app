import React, {useState} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../Component/Colors/Colors';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../Redux/Store/Store';
import {forgotPassword} from '../../Redux/Auth/Auth';

// Validation schema using Yup
const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
});

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch<AppDispatch>();
  const [formErrors, setFormErrors] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const handleForgotPassword = async values => {
    setLoading(true); // Set loading state to true
    console.log(values.email); // Log the email value

    try {
      const response = await dispatch(forgotPassword(values.email));
      console.log('Registration successful', response?.payload);
      switch (response?.payload) {
        case 200:
          navigation.navigate('ResetOTPScreen', {email: values.email}); // Pass email as params
          break;
        case 422:
          setFormErrors('Please fill your email and password correctly');
          break;
        case 400:
          setFormErrors('You do not have an account with this email');
          break;
        default:
          setFormErrors('Network Error.');
          break;
      }
    } catch (error) {
      console.log('Registration failed', error);
      setFormErrors('Network Error');
    } finally {
      setLoading(false); // Set loading state to false regardless of success or failure
    }
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
            Forgot Password
          </Text>
          <Text
            style={{
              fontFamily: 'Plus Jakarta Sans Regular',
              fontSize: 12,
              marginVertical: 4,
              marginBottom: 32,
              color: '#fff',
            }}>
            Please enter your email address to reset your password.
          </Text>
          <Formik
            initialValues={{
              email: '',
            }}
            onSubmit={handleForgotPassword}
            validationSchema={validationSchema}>
            {({handleChange, handleSubmit, values, errors}) => (
              <>
                <NewCustomTextInput
                  label="Email Address"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  error={errors.email}
                  placeholder="Enter Email Address"
                />
                <TouchableOpacity
                  style={[styles.button, loading && {backgroundColor: '#ccc'}]}
                  onPress={() => handleForgotPassword(values)}
                  disabled={loading}>
                  {loading ? (
                    <ActivityIndicator size="small" color={Colors.newBG} />
                  ) : (
                    <Text
                      style={{
                        fontFamily: 'Plus Jakarta Sans Regular',
                        fontSize: 14,
                        color: Colors.newBG,
                      }}>
                      Reset Password
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
        </BodyView>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontFamily: 'Plus Jakarta Sans Regular',
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
});

export default ForgotPasswordScreen;
