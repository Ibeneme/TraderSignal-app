import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Animated,
  Text,
  Modal,
  ActivityIndicator,
} from 'react-native';
import SafeArea from '../../Component/SafeAreaViewCustom/SafeArea';
import ClickableImage from '../../Component/Component/ClickableImage';
import {useTheme} from '../../Context/ThemeProvidr';
import BodyView from '../../Component/SafeAreaViewCustom/BodyView';
import Icon from 'react-native-remix-icon';
import {Colors} from '../../Component/Colors/Colors';
import {useNavigation, useRoute} from '@react-navigation/core';
import {Transaction} from './Wallet';
import ProfileHeaders from '../../Component/Header/ProfileHeaders';
import VerifiedBadge from '../../Component/icons/VerifiedBadge';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../Redux/Store/Store';
import {
  getCurrentUser,
  getUserProfile,
  profilePic,
  updateUser,
} from '../../Redux/Profile/Profile';
import {useFocusEffect} from '@react-navigation/native';
import NewCustomTextInput from '../../Component/CustomInputs/NewCustomTextInput';
import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import Loader from '../../Component/Component/Loader';
import {editSub, getUsersub} from '../../Redux/Subscriptions/Sub';

const EditSubScreen: React.FC = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch<AppDispatch>();
  const [pageIslLoading, setPageIsLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [thisUser, setUser] = useState('');
  const [updatedFirstName, setUpdatedFirstName] = useState('');
  const [updatedLastName, setUpdatedLastName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState('');
  const [profilePics, setProfilePic] = useState('');

  const [errUpdatedFirstName, setErrUpdatedFirstName] = useState('');
  const [errUpdatedLastName, setErrUpdatedLastName] = useState('');
  const [errUpdatedEmail, setErrUpdatedEmail] = useState('');
  const [errUpdatedPhoneNumber, setErrUpdatedPhoneNumber] = useState('');
  const [showModal, setShowModal] = useState(false);
  const route = useRoute();
  const {id} = route.params;
  console.group(id, 'llll');

  console.log(profilePics, 'ISLAODING');
  useEffect(() => {
    setPageIsLoading(true);
    dispatch(getCurrentUser())
      .then(response => {
        console.log('User profile retrieved:', response);
        console.log('User profile retrieved:', response?.payload?.user?._id);
        if (response?.payload?.user?._id) {
          dispatch(getUserProfile(response?.payload?.user?._id))
            .then(response => {
              console.log('get profile retrieved:', response);
              setUser(response?.payload);

              setProfilePic(response?.payload?.profilePhoto);
              setPageIsLoading(false);
            })
            .catch(error => {
              console.error('Error retrieving user profile:', error);
              setPageIsLoading(false);
            });
        }
      })
      .catch(error => {
        console.error('Error retrieving user profile:', error);
      });

    if (pageIslLoading === true) {
      dispatch(getCurrentUser())
        .then(response => {
          console.log('User profile retrieved:', response);
          console.log('User profile retrieved:', response?.payload?.user?._id);
          if (response?.payload?.user?._id) {
            dispatch(getUserProfile(response?.payload?.user?._id))
              .then(response => {
                console.log('get profile retrieved:', response);
                setUser(response?.payload);
                setUpdatedFirstName(response?.payload?.firstName);
                setUpdatedLastName(response?.payload?.lastName);
                setUpdatedEmail(response?.payload?.email);
                setProfilePic(response?.payload?.profilePhoto);
                setPageIsLoading(false);
              })
              .catch(error => {
                console.error('Error retrieving user profile:', error);
                setPageIsLoading(false);
              });
          }
        })
        .catch(error => {
          console.error('Error retrieving user profile:', error);
        });
    }
  }, [dispatch]);

  const [editFirstName, setEditFirstName] = useState(false);
  const [editLastName, setEditLastName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPhoneNumber, setEditPhoneNumber] = useState(false);

  const [subDetails, setSubDetails] = useState([]);
  const [subDetailsJoin, setSubDetailsJoin] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      //setLoading(true); // Set loading to true while fetching data
      dispatch(getUsersub(id))
        .then(response => {
          //console.log('get sub retrieved:', response);
          console.log('get sub retrieved:', response?.payload?.posts);
          setSubDetails(response?.payload);

          setUpdatedFirstName(response?.payload?.title);
          setUpdatedLastName(response?.payload?.description);
          setUpdatedEmail(response?.payload?.price);
          setUpdatedPhoneNumber(response?.payload?.durationInDays);
        })
        .catch(error => {
          // console.error('Error retrieving user sub:', error);
          // setLoading(false); // Set loading to false in case of error
        });
    }, [dispatch]),
  );

  // State variables to hold updated values

  console.log(updatedFirstName);
  const handleChange = fieldName => text => {
    // Update the corresponding field in the state based on the field name
    switch (fieldName) {
      case 'firstName':
        setUpdatedFirstName(text);
        break;
      case 'lastName':
        setUpdatedLastName(text);
        break;
      case 'email':
        setUpdatedEmail(text);
        break;
      case 'phoneNumber':
        setUpdatedPhoneNumber(text);
        break;
      // Add cases for other fields if needed
      default:
        break;
    }
  };

  const [formData, setFormData] = useState(new FormData());

  const [selectedImage, setSelectedImage] = useState<string | null>(null); // State variable to hold the selected image URI

  // Other state variables...

  const handleUserImageClick = () => {
    // Open image picker
    const options = {
      mediaType: 'photo', // Change to 'video' if you want to select videos
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // Set the selected image URI to state variable
        setSelectedImage(response.assets[0].uri);
        console.log(response.assets[0].uri);
        setShowModal(true);
        console.log(selectedImage, 'selectedImage');
      }
    });
  };

  const handleUpdateUser = () => {
    if (!selectedImage) {
      console.log('No image selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', {
      uri: selectedImage,
      name: 'profile.jpg', // You can specify any file name here
      // type: 'image/jpeg', // Adjust the MIME type according to your image type
    });

    console.log('Selected Image:', selectedImage);
    console.log('FormData:', formData);
    setImageLoading(true);
    dispatch(profilePic(formData))
      .then(response => {
        console.log(
          'Update successful:',
          response?.payload?.message,
          response?.payload?.user?.profilePhoto,
        );

        if (response?.payload?.message === 'Photo Uploaded Successfully!') {
          setProfilePic(response?.payload?.user?.profilePhoto);
          setShowModal(false);
          setImageLoading(false);
          setPageIsLoading(true);

          // Set page isLoading to false after 60 seconds
          setTimeout(() => {
            setPageIsLoading(false);
          }, 30000);
        }
        setImageLoading(false);
      })
      .catch(error => {
        setImageLoading(false);
        console.error('Update failed:', error);
      });
  };

  const handleSave = () => {
    setLoading(true);
    if (updatedFirstName === ' ') {
      setErrUpdatedFirstName('Title must have at least two characters');
      setLoading(false);
      return; // Exit the function early if validation fails
    }

    if (updatedLastName === ' ') {
      setErrUpdatedLastName('Description must have at least two characters');
      setLoading(false);
      return; // Exit the function early if validation fails
    }

    if (updatedPhoneNumber === ' ') {
      setErrUpdatedFirstName('Duration must have at least a character');
      setLoading(false);
      return; // Exit the function early if validation fails
    }

    if (updatedEmail === ' ') {
      setErrUpdatedLastName('Price must have at least a character');
      setLoading(false);
      return; // Exit the function early if validation fails
    }

    setErrUpdatedFirstName('');
    setErrUpdatedLastName('');
    setErrUpdatedEmail('');
    setErrUpdatedPhoneNumber('');

    // Construct payload
    const payload = {
      title: updatedFirstName,
      description: updatedLastName,
      durationIndays: updatedPhoneNumber,
      price: updatedEmail,
      // Include other fields if needed
    };

    console.log(payload, 'payload');
    // Dispatch updateUser action
    dispatch(
      editSub({
        title: updatedFirstName,
        description: updatedLastName,
        durationInDays: updatedPhoneNumber,
        price: updatedEmail,
        subID: id,
      }),
    )
      .then(response => {
        console.log('payloadpayload', payload, id);
        console.log('payload', response);
        setLoading(false);
        //Update state variables with new values
        // setUser(response.payload.user);
        // setUpdatedFirstName(response.payload.user.firstName);
        // setUpdatedLastName(response.payload.user.lastName);
        // setUpdatedEmail(response.payload.user.email);
        // setUpdatedPhoneNumber(response.payload.user.mobile);
        //Hide edit mode
        setEditFirstName(false);
        setEditLastName(false);
        setEditPhoneNumber(false);
      })
      .catch(error => {
        setLoading(false);
        console.error('Error updating user profile:', error);
      });
  };

  return (
    <SafeArea>
      <View style={{backgroundColor: '#f4f4f4', height: '100%'}}>
        <ProfileHeaders />

        {pageIslLoading === true ? (
          <Loader />
        ) : (
          <BodyView color="#f4f4f4">
            <View
              style={{
                //backgroundColor: isDarkModeEnabled ? '#00000045' : '#fff',
                //padding: 12,
                borderRadius: 24,
                marginTop: 12,
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  width: '100%',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginTop: 36,
                }}>
                <Text
                  style={{
                    fontFamily: 'Plus Jakarta Sans Bold',
                    fontWeight: 900,
                    fontSize: 16,
                    marginVertical: 4,
                    marginBottom: 2,
                    color: '#fff',
                    marginTop: 12,
                  }}>
                  {updatedFirstName}
                </Text>

                <View style={{flexDirection: 'row', gap: 8}}>
                  <Text
                    style={{
                      fontFamily: 'Plus Jakarta Sans Regular',
                      fontSize: 12,
                      marginVertical: 4,
                      marginBottom: 32,
                      color: '#fff',
                    }}>
                    {updatedLastName}
                  </Text>
                </View>

                <View
                  style={{
                    justifyContent: 'center',
                    marginTop: 32,
                    width: '100%',
                    gap: -8,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Plus Jakarta Sans Bold',
                      fontWeight: 900,
                      fontSize: 14,
                      marginVertical: 4,
                      marginBottom: 16,
                      color: '#fff',
                    }}>
                    Title
                  </Text>

                  <TouchableOpacity
                    style={{
                      backgroundColor: '#ffffff12',
                      borderRadius: 12,

                      paddingVertical: 12,
                    }}
                    onPress={() => setEditFirstName(prevState => !prevState)}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                      }}
                      onPress={() => setEditFirstName(prevState => !prevState)}>
                      <Text
                        style={{
                          fontFamily: 'Plus Jakarta Sans Medium',
                          fontSize: 14,
                          color: '#fff',
                        }}>
                        {' '}
                        {updatedFirstName}
                      </Text>
                      {editFirstName === true ? (
                        <View style={{backgroundColor: '#ffaa0000'}}>
                          <Icon
                            name="check-double-line"
                            size={20}
                            color={'#ffaa00'}
                          />
                        </View>
                      ) : (
                        <Icon name="pencil-line" size={20} color={'#fff'} />
                      )}
                    </TouchableOpacity>
                  </TouchableOpacity>
                  {editFirstName === true ? (
                    <View>
                      <NewCustomTextInput
                        //label="First Name"
                        value={updatedFirstName}
                        onChangeText={handleChange('firstName')}
                        error={errUpdatedFirstName}
                        placeholder="Enter a new last name"
                      />
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#ffaa00',
                          padding: 16,
                          width: 100,
                          borderRadius: 12,
                        }}
                        onPress={handleSave}>
                        <Text
                          style={{
                            fontFamily: 'Plus Jakarta Sans SemiBold',
                            textAlign: 'center',
                          }}>
                          Save
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : null}
                </View>

                <View
                  style={{
                    justifyContent: 'center',
                    marginTop: 32,
                    width: '100%',
                    gap: -8,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Plus Jakarta Sans Bold',
                      fontWeight: 900,
                      fontSize: 14,
                      marginVertical: 4,
                      marginBottom: 16,
                      color: '#fff',
                    }}>
                    Description
                  </Text>

                  <TouchableOpacity
                    style={{
                      backgroundColor: '#ffffff12',
                      borderRadius: 12,

                      paddingVertical: 12,
                    }}
                    onPress={() => setEditLastName(prevState => !prevState)}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                      }}
                      onPress={() => setEditLastName(prevState => !prevState)}>
                      <Text
                        style={{
                          fontFamily: 'Plus Jakarta Sans Medium',
                          fontSize: 14,
                          color: '#fff',
                        }}>
                        {' '}
                        {updatedLastName}
                      </Text>
                      {editLastName === true ? (
                        <View style={{backgroundColor: '#ffaa0000'}}>
                          <Icon
                            name="check-double-line"
                            size={20}
                            color={'#ffaa00'}
                          />
                        </View>
                      ) : (
                        <Icon name="pencil-line" size={20} color={'#fff'} />
                      )}
                    </TouchableOpacity>
                  </TouchableOpacity>
                  {editLastName === true ? (
                    <View>
                      <NewCustomTextInput
                        //label="First Name"
                        value={updatedLastName}
                        onChangeText={handleChange('lastName')}
                        error={errUpdatedLastName}
                        placeholder="Enter a new last name"
                      />
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#ffaa00',
                          padding: 16,
                          width: 100,
                          borderRadius: 12,
                        }}
                        onPress={handleSave}>
                        <Text
                          style={{
                            fontFamily: 'Plus Jakarta Sans SemiBold',
                            textAlign: 'center',
                          }}>
                          Save
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : null}
                </View>

                <View
                  style={{
                    justifyContent: 'center',
                    marginTop: 32,
                    width: '100%',
                    gap: -8,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Plus Jakarta Sans Bold',
                      fontWeight: 900,
                      fontSize: 14,
                      marginVertical: 4,
                      marginBottom: 16,
                      color: '#fff',
                    }}>
                    Price
                  </Text>

                  <TouchableOpacity
                    style={{
                      backgroundColor: '#ffffff12',
                      borderRadius: 12,

                      paddingVertical: 12,
                    }}
                    onPress={() => setEditEmail(prevState => !prevState)}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                      }}
                      onPress={() => setEditEmail(prevState => !prevState)}>
                      <Text
                        style={{
                          fontFamily: 'Plus Jakarta Sans Medium',
                          fontSize: 14,
                          color: '#fff',
                        }}>
                        {' '}
                        {updatedEmail}
                      </Text>
                      {editEmail === true ? (
                        <View style={{backgroundColor: '#ffaa0000'}}>
                          <Icon
                            name="check-double-line"
                            size={20}
                            color={'#ffaa00'}
                          />
                        </View>
                      ) : (
                        <Icon name="pencil-line" size={20} color={'#fff'} />
                      )}
                    </TouchableOpacity>
                  </TouchableOpacity>
                  {editEmail === true ? (
                    <View>
                      <NewCustomTextInput
                        //label="First Name"
                        value={updatedFirstName}
                        onChangeText={handleChange('firstName')}
                        error={errUpdatedFirstName}
                        placeholder="Enter a new last name"
                        keyboardType="numeric"
                      />
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#ffaa00',
                          padding: 16,
                          width: 100,
                          borderRadius: 12,
                        }}
                        onPress={handleSave}>
                        <Text
                          style={{
                            fontFamily: 'Plus Jakarta Sans SemiBold',
                            textAlign: 'center',
                          }}>
                          Save
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : null}
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    marginTop: 32,
                    width: '100%',
                    gap: -8,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Plus Jakarta Sans Bold',
                      fontWeight: 900,
                      fontSize: 14,
                      marginVertical: 4,
                      marginBottom: 16,
                      color: '#fff',
                    }}>
                    Duration in Days
                  </Text>

                  <TouchableOpacity
                    style={{
                      backgroundColor: '#ffffff12',
                      borderRadius: 12,

                      paddingVertical: 12,
                    }}
                    onPress={() => setEditPhoneNumber(prevState => !prevState)}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                      }}
                      onPress={() =>
                        setEditPhoneNumber(prevState => !prevState)
                      }>
                      <Text
                        style={{
                          fontFamily: 'Plus Jakarta Sans Medium',
                          fontSize: 14,
                          color: '#fff',
                        }}>
                        {' '}
                        {updatedPhoneNumber
                          ? updatedPhoneNumber
                          : 'Tap to enter a phone number'}
                      </Text>
                      {editPhoneNumber === true ? (
                        <View style={{backgroundColor: '#ffaa0000'}}>
                          <Icon
                            name="check-double-line"
                            size={20}
                            color={'#ffaa00'}
                          />
                        </View>
                      ) : (
                        <Icon name="pencil-line" size={20} color={'#fff'} />
                      )}
                    </TouchableOpacity>
                  </TouchableOpacity>
                  {editPhoneNumber === true ? (
                    <View>
                      <NewCustomTextInput
                        //label="First Name"
                        keyboardType="numeric"
                        value={updatedPhoneNumber}
                        onChangeText={handleChange('phoneNumber')}
                        error={errUpdatedPhoneNumber}
                        placeholder="Enter a new phone number"
                      />
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#ffaa00',
                          padding: 16,
                          width: 100,
                          borderRadius: 12,
                        }}
                        onPress={handleSave}>
                        <Text
                          style={{
                            fontFamily: 'Plus Jakarta Sans SemiBold',
                            textAlign: 'center',
                          }}>
                          Save
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : null}
                </View>
              </View>
              <Modal
                visible={showModal}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setShowModal(false)}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Image
                      source={{uri: selectedImage ? selectedImage : null}}
                      style={styles.image}
                    />
                    <Text style={styles.modalTitle}>
                      Preview your selected Image
                    </Text>

                    <Text style={styles.modalText}>
                      Preview your selected Image{' '}
                    </Text>
                    <TouchableOpacity
                      style={[styles.modalButton, {width: '100%'}]}
                      onPress={handleUpdateUser}
                      disabled={imageLoading}>
                      {imageLoading ? (
                        <ActivityIndicator color={Colors.newBG} size="small" />
                      ) : (
                        <Text style={styles.modalButtonText}> Upload </Text>
                      )}
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.modalButtonLine, {width: '100%'}]}
                      onPress={() => setShowModal(false)}>
                      <Text style={styles.modalButtonTextLine}> Cancel </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              <View style={{marginBottom: 84}}></View>
            </View>
          </BodyView>
        )}
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
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
    borderColor: '#ffaa00',
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
    backgroundColor: '#ffaa00',
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

  modalButtonLine: {
    backgroundColor: '#ffaa0025',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 5,
    marginTop: 12,
  },
  modalButtonTextLine: {
    fontFamily: 'Plus Jakarta Sans SemiBold',
    fontSize: 14,
    color: '#ffaa00',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  transactionsContainer: {
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#ffff', // Adjust background color as needed
  },
  image: {
    height: 200,
    borderRadius: 12,
    marginVertical: 24,
    width: '100%',
  },
  detailsContainer: {
    position: 'absolute',
    top: 40,
    left: 10,
    justifyContent: 'space-between',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 3,
    marginTop: 4,
  },
});

export default EditSubScreen;
