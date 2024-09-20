import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PendingFileIcon from '../../Component/icons/Pending';
import {Colors} from '../../Component/Colors/Colors';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../Redux/Store/Store';
import SafeArea from '../../Component/SafeAreaViewCustom/SafeArea';
import MainHeader from '../../Component/Header/MainHeaders';
import BodyView from '../../Component/SafeAreaViewCustom/BodyView';

const NextKYCOptionsPage: React.FC = () => {
  const [fileState, setFileState] = useState<
    'pending' | 'rejected' | 'accepted'
  >('pending');
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <SafeArea>
      <View style={{backgroundColor: '#f4f4f4', height: '100%'}}>
        <MainHeader />
        <BodyView color="#f4f4f4">
          <View style={styles.container}>
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor:
                    fileState === 'pending'
                      ? '#ffaa0035'
                      : fileState === 'rejected'
                      ? '#ff000035'
                      : '#62D94435',
                },
              ]}>
              <PendingFileIcon
                color={
                  fileState === 'pending'
                    ? '#ffaa00'
                    : fileState === 'rejected'
                    ? '#ff0000'
                    : '#62D944'
                }
              />
            </View>

            <Text style={styles.title}>
              Application to be a Signal Provider Received Successfully Received
            </Text>

            <Text style={styles.subtitle}>Please wait while we verify</Text>

            <View style={styles.statusContainer}>
              <View
                style={[
                  styles.statusBackground,
                  {
                    backgroundColor:
                      fileState === 'pending'
                        ? '#ffaa0035'
                        : fileState === 'rejected'
                        ? '#ff000035'
                        : '#62D94435',
                  },
                ]}>
                <Text
                  style={[
                    styles.statusText,
                    {
                      color:
                        fileState === 'pending'
                          ? '#ffaa00'
                          : fileState === 'rejected'
                          ? '#ff0000'
                          : '#62D944',
                    },
                  ]}>
                  Application Status -{' '}
                  {fileState.charAt(0).toUpperCase() + fileState.slice(1)}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor:
                    fileState === 'pending'
                      ? '#ffaa00'
                      : fileState === 'rejected'
                      ? '#ff0000'
                      : '#62D944',
                },
              ]}
              onPress={() => {
                navigation.navigate('NewProfileScreen' as never);
              }}>
              <Text style={styles.buttonText}>Proceed</Text>
            </TouchableOpacity>
          </View>
        </BodyView>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    /// padding: 20,
    marginTop: 48,
  },
  iconContainer: {
    width: 64,
    height: 64,
    padding: 12,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    color: Colors.white,
    fontFamily: 'Plus Jakarta Sans Bold',
    fontWeight: 900,
    fontSize: 20,
    marginBottom: 6,
  },
  subtitle: {
    color: Colors.white,
    fontFamily: 'Plus Jakarta Sans Medium',
    fontSize: 13,
    marginBottom: 36,
  },
  statusContainer: {
    backgroundColor: '#ffffff12',
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 18,
    marginBottom: 36,
  },
  statusBackground: {
    //backgroundColor: '#ffaa0025',
    padding: 18,
    borderRadius: 12,
  },
  statusText: {
    // color: Colors.primary,
    fontFamily: 'Plus Jakarta Sans Bold',
    fontWeight: 900,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#ffaa00',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Plus Jakarta Sans SemiBold',
    fontSize: 14,
    color: Colors.newBG,
    textAlign: 'center',
  },
});

export default NextKYCOptionsPage;
