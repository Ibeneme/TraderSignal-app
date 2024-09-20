import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  ActivityIndicator,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import NewCustomTextInput from '../../Component/CustomInputs/NewCustomTextInput';
import BoldText from '../../Component/Texts/BoldText';
import {Colors} from '../../Component/Colors/Colors';
import MainHeader from '../../Component/Header/MainHeaders';
import BodyView from '../../Component/SafeAreaViewCustom/BodyView';
import SafeArea from '../../Component/SafeAreaViewCustom/SafeArea';
import {useNavigation} from '@react-navigation/native';
import CustomDropdown from '../../Component/CustomInputs/CustomDropdown';
import {CountryPicker} from 'react-native-country-codes-picker';

// Validation schema using Yup
const validationSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  // phoneNumber: yup.string().required('Phone Number is required'),
  // countryCode: yup.string().required('Country Code is required'),
  email: yup
    .string()
    .required('Email is required')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email format',
    ),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
    ),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

const SignUpForm = () => {
  const navigation = useNavigation();
  const [showLoading, setLoading] = useState(false);
  const [countryCodeErr, setCountryCodeErr] = useState('');
  const handleSignUp = values => {
    console.log('Yeah');
    setLoading(true);
    // if (countryCode) {
    setCountryCodeErr(' ');
    setTimeout(() => {
      navigation.navigate('OTPScreen', {values});
      setLoading(false);
    }, 6000); // Delay for 1 minute (60000 milliseconds)
    // } else {
    //   setLoading(false);
    //   setCountryCodeErr('Select a country code to proceed');
    // }
  };

  const [countryCode, setCountryCode] = useState('');
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [countryCodeValues, setCountryCodeValues] = useState('');
  const [showOptions, setOptions] = useState(true);
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
            Create an account
          </Text>
          <Text
            style={{
              fontFamily: 'Plus Jakarta Sans Regular',
              fontSize: 13,
              marginVertical: 4,
              marginBottom: 32,
              color: '#fff',
            }}>
            Ensure you provide accurate information for your account creation.
          </Text>

          <ScrollView contentContainerStyle={{width: '100%', height: '100%'}}>
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                // phoneNumber: '',
                email: '',
                password: '',
                confirmPassword: '',
                selectedOption: ' ',
              }}
              onSubmit={handleSignUp}
              validationSchema={validationSchema}>
              {({
                handleChange,
                handleSubmit,
                values,
                setFieldError,
                errors,
              }) => (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}>
                    <View
                      style={{
                        width: '48.5%',
                      }}>
                      <NewCustomTextInput
                        label="First Name"
                        value={values.firstName}
                        onChangeText={handleChange('firstName')}
                        error={errors.firstName}
                        placeholder="Enter First Name"
                      />
                    </View>

                    <View
                      style={{
                        width: '48.5%',
                      }}>
                      <NewCustomTextInput
                        label="Last Name"
                        value={values.lastName}
                        onChangeText={handleChange('lastName')}
                        error={errors.lastName}
                        placeholder="Enter Last Name"
                      />
                    </View>
                  </View>

                  {/* CountryPicker component */}
                  {/* <CountryPicker
                    show={showCountryPicker}
                    pickerButtonOnPress={item => {
                      setCountryCodeValues(item);
                      console.log(item);
                      setCountryCode(item.dial_code);
                      setShowCountryPicker(false); // Close the picker after selection
                    }}
                    lang="en"
                    style={{
                      // Styles for whole modal [View]
                      modal: {
                        height: '70%',
                        backgroundColor: Colors.primary,
                      },
                      // Styles for modal backdrop [View]
                      backdrop: {},
                      // Styles for bottom input line [View]
                      line: {},
                      // Styles for list of countries [FlatList]
                      itemsList: {},
                      // Styles for input [TextInput]
                      textInput: {
                        height: 48,
                        borderRadius: 8,
                        padding: 12,
                      },
                      // Styles for country button [TouchableOpacity]
                      countryButtonStyles: {
                        height: 50,
                        backgroundColor: Colors.newBG,
                      },
                      // Styles for search message [Text]
                      searchMessageText: {},
                      // Styles for search message container [View]
                      countryMessageContainer: {},
                      // Flag styles [Text]
                      flag: {
                        // backgroundColor: '#Ffffff12',
                        // width: 12,
                        // flexDirection: 'row',
                        // justifyContent: 'center',
                        // alignItems: 'center',
                        // alignSelf: 'center',
                      },
                      // Dial code styles [Text]
                      dialCode: {
                        color: '#fff',
                        fontFamily: 'Plus Jakarta Sans Bold',
                                       fontWeight: 900,
                      },
                      // Country name styles [Text]
                      countryName: {
                        color: '#fff',
                        fontFamily: 'Plus Jakarta Sans Regular',
                        fontSize: 14,
                      },
                    }}
                  /> */}

                  {/* <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      width: '100%',
                      marginTop: 20,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Plus Jakarta Sans SemiBold',
                        color: 'white',
                      }}>
                      Select Country{' '}
                    </Text>

                    <TouchableOpacity
                      style={{
                        marginTop: 10,
                        width: '100%',
                        backgroundColor: '#ffffff12',
                        paddingHorizontal: 12,
                        paddingVertical: 16,
                        borderRadius: 8,

                        marginBottom: 24,
                      }}
                      onPress={() => setShowCountryPicker(true)}>
                      <Text
                        style={{
                          fontFamily: 'Plus Jakarta Sans SemiBold',
                          color: 'white',
                        }}>
                        {`${
                          countryCode
                            ? `${countryCodeValues?.flag} ${countryCode} - ${countryCodeValues?.name?.en}`
                            : 'Select a Country'
                        }`}
                      </Text>
                    </TouchableOpacity>

                    <View
                      style={{
                        width: '100%',
                      }}>
                      <NewCustomTextInput
                        label="Phone Number"
                        value={values.phoneNumber}
                        //onChangeText={handleChange('phoneNumber')}
                        onChangeText={text => {
                          const formattedPhoneNumber = `${text}`;
                          handleChange('phoneNumber')(formattedPhoneNumber);
                        }}
                        error={errors.phoneNumber}
                        placeholder="Enter Phone Number"
                        keyboardType="phone-pad"
                      />
                    </View>
                  </View> */}
                  <NewCustomTextInput
                    label="Email"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    error={errors.email}
                    placeholder="Enter Email Address"
                    //keyboardType="phone-pad"
                  />
                  {/* <NewCustomTextInput
                    label="Username"
                    value={values.username}
                    onChangeText={handleChange('username')}
                    error={errors.username}
                    placeholder="Enter Username"
                  /> */}
                  <CustomDropdown
                    label="Select Option"
                    options={['Access trading signals', 'Be a signal provider']}
                    onSelect={(option: string) => {
                      setOptions(false);
                      handleChange('selectedOption')(option);
                      // Check if an option is selected, if not, set an error message
                      if (!option.trim()) {
                        setFieldError(
                          'selectedOption',
                          'Please select an option',
                        );
                      } else {
                        setFieldError('selectedOption', ''); // Clear the error if an option is selected
                      }
                    }}
                    error={errors.selectedOption} // Pass the error message from Formik
                  />
                  <NewCustomTextInput
                    label="Password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    error={errors.password}
                    placeholder="Enter Password"
                    secureTextEntry
                  />
                  <NewCustomTextInput
                    label="Confirm Password"
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    error={errors.confirmPassword}
                    placeholder="Confirm Password"
                    secureTextEntry
                  />
                  <TouchableOpacity
                    style={[styles.button, showLoading && {opacity: 0.5}]} // Reduce opacity when loading
                    onPress={() => {
                      // Check if an option is selected
                      if (
                        !values.selectedOption ||
                        values.selectedOption.trim() === ''
                      ) {
                        // If not selected, set an error message
                        setFieldError(
                          'selectedOption',
                          'Please select an option',
                        );
                      } else {
                        // If selected, proceed with navigation
                        handleSubmit();
                      }
                    }}
                    disabled={showLoading}>
                    {showLoading ? (
                      <ActivityIndicator color={'#fff'} size={16} />
                    ) : (
                      <Text
                        style={{
                          fontFamily: 'Plus Jakarta Sans Regular',
                          fontSize: 14,
                          color: Colors.newBG,
                        }}>
                        Create Account
                      </Text>
                    )}
                  </TouchableOpacity>

                  {/* {countryCodeErr ? (
                    <View
                      style={{
                        backgroundColor: '#Ff000045',
                        marginVertical: 24,
                        padding: 16,
                      }}>
                      <Text style={styles.errorText}>{countryCodeErr}</Text>
                    </View>
                  ) : null} */}
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
                marginBottom: 120,
              }}
              onPress={() => navigation.navigate('LoginScreen')}>
              <Text
                style={{
                  fontFamily: 'Plus Jakarta Sans Regular',
                  fontSize: 13,
                  marginVertical: 4,
                  marginBottom: 32,
                  color: '#fff',
                }}>
                Already Have an Account?
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
                Login
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </BodyView>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.newBG,
    padding: 12,
  },
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
    //marginBottom: 64,
  },
  containerView: {
    width: '100%',
    padding: 16,
  },
});

export default SignUpForm;
