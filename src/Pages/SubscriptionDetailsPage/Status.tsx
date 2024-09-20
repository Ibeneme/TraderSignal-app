import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  useWindowDimensions,
  Linking,
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
import {useRoute} from '@react-navigation/native';
import {formatDate} from './Subscription';

const StatusSpecific: React.FC = () => {
  const handleSubmit = (values: {oldPassword: string; newPassword: string}) => {
    // Handle form submission here
    console.log('Form submitted with values:', values);
  };
  const {width, height} = useWindowDimensions();
  const route = useRoute();
  const {item} = route.params;

  console.log(item, 'itemitem');
  // Define Yup validation schema
  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
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
      <ProfileHeaders />
      <View>
        <BodyView color="#f4f4f4">
          <View>
            <View
              style={{
                marginTop: 24,
                alignSelf: 'flex-start',
                backgroundColor:
                  item?.status === 'pending'
                    ? '#ffaa0045'
                    : item?.status === 'rejected'
                    ? '#ff000045'
                    : item?.status === 'accepted'
                    ? '#62D94445'
                    : '#ffaa0045', // Default icon name
                padding: 16,
                borderRadius: 36,
                marginBottom: 16,
              }}>
              <Icon
                name={
                  item?.status === 'pending'
                    ? 'loader-2-fill'
                    : item?.status === 'rejected'
                    ? 'error-warning-fill'
                    : item?.status === 'accepted'
                    ? 'wallet-fill'
                    : 'wallet-fill' // Default icon name
                }
                size={36}
                color={
                  item?.status === 'pending'
                    ? '#ffaa00'
                    : item?.status === 'rejected'
                    ? '#ff0000'
                    : item?.status === 'accepted'
                    ? '#62D944'
                    : '#ffaa00' // Default icon name
                }
              />
            </View>
            <Text
              style={{
                fontFamily: 'Plus Jakarta Sans Bold',
                fontSize: 18,
                color: '#fff',
                fontWeight: 'bold',

                alignSelf: 'flex-start',
              }}>
              {item?.status
                ? item?.status?.charAt(0)?.toUpperCase() +
                  item?.status?.slice(1)?.toLowerCase()
                : ''}
            </Text>
            <Text
              style={{
                fontFamily: 'Plus Jakarta Sans Regular',
                fontSize: 12,
                marginVertical: 4,
                marginBottom: 32,
                color: '#fff',
                alignSelf: 'flex-start',
              }}>
              Your payment of
              <Text
                style={{
                  color: '#ffaa00',
                  fontFamily: 'Plus Jakarta Sans Bold',
                  paddingVertical: 24,
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                {' '}
                ${item?.price}{' '}
              </Text>
              for
              <Text
                style={{
                  color: '#ffaa00',
                  fontFamily: 'Plus Jakarta Sans Bold',
                  paddingVertical: 24,
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                {' '}
                {item?.title || 'Subscription'}{' '}
              </Text>
              is{' '}
              {item?.status
                ? item?.status?.charAt(0)?.toUpperCase() +
                  item?.status?.slice(1)?.toLowerCase()
                : ''}
            </Text>

            <Text
              style={{
                fontFamily: 'Plus Jakarta Sans Bold',
                fontSize: 14,
                color: '#fff',
                alignSelf: 'flex-start',
                marginTop: -64,
              }}>
              {/* Subscription:{' '}
              {item?.title
                ? item?.title?.charAt(0)?.toUpperCase() +
                  item?.title?.slice(1)?.toLowerCase()
                : ''} */}
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
              {/* Description{' '}
              {item?.description
                ? item?.description?.charAt(0)?.toUpperCase() +
                  item?.description?.slice(1)?.toLowerCase()
                : ''} */}
            </Text>

            <View
              style={{
                marginTop: 12,
                alignSelf: 'flex-start',
                backgroundColor: '#ffaa0012',
                padding: 16,
                borderRadius: 36,
                marginBottom: 0,
              }}>
              <Text
                style={{
                  color: '#ffaa00',
                  fontFamily: 'Plus Jakarta Sans SemiBold',
                }}>
                {' '}
                {item?.status === 'accepted'
                  ? `Duration: ${item?.durationInDays} days - to expire in`
                  : `Duration: ${item?.durationInDays} days`}
              </Text>
            </View>

            <View
              style={{
                marginTop: 12,
                alignSelf: 'flex-start',
                backgroundColor: '#ffaa0012',
                padding: 16,
                borderRadius: 36,
                marginBottom: 0,
              }}>
              <Text
                style={{
                  color: '#ffaa00',
                  fontFamily: 'Plus Jakarta Sans SemiBold',
                }}>
                {' '}
                {formatDate(item?.createdAt)}
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.button]}
              onPress={() => {
                Linking.openURL('mailto:getotisignals@gmail.com');
              }}
              // onPress={handleSubmit} // handleSubmit is already provided by Formik
            >
              <Text
                style={{
                  fontFamily: 'Plus Jakarta Sans Regular',
                  fontSize: 14,
                  color: Colors.newBG,
                }}>
                Contact Us
              </Text>
            </TouchableOpacity>
            <Image
              source={{uri: item?.imageProof}}
              style={[
                // styles.image,
                {
                  width: width / 1.099,
                  marginTop: 12,
                  borderRadius: 12,
                  height: height / 1.7,
                  paddingBottom: 120,
                },
              ]}
            />
          </View>

          <View style={{marginBottom: 200}}></View>
        </BodyView>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: '#f4f4f4',
  },
  formContainer: {
    // flex: 1,
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
    marginBottom: 12,
    width: '100%',
    marginTop: 64,
  },
  buttonText: {
    fontFamily: 'Plus Jakarta Sans SemiBold',
    fontSize: 14,
    color: Colors.newBG,
  },
});

export default StatusSpecific;
