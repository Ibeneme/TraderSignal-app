import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Image,
} from 'react-native';
import SafeArea from '../../Component/SafeAreaViewCustom/SafeArea';
import {Formik} from 'formik';
import * as Yup from 'yup';
import NewCustomTextInput from '../../Component/CustomInputs/NewCustomTextInput';
import {Colors} from '../../Component/Colors/Colors';
import ProfileHeaders from '../../Component/Header/ProfileHeaders';
import BodyView from '../../Component/SafeAreaViewCustom/BodyView';
import LockIcon from '../../Component/icons/Lock';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../Redux/Store/Store';
import {updatePassword, updateUser} from '../../Redux/Profile/Profile';
import {useNavigation} from '@react-navigation/native';

const ChangePasswordScreen: React.FC = () => {
  const [formErrors, setFormErrors] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (values: {oldPassword: string; newPassword: string}) => {
    // Handle form submission here
    console.log('Form submitted with values:', values);
    setLoading(true);

    dispatch(updateUser({password: values.newPassword}))
      .then(response => {
        setLoading(false);
        console.log('Registration successful', response);
        switch (response?.payload?.status || response?.payload?.token) {
          case response?.payload?.token:
            break;
          case 422:
            setFormErrors('Please fill your email and password correctly');
            break;
          case 400:
            setFormErrors('Your current password is incorrect');
            setLoading(false);
            break;
          case 200:
            setShowModal(true);
            setLoading(false);
            break;
          default:
            setFormErrors('Network Error.');
            break;
        }
      })
      .catch(error => {
        console.log('Registration failed', error);
        setFormErrors('Network Error');
        setLoading(false);
      })
      .finally(() => {
        setLoading(false); // Set loading state to false after login ends
        // setSubmitting(false);
      });
  };

  // Define Yup validation schema
  const validationSchema = Yup.object().shape({
    // oldPassword: Yup.string().required('Current Password is required'),
    newPassword: Yup.string()
      .required('New Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
      ),
  });

  return (
    <SafeArea>
      <View style={styles.container}>
        <ProfileHeaders goBackTwice />
        <BodyView color="#f4f4f4">
          <Formik
            initialValues={{
              //oldPassword: '',
              newPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isSubmitting,
            }) => (
              <View style={styles.formContainer}>
                <View
                  style={{
                    marginTop: 24,
                    alignSelf: 'flex-start',
                    backgroundColor: '#ffaa0012',
                    padding: 16,
                    borderRadius: 36,
                    marginBottom: 16,
                  }}>
                  <LockIcon color="#ffaa00" width={32} height={32} />
                </View>

                <Text
                  style={{
                    fontFamily: 'Plus Jakarta Sans Bold',
                    fontWeight: 900,
                    fontSize: 18,
                    color: '#fff',
                    marginTop: 12,
                    alignSelf: 'flex-start',
                  }}>
                  Change your Password
                </Text>
                <Text
                  style={{
                    fontFamily: 'Plus Jakarta Sans Regular',
                    fontSize: 13,
                    marginVertical: 4,
                    marginBottom: 32,
                    color: '#fff',
                    alignSelf: 'flex-start',
                  }}>
                  Please Provide details of your Old and New Passwords
                </Text>

                <NewCustomTextInput
                  label="Current Password"
                  value={values.oldPassword}
                  onChangeText={handleChange('oldPassword')}
                  onBlur={handleBlur('oldPassword')}
                  error={errors.oldPassword}
                  secureTextEntry
                  placeholder="Enter Current Password"
                />
                <NewCustomTextInput
                  label="New Password"
                  value={values.newPassword}
                  onChangeText={handleChange('newPassword')}
                  onBlur={handleBlur('newPassword')}
                  error={errors.newPassword}
                  secureTextEntry
                  placeholder="Enter a New Password"
                />
                <TouchableOpacity
                  style={[styles.button, loading && {backgroundColor: '#ccc'}]}
                  onPress={handleSubmit}
                  disabled={loading}>
                  {loading ? (
                    <ActivityIndicator color={Colors.newBG} />
                  ) : (
                    <Text style={styles.buttonText}>Change Password</Text>
                  )}
                </TouchableOpacity>
                {formErrors ? (
                  <View
                    style={{
                      backgroundColor: '#Ff000045',
                      marginVertical: 24,
                      padding: 16,
                      width: '100%',
                    }}>
                    <Text style={styles.errorText}>{formErrors}</Text>
                  </View>
                ) : null}

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
                      <Text style={styles.modalTitle}>
                        Password Change Successful
                      </Text>

                      <Text style={styles.modalText}>
                        A new password has been set successfully
                      </Text>
                      <TouchableOpacity
                        style={[styles.modalButton, {width: '100%'}]}
                        onPress={() => navigation.navigate('LoginScreen')}>
                        <Text style={styles.modalButtonText}>Go Back</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </View>
            )}
          </Formik>
        </BodyView>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  image: {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    marginBottom: 20,
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
  errorText: {
    color: 'red',
    fontFamily: 'Plus Jakarta Sans Regular',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    borderRadius: 24,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    fontFamily: 'Plus Jakarta Sans SemiBold',
    fontSize: 14,
    color: Colors.newBG,
  },
});

export default ChangePasswordScreen;
