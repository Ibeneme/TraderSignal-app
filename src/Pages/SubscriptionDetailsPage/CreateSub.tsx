import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
  Image,
} from 'react-native';
import {Formik} from 'formik';

import * as Yup from 'yup';
import NewCustomTextInput from '../../Component/CustomInputs/NewCustomTextInput';
import SafeArea from '../../Component/SafeAreaViewCustom/SafeArea';
import ProfileHeaders from '../../Component/Header/ProfileHeaders';
import BodyView from '../../Component/SafeAreaViewCustom/BodyView';
import Channels from '../../Component/icons/Channels';
import {Colors} from '../../Component/Colors/Colors';
import {getCurrentUser} from '../../Redux/Profile/Profile';
import {AppDispatch} from '../../Redux/Store/Store';
import {useDispatch} from 'react-redux';
import {createSub} from '../../Redux/Subscriptions/Sub';
import {useNavigation} from '@react-navigation/native';

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, 'Title must be at least 5 characters')
    .required('Title is required'),
  durationInDays: Yup.number()
    .min(1, 'Duration must be at least 1 day')
    .required('Duration is required'),
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .required('Description is required'),
  price: Yup.number()
    .typeError('Price must be a number')
    .required('Price is required'),
});

const CreateSub = () => {
  const initialValues = {
    title: '',
    durationInDays: '',
    description: '',
    price: '',
  };

  const [creator, setUserID] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const navigation = useNavigation();
  useEffect(() => {
    //setPageIsLoading(true);

    dispatch(getCurrentUser())
      .then(response => {
        // console.log('User sub retrieved:', response);
        console.log('User sub retrieved:', response?.payload?.user?._id);
        setUserID(response?.payload?.user?._id);
      })
      .catch(error => {
        console.error('Error retrieving user sub:', error);
      });
  }, [dispatch]);
  const [loading, setLoading] = useState(false); // State to control loading indicator
  const [formErrors, setFormErrors] = useState<string>('');

  const handleSubmit = (values: any, {setSubmitting}: any, creator: any) => {
    console.log(creator, 'creta');
    console.log('Form values:', {...values, creator});

    const data = {...values, creator};
    console.log(data, 'data');
    setLoading(true); // Set loading state to true
    dispatch(createSub(data))
      .then(response => {
        setLoading(false); // Set loading state to false after login ends
        setSubmitting(false);
        console.log('Registration successful', response);
        if (
          response?.payload?.message === 'Subscription created successfully'
        ) {
          setShowModal(true);
        } else {
          Alert.alert('An Error Occured', 'Cannot Create Subscriptions');
        }
        // switch (response?.payload?.status || response?.payload?.token) {
        //   //case response?.payload?.token:
        //   case 200:
        //     //Alert.alert('Created');
        //     setShowModal(true);
        //     break;
        //   case 422:
        //     setFormErrors('Please fill your email and password correctly');
        //     break;
        //   case 400:
        //     setFormErrors('Your email or password is incorrect');
        //     break;
        //   default:
        //     setFormErrors('Network Error.');
        //     break;
        // }
      })
      .catch(error => {
        console.log('Registration failed', error);
        setFormErrors('Network Error');
        setLoading(false); // Set loading state to false after login ends
        setSubmitting(false);
      })
      .finally(() => {
        setLoading(false); // Set loading state to false after login ends
        setSubmitting(false);
      });
  };

  return (
    <SafeArea>
      <ProfileHeaders />
      <BodyView color="#f4f4f4">
        <View style={styles.container}>
          <View
            style={{
              marginTop: 24,
              alignSelf: 'flex-start',
              backgroundColor: '#ffaa0012',
              padding: 16,
              borderRadius: 36,
              marginBottom: 16,
            }}>
            <Channels color="#ffaa00" width={32} height={32} />
          </View>
          <Text
            style={{
              fontFamily: 'Plus Jakarta Sans Bold',
              fontWeight: 900,
              fontSize: 18,
              color: '#fff',

              alignSelf: 'flex-start',
            }}>
            Create a Subcription Channel
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
            Create subscriptions channels here
          </Text>

          <Formik
            initialValues={initialValues}
            onSubmit={(values, {setSubmitting}) => {
              console.log('Submitting form with values:', values);
              handleSubmit(values, {setSubmitting}, creator);
            }}
            validationSchema={validationSchema}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View>
                <NewCustomTextInput
                  label="Title"
                  value={values.title}
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  error={touched.title && errors.title}
                  placeholder="Enter Title"
                />
                <NewCustomTextInput
                  label="Duration (in days)"
                  value={values.durationInDays}
                  onChangeText={handleChange('durationInDays')}
                  onBlur={handleBlur('durationInDays')}
                  error={touched.durationInDays && errors.durationInDays}
                  keyboardType="numeric"
                  placeholder="Enter Duration"
                />
                <NewCustomTextInput
                  label="Description"
                  value={values.description}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  error={touched.description && errors.description}
                  placeholder="Enter Description"
                  //minHeight={200}
                  multiline={true}
                />
                <NewCustomTextInput
                  label="Price in USDT"
                  value={values.price}
                  onChangeText={handleChange('price')}
                  onBlur={handleBlur('price')}
                  error={touched.price && errors.price}
                  keyboardType="numeric"
                  placeholder="Enter Price"
                />

                <TouchableOpacity
                  style={[styles.button, loading && {backgroundColor: '#ccc'}]}
                  onPress={() => handleSubmit()} 
                  disabled={loading}>
                  {loading ? (
                    <ActivityIndicator color={Colors.newBG} />
                  ) : (
                    <Text style={styles.buttonText}>Create Subscription</Text>
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

                <View style={{marginBottom: 120}}></View>
              </View>
            )}
          </Formik>
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
              <Text style={styles.modalTitle}>Success</Text>

              <Text style={styles.modalText}>
                Your Subscription Channel has been successfully created.
              </Text>
              <TouchableOpacity
                style={[styles.modalButton, {width: '100%'}]}
                onPress={() => {
                  setShowModal(false);
                  navigation.navigate('MySubs' as never);
                }}>
                <Text style={styles.modalButtonText}>Proceed to Channels</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </BodyView>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
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
    textAlign: 'center',
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
    fontFamily: 'Plus Jakarta Sans SemiBold',
    fontSize: 14,
  },
});

export default CreateSub;
