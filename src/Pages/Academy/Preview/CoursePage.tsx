import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../../../Component/Colors/Colors';
import MainHeader from '../../../Component/Header/MainHeaders';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../Redux/Store/Store';
import {getAllCourses} from '../../../Redux/Subscriptions/Sub';
import {getAcademycoursesList} from '../../../Redux/Profile/Profile';
import FastImage from 'react-native-fast-image';

// const courses = [
//   {
//     id: 1,
//     title: 'Master Forex Trading',
//     description: 'Learn the ins and outs of Forex trading with expert tips.',
//     image: require('../../../../assets/images/logo.jpg'), // Replace with your image path
//     rating: 4.7,
//     contentType: 'Video',
//     category: 'Forex',
//   },
//   {
//     id: 2,
//     title: 'Crypto Trading for Beginners',
//     description: 'Get started with crypto trading and maximize your profits.',
//     image: require('../../../../assets/images/post.png'),
//     rating: 4.9,
//     contentType: 'Video',
//     category: 'Crypto',
//   },
//   {
//     id: 3,
//     title: 'Stock Market Trading',
//     description: 'Understand stock market strategies and trading techniques.',
//     image: require('../../../../assets/images/logo.jpg'),
//     rating: 4.6,
//     contentType: 'Image',
//     category: 'Currencies',
//   },
//   {
//     id: 4,
//     title: 'Gold Trading Simplified',
//     description:
//       'Learn to trade gold effectively with detailed market analysis.',
//     image: require('../../../../assets/images/post.png'),
//     rating: 4.8,
//     contentType: 'Image',
//     category: 'Gold',
//   },
//   // More sample data for each category
//   {
//     id: 5,
//     title: 'Advanced Forex Trading',
//     description: 'Master advanced forex trading strategies for success.',
//     image: require('../../../../assets/images/logo.jpg'),
//     rating: 4.8,
//     contentType: 'Video',
//     category: 'Forex',
//   },
//   {
//     id: 6,
//     title: 'Crypto Technical Analysis',
//     description: 'Deep dive into technical analysis of crypto markets.',
//     image: require('../../../../assets/images/post.png'),
//     rating: 4.9,
//     contentType: 'Image',
//     category: 'Crypto',
//   },
//   {
//     id: 7,
//     title: 'Currency Exchange Strategies',
//     description: 'Best strategies for profiting from currency exchanges.',
//     image: require('../../../../assets/images/logo.jpg'),
//     rating: 4.6,
//     contentType: 'Video',
//     category: 'Currencies',
//   },
//   {
//     id: 8,
//     title: 'Investing in Gold for Long-term Gains',
//     description: 'Learn how to invest in gold for stable long-term returns.',
//     image: require('../../../../assets/images/post.png'),
//     rating: 4.7,
//     contentType: 'Video',
//     category: 'Gold',
//   },
// ];

const categories = ['All', 'Crypto', 'Forex', 'Currencies', 'Gold'];

const highlightText = (text: string, searchTerm: string) => {
  if (!searchTerm) return <Text>{text}</Text>;

  const regex = new RegExp(`(${searchTerm})`, 'gi');
  const parts = text?.split(regex);

  return (
    <Text>
      {parts.map((part, index) =>
        part.toLowerCase() === searchTerm.toLowerCase() ? (
          <Text key={index} style={styles.highlightedText}>
            {part}
          </Text>
        ) : (
          <Text key={index}>{part}</Text>
        ),
      )}
    </Text>
  );
};

