import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions,
  Image,
  Modal,
} from 'react-native';
import SafeArea from '../../Component/SafeAreaViewCustom/SafeArea';
import {Formik} from 'formik';
import * as Yup from 'yup';
import NewCustomTextInput from '../../Component/CustomInputs/NewCustomTextInput';
import {Colors} from '../../Component/Colors/Colors';
import ProfileHeaders from '../../Component/Header/ProfileHeaders';
import BodyView from '../../Component/SafeAreaViewCustom/BodyView';
import Icon from 'react-native-remix-icon';
import CreditCard from '../../Component/icons/CreditCard';
import Channels from '../../Component/icons/Channels';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../Redux/Store/Store';
import {getCurrentUser} from '../../Redux/Profile/Profile';
import {
  deleteSub,
  getUsersSubCreated,
  getUsersub,
  getUsersubJoined,
} from '../../Redux/Subscriptions/Sub';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import SubHeaders from '../../Component/Header/SubHeaders';
import PostIcon from '../../Component/icons/PostIcon';
import SemiBoldText from '../../Component/Texts/SemiBoldText';

const GetSubUsers: React.FC = () => {
  const handleSubmit = (values: {oldPassword: string; newPassword: string}) => {
    // Handle form submission here
    console.log('Form submitted with values:', values);
  };
  const [showModalDelete, setShowModalDelete] = useState(false);
  const route = useRoute();
  const {id} = route.params;
  console.log('Form submitted with id:', id);
  const [isVisible, setIsVisible] = useState(false); // State to control visibility
  const [subType, setSubType] = useState('created'); // State to track subscription type
  const toggleVisibility = (type: string) => {
    setIsVisible(!isVisible); // Toggle visibility state
    setSubType(type); // Set subscription type
  };

  const dispatch = useDispatch<AppDispatch>();
  const [subDetails, setSubDetails] = useState([]);
  const [subDetailsJoin, setSubDetailsJoin] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      //setLoading(true); // Set loading to true while fetching data
      dispatch(getUsersub(id))
        .then(response => {
          console.log('get sub retrieved:', response);
          console.log('get sub retrieved:', response?.payload);
          setSubDetails(response?.payload);
          setSubDetailsJoin(response?.payload?.users);
        })
        .catch(error => {
          console.error('Error retrieving user sub:', error);
          // setLoading(false); // Set loading to false in case of error
        });
    }, [dispatch]),
  );

  const handleDelete = () => {
    dispatch(deleteSub(id))
      .then(response => {
        console.log('User dellelelelle:', response);
        if (
          response?.payload?.message === 'Subscription deleted successfully'
        ) {
          setShowModalDelete(false);
          navigation.navigate('MySubs' as never);
        }
      })
      .catch(error => {});
  };

  const {fontScale} = useWindowDimensions();
  const navigation = useNavigation();
  return (
    <SafeArea>
      <View style={styles.container}>
        <SubHeaders
          GroupName={subDetails?.title}
          count={subDetails?.users?.length}
          goBackTwice
          id={subDetails?.id}
          creator={subDetails?.creator}
        />
        <BodyView color="#f4f4f4">
          <View style={styles.formContainer}>
            <TouchableOpacity
              // key={index}
              style={[styles.content]}
              onPress={() => {
                //    navigation.navigate('GetSub', {id: subscription?.id } as never);
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                }}>
                <View style={{width: '75%'}}>
                  <Text
                    style={{
                      fontFamily: 'Plus Jakarta Sans Bold',
                      fontWeight: 900,
                      color: 'white',
                      fontSize: 14,
       
                    }}>
                    {subDetails?.title}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Plus Jakarta Sans Regular',
                      color: '#ffffff90',
                      marginTop: 6,
                      fontSize: 12,
                    }}>
                    {subDetails?.description}
                  </Text>
                </View>

                <View style={{width: '25%', alignItems: 'flex-end'}}>
                  <Text
                    style={{
                      fontFamily: 'Plus Jakarta Sans Bold',
                      fontWeight: 900,
                      color: 'white',
                      fontSize: 14 * fontScale,
                    }}>
                    ${subDetails?.price}
                  </Text>
                </View>
              </View>

              <View style={{flexDirection: 'row', gap: 8}}>
                <View
                  style={{
                    backgroundColor: '#ffaa0027',
                    padding: 12,
                    marginTop: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 12,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Plus Jakarta Sans Regular',
                      color: '#ffaa00',
                      fontSize: 12,
                    }}>
                    {subDetails?.users?.length} Subscribers
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              // key={index}
              style={[styles.content, {width: '100%'}]}
              onPress={() => {
                //    navigation.navigate('GetSub', {id: subscription?.id } as never);
              }}>
              {subDetails?.users?.map((user, userIndex) => (
                <View
                  key={userIndex}
                  style={{
                    marginLeft: 0,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 16,
                  }}>
                  {/* <Text>Subscription id: {user?.id}</Text> */}

                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 6,
                      alignItems: 'flex-start',
                      width: '75%',
                    }}>
                    {!user?.profilePhoto ? (
                      <TouchableOpacity
                        style={{
                          padding: 14,
                          backgroundColor: Colors.newBG,
                          borderRadius: 64,
                          borderWidth: 1.4,
                          width: 40,
                          height: 40,
                          borderColor: Colors.primary,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Icon
                          name="user-line"
                          size={18}
                          color={Colors?.primary}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={{
                          padding: 14,
                          backgroundColor: Colors.newBG,
                          borderRadius: 64,
                          borderWidth: 1.4,
                          width: 40,
                          height: 40,
                          borderColor: Colors.primary,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={{uri: user?.profilePhoto}} // Use selected image URI
                          style={{width: 32, height: 32, borderRadius: 333}} // Set appropriate styling
                        />
                      </TouchableOpacity>
                    )}

                    <View style={{width: '100%'}}>
                      <Text
                        style={{
                          fontFamily: 'Plus Jakarta Sans Bold',
                          fontWeight: 900,
                          color: 'white',
                          fontSize: 14,
                        }}>
                        {user?.firstName} {user?.lastName}Jakarta
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Plus Jakarta Sans Regular',
                          color: '#ffffff90',
                          marginTop: 6,
                          fontSize: 12,
                        }}>
                        to expire {new Date(user.expirationDate).toDateString()}
                      </Text>
                    </View>
                  </View>

                  <View style={{width: '25%', alignItems: 'flex-end'}}>
                    <Text
                      style={{
                        fontFamily: 'Plus Jakarta Sans Bold',
                        fontWeight: 900,
                        color: 'white',
                        fontSize: 14 * fontScale,
                      }}>
                      ${user.amountPaid}
                    </Text>
                  </View>
                </View>
              ))}
            </TouchableOpacity>

            {subDetails?.users?.length > 0 ? (
              <View
                style={{
                  backgroundColor: '#ffaa0030',
                  borderRadius: 12,
                  marginTop: 16,
                  paddingTop: 6,
                  padding: 16,
                  width: '100%',
                }}>
                <Text
                  style={{
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                    fontSize: 14,
                    color: '#ffaa00',
                  }}>
                  You can only delete this subscription when there are no
                  subscribers left
                </Text>
              </View>
            ) : (
              <View
                style={{
                  backgroundColor: '#ff000030',
                  borderRadius: 12,
                  marginVertical: 16,
                  paddingVertical: 6,
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                  }}
                  onPress={() => setShowModalDelete(true)}>
                  <Text
                    style={{
                      fontFamily: 'Plus Jakarta Sans SemiBold',
                      fontSize: 14,
                      color: '#ff0000',
                    }}>
                    {' '}
                    Delete this Subscription
                  </Text>
                  <Icon name="arrow-right-s-line" size={24} color={'#ff0000'} />
                </TouchableOpacity>
              </View>
            )}
          </View>

          <Modal
            visible={showModalDelete}
            animationType="fade"
            transparent={true}
            onRequestClose={() => setShowModalDelete(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text
                  style={[
                    styles.modalTitle,
                    {marginTop: 24, textAlign: 'center'},
                  ]}>
                  Confirm you want to Delete {subDetails?.title} subscription
                </Text>
                <Text style={styles.modalText}>
                  Deleting this subscription is not reversible, Are you sure you
                  want to proceed?
                </Text>

                <TouchableOpacity
                  style={[styles.modalButtonLine, {width: '100%'}]}
                  //</View> onPress={() => navigation.navigate('LoginScreen')}
                  onPress={() => setShowModalDelete(false)}>
                  <Text style={styles.modalButtonTextLine}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, {width: '100%', marginTop: 10}]}
                  onPress={handleDelete}
                  //</View> onPress={() => navigation.navigate('LoginScreen')}
                >
                  <Text style={styles.modalButtonText}>
                    Delete Subscription
                  </Text>
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
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
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
  labelContainer: {
    //paddingVertical: 16,
  },
  label: {
    fontFamily: 'Plus Jakarta Sans Regular',
    fontSize: 13,
    color: '#fff', // Default label color
    paddingVertical: 12,
  },
  selectedLabel: {
    color: '#ffaa00', // Selected label color
    fontFamily: 'Plus Jakarta Sans Bold',
    fontWeight: 900,
    fontSize: 17,
  },
  selectedLabelView: {
    color: '#ffaa00', // Selected label color
    fontFamily: 'Plus Jakarta Sans Bold',
    fontWeight: 900,
    fontSize: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#ffaa00',
  },
  content: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#ffffff17',
    borderRadius: 12,
    paddingVertical: 16,
  },
  subHeaderText: {
    fontFamily: 'Plus Jakarta Sans Regular',
    fontSize: 13,
    color: '#333', // Default text color
    marginBottom: 8,
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
    borderColor: '#FF000F',
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
    backgroundColor: '#FF000F',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 5,
    marginTop: 36,
  },
  modalButtonLine: {
    backgroundColor: 'transparent',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 5,
    marginTop: 36,
    borderWidth: 1.3,
    borderColor: '#FF000F',
  },
  modalButtonTextLine: {
    fontFamily: 'Plus Jakarta Sans SemiBold',
    fontSize: 14,
    color: '#FF000F',
    textAlign: 'center',
  },
  modalButtonText: {
    fontFamily: 'Plus Jakarta Sans SemiBold',
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
});

export default GetSubUsers;
