import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  Image,
  ActivityIndicator,
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
import {resetPassword} from '../../Redux/Auth/Auth';

// Validation schema using Yup
const validationSchema = yup.object().shape({
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

const CreatePasswordScreen = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const route = useRoute();
  const {email} = route.params;

  const dispatch = useDispatch<AppDispatch>();
  const [formErrors, setFormErrors] = useState<string>('');
  const [showLoading, setLoading] = useState(false);
  console.log(email);
  const handleResetPassword = values => {
    setLoading(true);
    console.log(values.password); // Log the new password
    dispatch(resetPassword({email: email, password: values.password}))
      .then(response => {
        setLoading(false);
        console.log('Registration lol', response?.payload);
        if (response.payload.message === 'Password reset successful') {
          setShowModal(true);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log('Registration failed', error);
        setFormErrors('Network Error');
      })
      .finally(() => {
        //setResend('');
        //setSubmitting(false);
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
            Reset Password
          </Text>
          <Text
            style={{
              fontFamily: 'Plus Jakarta Sans Regular',
              fontSize: 12,
              marginVertical: 4,
              marginBottom: 32,
              color: '#fff',
            }}>
            Please enter your new password and confirm it.
          </Text>
          <Formik
            initialValues={{
              password: '',
              confirmPassword: '',
            }}
            onSubmit={handleResetPassword}
            validationSchema={validationSchema}>
            {({handleChange, handleSubmit, values, errors}) => (
              <>
                <NewCustomTextInput
                  label="New Password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  error={errors.password}
                  placeholder="Enter New Password"
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
                      Reset Password
                    </Text>
                  )}
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text
                    style={{
                      fontFamily: 'Plus Jakarta Sans Regular',
                      fontSize: 14,
                      color: Colors.newBG,
                    }}>
                    Reset Password
                  </Text>
                </TouchableOpacity> */}
              </>
            )}
          </Formik>

          {/* Modal to show success message */}
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
                <Text style={styles.modalTitle}>Password Reset Successful</Text>

                <Text style={styles.modalText}>
                  Your password has been successfully reset.
                </Text>
                <TouchableOpacity
                  style={[styles.modalButton, {width: '100%'}]}
                  onPress={() => navigation.navigate('LoginScreen')}>
                  <Text style={styles.modalButtonText}>Back to Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </BodyView>
      </View>
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
});

export default CreatePasswordScreen;