const CoursePage: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setIsLoadingPage(true);
      dispatch(getAcademycoursesList())
        .then(response => {
          console.log('getCurrentUser retrieved:', response);
          console.log('get nse?.pa retrieved:', response?.payload);
          setCourses(response.payload);
          setIsLoadingPage(false);
        })
        .catch(error => {
          console.error('Error retrieving user sub:', error);
        });
    }, [dispatch]),
  );

  // Filter courses based on search input and category
  const filteredCourses =
    activeCategory === 'All'
      ? courses
      : courses?.filter(course => course?.category === activeCategory);

  const searchedCourses = filteredCourses.filter(
    course =>
      course?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      course?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase()),
  );

  const handleEnroll = course => {
    setIsLoading(true);
    navigation.navigate('SpecificCoursePage', {course: selectedCourse});
    // Simulate loading and stop after 2 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    handleCoursePress(course);
  };
  const handleCoursePress = course => {
    setSelectedCourse(null);
    console.log(course, 'coursecoursecoursecourse');
    //navigation.navigate('SpecificCoursePage', {course: course});
  };
  return (
    <SafeAreaView style={styles.container}>
      {isLoadingPage ? (
        <ActivityIndicator color={'#fff'} />
      ) : (
        <View style={{width: '100%', height: '100%'}}>
          <MainHeader title="OTI Academy" />
          <ScrollView
            style={styles.verticalScroll}
            contentContainerStyle={{padding: 16}}>
            {/* Search Bar */}
            <TextInput
              style={styles.searchBar}
              placeholder="Search Courses"
              placeholderTextColor="#aaaaaa"
              value={searchTerm}
              onChangeText={text => setSearchTerm(text)}
            />

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoryToggleContainer}>
              {categories.map(category => (
                <TouchableOpacity
                  key={category}
                  onPress={() => setActiveCategory(category)}
                  style={[
                    styles.categoryToggle,
                    activeCategory === category && styles.activeCategoryToggle,
                  ]}>
                  <Text
                    style={[
                      styles.categoryToggleText,
                      activeCategory === category &&
                        styles.activeCategoryToggleText,
                    ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.header}>Trading Courses</Text>

            {/* Horizontal ScrollView for course media (videos/images) */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalScroll}>
              {searchedCourses?.map(course => (
                <TouchableOpacity
                  key={course?.id}
                  style={styles.courseCard}
                  onPress={() => setSelectedCourse(course)}>
                  <FastImage
                    resizeMode={FastImage.resizeMode.cover}
                    source={{
                      uri: course?.image,
                      priority: FastImage.priority.high,
                    }}
                    style={styles.courseImage}
                  />
                  <Text style={styles.courseTitle}>
                    {highlightText(course?.title, searchTerm)}
                  </Text>
                  <Text style={styles.courseType}>
                    {highlightText(course?.description, searchTerm)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Vertical ScrollView for course details */}
            <Text style={styles.header}>Trading Courses</Text>

            {searchedCourses.map(course => (
              <TouchableOpacity
                key={course?.id}
                style={styles.courseDetailCard}
                onPress={() => setSelectedCourse(course)}>
                <Text style={styles.courseDetailTitle}>
                  {highlightText(course?.title, searchTerm)}
                </Text>
                <Text style={styles.courseDescription}>
                  {highlightText(course?.description, searchTerm)}
                </Text>
                <Text style={styles.courseRating}>
                  Rating: {course?.rating} ★
                </Text>
              </TouchableOpacity>
            ))}

            {selectedCourse && (
              <Modal
                animationType="slide"
                transparent={true}
                visible={!!selectedCourse}
                onRequestClose={() => setSelectedCourse(null)}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <FastImage
                      resizeMode={FastImage.resizeMode.cover}
                      source={{
                        uri: selectedCourse.image,
                        priority: FastImage.priority.high,
                      }}
                      style={styles.modalImage}
                    />
                    <Text style={styles.modalTitle}>
                      {selectedCourse.title}
                    </Text>
                    <Text style={styles.modalDescription}>
                      {selectedCourse.description}
                    </Text>
                    <Text style={styles.modalRating}>
                      Rating: {selectedCourse.rating} ★
                    </Text>
                    {/* CTA Button */}
                    <TouchableOpacity
                      style={styles.enrollButton}
                      onPress={() => handleEnroll(selectedCourse)}
                      disabled={isLoading}>
                      {isLoading ? (
                        <ActivityIndicator size="small" color="#fff" />
                      ) : (
                        <Text style={styles.enrollButtonText}>Start</Text>
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.closeModalButton}
                      onPress={() => setSelectedCourse(null)}>
                      <Text style={styles.closeModalText}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            )}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.newBG,
  },
  searchBar: {
    height: 50,
    backgroundColor: '#ffffff20',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    marginTop: 16,
  },
  highlightedText: {
    backgroundColor: Colors.primary,
    color: '#fff',
  },
  categoryToggleContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  categoryToggle: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ffffff90',
    marginRight: 10,
  },
  activeCategoryToggle: {
    backgroundColor: '#ffffff21',
    borderWidth: 0,
  },
  categoryToggleText: {
    color: '#ffffff90',
    fontFamily: 'Plus Jakarta Sans Regular',
  },
  activeCategoryToggleText: {
    color: '#fff',
    fontFamily: 'Plus Jakarta Sans Bold',
    fontWeight: 'bold',
  },
  header: {
    fontSize: 16,
    color: '#fff',
    paddingTop: 48,
    fontWeight: 'bold',
    marginBottom: 16,
    fontFamily: 'Plus Jakarta Sans Bold',
  },
  horizontalScroll: {
    marginBottom: 10,
  },
  courseCard: {
    marginRight: 15,
    alignItems: 'center',
    backgroundColor: '#ffffff15',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  courseImage: {
    width: '100%',
    height: 140,
    borderRadius: 10,
    marginBottom: 24,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  courseType: {
    fontSize: 12,
    color: '#ffffff90',
    maxWidth: 240,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  verticalScroll: {
    flex: 1,
  },
  courseDetailCard: {
    backgroundColor: '#ffffff15',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  courseDetailTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
    fontFamily: 'Plus Jakarta Sans Bold',
  },
  courseDescription: {
    fontSize: 13,
    color: '#ffffff95',
    marginBottom: 32,
    fontFamily: 'Plus Jakarta Sans Regular',
  },
  courseRating: {
    fontFamily: 'Plus Jakarta Sans Regular',
    fontSize: 12,
    color: Colors.primary, // Gold color for star rating
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.newBG,
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff',
    fontFamily: 'Plus Jakarta Sans Bold',
    marginTop: 24,
  },
  modalDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 24,
  },
  modalRating: {
    fontSize: 12,
    color: Colors.primary,
    marginBottom: 36,
    fontFamily: 'Plus Jakarta Sans Regular',
  },
  enrollButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 240,
    alignItems: 'center',
    marginBottom: 16,
  },
  enrollButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Plus Jakarta Sans Regular',
  },
  closeModalButton: {
    backgroundColor: '#FFAA0021',
    paddingVertical: 16,
    borderRadius: 240,
    alignItems: 'center',
    marginBottom: 12,
  },
  closeModalText: {
    color: Colors.primary,
    fontSize: 14,
    fontFamily: 'Plus Jakarta Sans Regular',
  },
});

export default CoursePage;
