import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Colors } from '../../Component/Colors/Colors';
import { useNavigation } from '@react-navigation/native'; // Import for navigation

const images = [
  { url: "https://f005.backblazeb2.com/file/trader-signal-app-v1/Homeimages/Artboard+4-3.png", redirectTo: "NewProfileScreen" },
  { url: "https://trader-signal-app-v1.s3.us-east-005.backblazeb2.com/Homeimages/Artboard+5-4.png", redirectTo: "NewProfileScreen" },
  { url: "https://f005.backblazeb2.com/file/trader-signal-app-v1/Homeimages/Artboard+6-2.png", redirectTo: "CoursePage" },
];


const Slideshow = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const navigation = useNavigation(); // Hook for navigation

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 2000); // Change slide every 2 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentSlideIndex]);

  const goToPreviousSlide = () => {
    setCurrentSlideIndex(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const goToNextSlide = () => {
    setCurrentSlideIndex(prevIndex =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handleSlidePress = (redirectTo) => {
    navigation.navigate(redirectTo); // Navigate to the specified route
  };

  const currentSlide = images[currentSlideIndex];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.slide}
        onPress={() => handleSlidePress(currentSlide.redirectTo)}
      >
        <FastImage
          source={{ uri: currentSlide.url, priority: FastImage.priority.high }}
          style={styles.image}
          resizeMode={FastImage.resizeMode.cover}
        />
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors?.newBG,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: Colors?.newBG,
    borderRadius: 12,
    marginBottom: -24,
  },
  image: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
    borderRadius: 12,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  arrow: {
    fontSize: 24,
    color: Colors.primary,
  },
});

export default Slideshow;