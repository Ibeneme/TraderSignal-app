import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
  Modal,
  Image,
  ActivityIndicator,
} from 'react-native';
import ImagePicker, {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import MainHeader from '../../Component/Header/MainHeaders';
import {useTheme} from '../../Context/ThemeProvidr';
import SafeArea from '../../Component/SafeAreaViewCustom/SafeArea';
import BodyView from '../../Component/SafeAreaViewCustom/BodyView';
import RegularText from '../../Component/Texts/RegularText';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../Component/Colors/Colors';
import TradeMark from '../../Component/icons/TradeMark';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../Redux/Store/Store';
import {uploadVideo} from '../../Redux/Profile/Profile';
// import Video from 'react-native-video';

interface VideoData {
  assets: {
    uri: string;
    // Add other properties as needed
  }[];
}

const KYCOptionsPage: React.FC = () => {
  const navigation = useNavigation();
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);
  const initialData: VideoData = {
    assets: [],
  };

  const [videoData, setVideoData] = useState<VideoData>(initialData);
  const [videoUri, setVideoUri] = useState<string>(''); // Empty string as initial state
  const [videoUriLoading, setVideoUriLoading] = useState(false); // Empty string as initial state

  const handleSelectVideo = () => {
    const options = {
      mediaType: 'video',
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled video picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response?.assets[0]?.uri) {
        //setShowModal(true);
        console.log('ImagePicker response: ', response?.assets[0].uri);
        setVideoUri(response?.assets[0]?.uri);

        // Upload the selected video
        console.log('Uploading video:', response?.assets[0]?.uri);

        // Create a new FormData object
        const formData = new FormData();
        formData.append('file', {
          uri: response?.assets[0]?.uri,
          ///selectedVideo,
          type: 'video/mp4', // Change the type according to your video format
          name: 'video.mp4', // Change the file name accordingly
        });
        setVideoUriLoading(true);
        // Dispatch the uploadVideo action with the FormData
        dispatch(uploadVideo(formData))
          .then(response => {
            console.log('Upload successful:', response);
            if (response?.payload?.message === 'File Uploaded Successfully!') {
              setShowModal(true);
              setVideoUriLoading(false);
            }

            setVideoUriLoading(false);
          })
          .catch(error => {
            Alert.alert('Error', 'Cannot upload video an error occurred');
            console.error('Upload error:', error);
          });
      }
    });
  };

  console.log('Uploading video:', videoUri);
  const dispatch = useDispatch<AppDispatch>();
  const handleUploadVideo = () => {
    console.log('videoUri length:', videoUri.length);
    // Implement video upload logic here
    if (videoUri && videoUri.length > 4) {
      // Upload the selected video
      console.log('Uploading video:', videoUri);

      // Create a new FormData object
      const formData = new FormData();
      formData.append('file', {
        uri: videoUri,
        ///selectedVideo,
        type: 'video/mp4', // Change the type according to your video format
        name: 'video.mp4', // Change the file name accordingly
      });

      // Dispatch the uploadVideo action with the FormData
      dispatch(uploadVideo(formData))
        .then(response => {
          console.log('Upload successful:', response);
          setShowModal(true);
        })
        .catch(error => {
          // Handle error if needed
          console.error('Upload error:', error);
        });
    } else {
      Alert.alert('Error', 'Please select a video first');
    }
  };

  const {isDarkModeEnabled} = useTheme();
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  return (
    <SafeArea>
      <View style={{backgroundColor: '#f4f4f4', height: '100%'}}>
        <MainHeader />
        <BodyView color="#f4f4f4">
          <View
            style={{
              marginTop: 36,
              width: 64,
              height: 64,
              padding: 12,
              borderRadius: 48,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#ffaa0012',
              marginBottom: 12,
            }}>
            <TradeMark color="#ffaa00" width={28} height={28} />
          </View>

          <Text
            style={{
              color: Colors.white,
              fontFamily: 'Plus Jakarta Sans Bold',
              fontWeight: 900,
              fontSize: 20,
            }}>
            Become a Provider
          </Text>

          <Text
            style={{
              color: Colors.white,
              fontFamily: 'Plus Jakarta Sans Medium',
              fontSize: 13,
              marginTop: 6,
            }}>
            Upload a recent video of your trade history
          </Text>
          <View
            style={{
              padding: 12,
              backgroundColor: '#ffffff12',
              marginTop: 36,
              borderRadius: 24,
            }}>
            <View
              style={{
                backgroundColor: '#ffaa0025',
                padding: 18,
                borderRadius: 12,
              }}>
              <Text
                style={{
                  color: Colors.primary,
                  fontFamily: 'Plus Jakarta Sans Bold',
                  fontWeight: 900,
                  fontSize: 14,
                }}>
                Upload a recent video of your trade history
              </Text>
            </View>
            <View style={{paddingHorizontal: 0, paddingTop: 24}}>
              <TouchableOpacity
                onPress={handleSelectVideo}
                disabled={videoUriLoading} // This line disables the button when videoUriLoading is true
                style={{
                  backgroundColor: videoUriLoading ? '#cccccc' : '#ffaa00', // Change background color when disabled
                  marginVertical: 10,
                  borderRadius: 12,
                  height: 50,
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: videoUriLoading ? '#888888' : Colors.newBG, // Change text color when disabled
                    fontFamily: 'Plus Jakarta Sans Bold',
                    fontWeight: 900,
                    fontSize: 14,
                  }}>
                  {videoUriLoading ? <ActivityIndicator /> : 'Select Video'}{' '}
                  {/* Change text when disabled */}
                </Text>
              </TouchableOpacity>

              {/* {videoUri && (
                <>
                  <Video
                    source={videoUri} // the video file
                    paused={false} // make it start
                    //style={styles.backgroundVideo} // any style you want
                    repeat={true} // make it a loop
                  />
                  <TouchableOpacity
                    onPress={handleUploadVideo}
                    style={{
                      backgroundColor: '#dc4d04',
                      marginVertical: 10,
                      borderRadius: 12,
                      height: 50,
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontFamily: 'Plus Jakarta Sans Bold',
                                       fontWeight: 900,
                        fontSize: 16,
                      }}>
                      Upload Video
                    </Text>
                  </TouchableOpacity>
                </>
              )} */}
            </View>

            <Modal
              visible={showModal}
              animationType="slide"
              transparent={true}
              onRequestClose={() => setShowModal(false)}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Image
                    source={require('../../../assets/images/orangee.png')}
                    style={styles.image}
                  />
                  <Text style={styles.modalTitle}>Video Upload Successful</Text>

                  <Text style={styles.modalText}>
                    Your application to be a provider on OTI Signals is received
                    and pending
                  </Text>
                  <TouchableOpacity
                    style={[styles.modalButton, {width: '100%'}]}
                    onPress={() => {
                      setShowModal(false);
                      navigation.navigate('NextKYCOptionsPage' as never);
                    }}>
                    <Text style={styles.modalButtonText}>Next</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </BodyView>
      </View>
    </SafeArea>
  );
};

export default KYCOptionsPage;

const styles = StyleSheet.create({
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

  errorText: {
    color: 'white',
    fontFamily: 'Plus Jakarta Sans Regular',
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
    fontWeight: 'bold',
    fontSize: 16,
  },
});
