import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
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
import {useDispatch} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  launchImageLibrary,
  ImagePickerResponse,
  MediaType,
} from 'react-native-image-picker';
import {createPost} from '../../Redux/Subscriptions/Sub';
import {AppDispatch} from '../../Redux/Store/Store';
const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, 'Trading Pair must be at least 5 characters')
    .required('Title is required'),
  content: Yup.string().required('Content is required'),
  tp1: Yup.number()
    .typeError('TP1 must be a number')
    .required('TP1 is required'),
  sl: Yup.number().typeError('SL must be a number').required('SL is required'),
  pair: Yup.string().required('Entry Price is required'),
});

const CreatePost = () => {
  const [selectedImage, setSelectedImage] = useState('');
  const route = useRoute();
  const {subID}: any = route.params;
  const initialValues = {
    title: '',
    content: '',
    tp1: '',
    tp2: '',
    tp3: '',
    tp4: '',
    tp5: '',
    sl: '',
    pair: '',
    // imageUri: selectedImage,
  };
  const [creator, setUserID] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();

  const handleUserImageClick = () => {
    // Open image picker
    const options = {
      mediaType: 'photo' as MediaType, // Change to 'video' if you want to select videos
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        if (response.assets && response.assets.length > 0) {
          // Set the selected image URI to state variable
          const selectedURI = response.assets[0].uri || ''; // Use empty string if URI is undefined
          setSelectedImage(selectedURI);
          console.log(selectedURI);
          //setShowModal(true);
          // console.log(selectedImage, 'selectedImage');
        } else {
          console.log('No assets selected');
        }
      }
    });
  };

  // Fetch current user ID
  useEffect(() => {
    dispatch(getCurrentUser())
      .then(response => {
        setUserID(response?.payload?.user?._id);
      })
      .catch(error => {
        console.error('Error retrieving user:', error);
      });
  }, [dispatch]);

  const [imageLoading, setImageLoading] = useState(false);
  const handleSubmit = (values: any, {setSubmitting}: any) => {
    console.log('Form valuesvalues:', values);
    setImageLoading(true);
    const images = selectedImage;
    console.log('Form valuesvalues:', {images, ...values});
    const subscriptionId = subID;
    const formData = new FormData();
    formData.append('tp1', values.tp1);
    formData.append('tp2', values.tp2);
    formData.append('tp3', values.tp3);
    formData.append('tp4', values.tp4);
    formData.append('tp5', values.tp5);
    formData.append('sl', values.sl);
    formData.append('pair', values.pair);
    formData.append('title', values.title);
    formData.append('content', values.content);
    formData.append('images', {
      uri: selectedImage,
      name: 'post.jpg',
      type: 'image/jpeg', // You can specify any file name here
      // type: 'image/jpeg', // Adjust the MIME type according to your image type
    });
    console.log(formData, 'formdataa');
    dispatch(createPost({formData, subscriptionId}))
      .then(response => {
        setImageLoading(false);
        console.log(response);
        if (response?.payload?.message === 'Post created successfully') {
          // navigation.navigate('GetSub', {
          //   id: subID,
          // } as never);
          setShowModal(true);
        }
        //   setUserID(response?.payload?.user?._id);
      })
      .catch(error => {
        setImageLoading(false);
        console.error('Error retrieving user:', error);
      });
    //setImageLoading(false);
    setSubmitting(false);
  };

  return (
    <SafeArea>
      <ProfileHeaders />
      <BodyView color="#f4f4f4">
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Channels color="#ffaa00" width={32} height={32} />
            <Text style={[styles.heading, {fontWeight: 900}]}>
              Create a Signal Post
            </Text>
            <Text style={styles.subHeading}>Create a Signal Post</Text>
          </View>

          <Formik
            initialValues={initialValues}
            onSubmit={(values, {setSubmitting}) => {
              handleSubmit(values, {setSubmitting});
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
                  label="Trading Pair"
                  value={values.title}
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  error={touched.title && errors.title}
                  placeholder="Enter Pair"
                />
                <NewCustomTextInput
                  label="Content"
                  value={values.content}
                  onChangeText={handleChange('content')}
                  onBlur={handleBlur('content')}
                  error={touched.content && errors.content}
                  placeholder="Enter Content"
                  multiline
                  numberOfLines={20}
                  height={120}
                />
                <NewCustomTextInput
                  label="Entry Price"
                  value={values.pair}
                  onChangeText={handleChange('pair')}
                  onBlur={handleBlur('pair')}
                  error={touched.pair && errors.pair}
                  placeholder="Enter Entry Price"
                />
                <NewCustomTextInput
                  label="SL"
                  value={values.sl}
                  onChangeText={handleChange('sl')}
                  onBlur={handleBlur('sl')}
                  error={touched.sl && errors.sl}
                  placeholder="Enter SL"
                  keyboardType="numeric"
                />

                <NewCustomTextInput
                  label="TP1"
                  value={values.tp1}
                  onChangeText={handleChange('tp1')}
                  onBlur={handleBlur('tp1')}
                  error={touched.tp1 && errors.tp1}
                  placeholder="Enter TP1"
                  keyboardType="numeric"
                />
                <NewCustomTextInput
                  label="TP2"
                  value={values.tp2}
                  onChangeText={handleChange('tp2')}
                  onBlur={handleBlur('tp2')}
                  placeholder="Enter TP2 (Optional)"
                  keyboardType="numeric"
                />
                <NewCustomTextInput
                  label="TP3"
                  value={values.tp3}
                  onChangeText={handleChange('tp3')}
                  onBlur={handleBlur('tp3')}
                  placeholder="Enter TP3 (Optional)"
                  keyboardType="numeric"
                />
                <NewCustomTextInput
                  label="TP4"
                  value={values.tp4}
                  onChangeText={handleChange('tp4')}
                  onBlur={handleBlur('tp4')}
                  placeholder="Enter TP4 (Optional)"
                  keyboardType="numeric"
                />
                <NewCustomTextInput
                  label="TP5"
                  value={values.tp5}
                  onChangeText={handleChange('tp5')}
                  onBlur={handleBlur('tp5')}
                  placeholder="Enter TP5 (Optional)"
                  keyboardType="numeric"
                />
                <TouchableOpacity
                  style={styles.buttons}
                  onPress={handleUserImageClick}>
                  <Text style={styles.buttonTexts}>Select an Image</Text>
                </TouchableOpacity>
                {selectedImage ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={{uri: selectedImage}}
                      style={styles.imagePreview}
                    />
                  </View>
                ) : null}

                <TouchableOpacity
                  style={[
                    styles.button,
                    imageLoading ? {backgroundColor: '#ccc'} : null, // Provide null when imageLoading is false
                  ]}
                  onPress={()=>handleSubmit}
                  disabled={imageLoading}>
                  {imageLoading ? (
                    <ActivityIndicator color={Colors.newBG} />
                  ) : (
                    <Text
                      style={{
                        fontFamily: 'Plus Jakarta Sans Regular',
                        fontSize: 14,
                        color: Colors.newBG,
                      }}>
                      Create Post
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>

        {/* Modal for success message */}
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
                Signal Post successfully created.
              </Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  navigation.navigate('GetSub', {
                    id: subID,
                  } as never);
                }}>
                <Text style={styles.modalButtonText}>Proceed</Text>
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
    paddingHorizontal: 4,
    paddingTop: 48,
    paddingBottom: 100,
  },
  headingContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  heading: {
    fontFamily: 'Plus Jakarta Sans Bold',
    fontWeight: 900,
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
  },
  imagePreview: {
    width: 150,
    height: 300,
    marginTop: 10,
    marginBottom: 20,
    resizeMode: 'cover',
    borderRadius: 10,
  },

  subHeading: {
    fontFamily: 'Plus Jakarta Sans Regular',
    fontSize: 13,
    color: '#fff',
  },
  buttons: {
    backgroundColor: '#ffaa0045',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    height: 120,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonTexts: {
    color: '#ffaa00',
    fontFamily: 'Plus Jakarta Sans SemiBold',
    fontSize: 13,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
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
    width: '100%',
  },
  modalButtonText: {
    fontFamily: 'Plus Jakarta Sans SemiBold',
    fontSize: 14,
    color: Colors.newBG,
    textAlign: 'center',
  },
  image: {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    marginBottom: 20,
  },
});

export default CreatePost;
