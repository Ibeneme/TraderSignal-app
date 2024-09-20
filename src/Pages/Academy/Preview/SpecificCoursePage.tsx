import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import WebView from 'react-native-webview';
import Accordion from './Accordion'; // Import your Accordion component
import MainHeader from '../../../Component/Header/MainHeaders';
import SafeArea from '../../../Component/SafeAreaViewCustom/SafeArea';
import FastImage from 'react-native-fast-image';

const SpecificCoursePage = () => {
  const route = useRoute();
  const {course} = route.params; // Get course data from route params
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  if (!course) {
    return (
      <SafeArea>
        <MainHeader />
        <ScrollView style={styles.container}>
          <Text style={styles.loadingText}>No course data available.</Text>
        </ScrollView>
      </SafeArea>
    );
  }

  // Sample video URL for testing
  const sampleVideoUrl =
    'https://f005.backblazeb2.com/file/trader-signal-app-v1/videos/1725780729021_122C6B8E-5C7D-4CE3-98B3-6790A15FF2E1.mp4';

  const handlePlayVideo = () => {
    setVideoUrl(sampleVideoUrl);
    setIsModalVisible(true);
  };

  const renderSectionHeader = (section, _, isActive) => (
    <View style={styles.accordionHeader}>
      <Text style={styles.accordionTitle}>{section.title}</Text>
    </View>
  );

  const renderSectionContent = section => (
    <View style={styles.accordionContent}>
      {section.subsections &&
        section.subsections.map((subsection, index) => (
          <Accordion
            key={index}
            sections={[subsection]}
            renderHeader={(subsection, _, isActive) => (
              <View style={styles.subsectionHeader}>
                <Text style={styles.subsectionTitle}>{subsection.title}</Text>
              </View>
            )}
            renderContent={() => (
              <View style={styles.subsectionContent}>
                <Text style={styles.subsectionDescription}>
                  {subsection.description}
                </Text>
                {subsection.video && (
                  <TouchableOpacity
                    style={styles.videoButton}
                    onPress={handlePlayVideo}>
                    <Text style={styles.videoButtonText}>Play Video</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          />
        ))}
    </View>
  );

  return (
    <SafeArea>
      <MainHeader />
      <ScrollView style={styles.container}>
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          source={{uri: course.image, priority: FastImage.priority.high}}
          style={styles.courseImage}
        />
        <Text style={styles.courseTitle}>{course.title}</Text>
        <Text style={styles.courseDescription}>{course.description}</Text>
        <Text style={styles.mainDescription}>Rating: {course.rating}</Text>
        <Accordion
          sections={course.sections || []}
          renderHeader={renderSectionHeader}
          renderContent={renderSectionContent}
        />
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => {
            /* Do nothing on back press */
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.webViewContainer}>
              <WebView source={{uri: videoUrl}} style={styles.webView} />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsModalVisible(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C', // Dark background color
  },
  courseImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderBottomWidth: 1,
    borderBottomColor: '#333', // Border color for separation
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text color
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  courseDescription: {
    fontSize: 16,
    color: '#E0E0E0', // Light gray text color
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  mainDescription: {
    fontSize: 14,
    color: '#E0E0E0', // Light gray text color
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  accordionHeader: {
    backgroundColor: '#333', // Dark background for accordion header
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#444', // Border color
  },
  accordionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text color
  },
  accordionContent: {
    backgroundColor: '#1C1C1C', // Dark background for content
    padding: 10,
  },
  subsectionHeader: {
    backgroundColor: '#444', // Slightly lighter dark background
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#555', // Border color
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text color
  },
  subsectionContent: {
    backgroundColor: '#1C1C1C', // Dark background for content
    padding: 10,
  },
  subsectionDescription: {
    fontSize: 14,
    color: '#E0E0E0', // Light gray text color
  },
  videoButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#444', // Dark button background
    borderColor: '#666', // Button border color
    borderWidth: 1,
    borderRadius: 5,
  },
  videoButtonText: {
    color: '#FFFFFF', // White text color
    textAlign: 'center',
  },
  loadingText: {
    color: '#E0E0E0', // Light gray text color
    textAlign: 'center',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 170, 0, 0.9)', // Semi-transparent background with color #FFAA00
  },
  webViewContainer: {
    width: '90%',
    height: '80%',
    backgroundColor: '#FFFFFF', // White background for the WebView container
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  webView: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: '#121212', // Background color for the close button
    alignItems: 'center',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#FFFFFF', // White text color
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SpecificCoursePage;
