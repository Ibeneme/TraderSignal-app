import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Image,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import CoursePage from './CoursePage';
import {Colors} from '../../../Component/Colors/Colors';
import ArrowLeft from '../../../Component/icons/ArrowLeft';
import HomeIcon from '../../../Component/icons/HomeIcon';
import PendingFileIcon from '../../../Component/icons/Pending';
import LockIcon from '../../../Component/icons/Lock';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../Redux/Store/Store';
import {getAllCourses} from '../../../Redux/Subscriptions/Sub';
import { getAcademycoursesList } from '../../../Redux/Profile/Profile';

// Sample courses data
export const courses = [
  {
    id: 1,
    title: 'Master Forex Trading',
    description: 'Learn the ins and outs of Forex trading with expert tips.',
    image: require('../../../../assets/images/logo.jpg'), // Replace with your image path
    rating: 4.7,
    contentType: 'Video',
    category: 'Forex',
    progress: 21,
  },
  {
    id: 2,
    title: 'Crypto Trading for Beginners',
    description: 'Get started with crypto trading and maximize your profits.',
    image: require('../../../../assets/images/post.png'),
    rating: 4.9,
    contentType: 'Video',
    progress: 78,
    category: 'Crypto',
  },
  {
    id: 3,
    title: 'Stock Market Trading',
    description: 'Understand stock market strategies and trading techniques.',
    image: require('../../../../assets/images/logo.jpg'),
    rating: 4.6,
    contentType: 'Image',
    progress: 34,
    category: 'Currencies',
  },
  {
    id: 4,
    title: 'Gold Trading Simplified',
    description:
      'Learn to trade gold effectively with detailed market analysis.',
    image: require('../../../../assets/images/post.png'),
    rating: 4.8,
    contentType: 'Image',
    progress: 70,
    category: 'Gold',
  },
  {
    id: 5,
    title: 'Advanced Forex Trading',
    description: 'Master advanced forex trading strategies for success.',
    image: require('../../../../assets/images/logo.jpg'),
    rating: 4.8,
    contentType: 'Video',
    progress: 45,
    category: 'Forex',
  },
  {
    id: 6,
    title: 'Crypto Technical Analysis',
    description: 'Deep dive into technical analysis of crypto markets.',
    image: require('../../../../assets/images/post.png'),
    rating: 4.9,
    contentType: 'Image',
    progress: 8,
    category: 'Crypto',
  },
  {
    id: 7,
    title: 'Currency Exchange Strategies',
    description: 'Best strategies for profiting from currency exchanges.',
    image: require('../../../../assets/images/logo.jpg'),
    rating: 4.6,
    contentType: 'Video',
    progress: 100,
    category: 'Currencies',
  },
  {
    id: 8,
    title: 'Investing in Gold for Long-term Gains',
    description: 'Learn how to invest in gold for stable long-term returns.',
    image: require('../../../../assets/images/post.png'),
    rating: 4.7,
    contentType: 'Video',
    progress: 70,
    category: 'Gold',
  },
];

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [progress, setProgress] = useState(50); // Progress state as a percentage (example: 50%)

  const dispatch = useDispatch<AppDispatch>();

  // useFocusEffect(
  //   React.useCallback(() => {
  //     dispatch(getAcademycoursesList())
  //       .then(response => {
  //         console.log('getCurrentUser retrieved:', response);
  //         console.log('get nse?.pa retrieved:', response?.payload);
  //       })
  //       .catch(error => {
  //         console.error('Error retrieving user sub:', error);
  //       });
  //   }, [dispatch]),
  // );

  // Render ongoing courses
  const renderCourses = () => {
    return (
      <FlatList
        data={courses}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.courseCard}
            onPress={() => handleCoursePress(item)}>
            <Image source={item.image} style={styles.courseImage} />
            <View style={styles.courseDetails}>
              <Text style={styles.courseTitle}>{item.title}</Text>
              <Text
                style={{
                  color: '#ffffff90',
                  fontSize: 12,
                  marginVertical: 8,
                  fontFamily: 'Plus Jakarta Sans Regular',
                }}>
                {item.description}
              </Text>
              <Text
                style={{
                  color: '#ffaa00',
                  fontSize: 10,
                  marginVertical: 8,
                  fontFamily: 'Plus Jakarta Sans Regular',
                }}>
                Rating: {item.rating} ★
              </Text>

              <View style={styles.progressBarBackground}>
                <View
                  style={[
                    styles.progressBarFill,
                    {width: `${item.progress}%`}, // Progress is set dynamically
                  ]}
                />
              </View>
              <Text style={styles.progressText}>{item.progress}% complete</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  };



  const handleCoursePress = course => {
    setModalVisible(false);
    navigation.navigate('SpecificCoursePage', {courseId: course.id});
  };



  return (
    <View style={styles.container}>
      {/* Home content */}
      {activeTab === 'Home' && <CoursePage />}

      {/* History content */}
      {/* {activeTab === 'History' && (
        <View>
          <Text>View your course history here.</Text>
        </View>
      )} */}

      {/* Modal for Ongoing Courses */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeModalButton}>
            <ArrowLeft color="#ffaa00" />
          </TouchableOpacity>
          {renderCourses()}
        </View>
      </Modal>

      {/* Floating bottom navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          onPress={() => setActiveTab('Home')}
          style={styles.navButton}>
          <Text
            style={
              activeTab === 'Home' ? styles.activeTab : styles.inactiveTab
            }>
            <HomeIcon color="#fff" />
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.navButton}>
          <LockIcon color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.newBG,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 48,
    marginBottom: 48,
    alignContent: 'center',
  },
  navButton: {
    padding: 10,
  },
  activeTab: {
    color: '#000',
    fontWeight: 'bold',
  },
  inactiveTab: {
    color: '#888',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.newBG,
    paddingTop: 48,
  },
  closeModalButton: {
    alignSelf: 'flex-end',
    padding: 10,
    backgroundColor: '#ffffff24',
    borderRadius: 10,
    marginTop: 48,
  },
  closeModalText: {
    fontSize: 18,
    color: '#fff',
  },
  courseCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF16',
    padding: 16,
    marginVertical: 6,
    borderRadius: 10,
  },
  courseImage: {
    width: 48,
    height: 48,
    borderRadius: 10,
    color: '#fff',
  },
  courseDetails: {
    flex: 1,
    marginLeft: 10,
  },
  courseTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
  progressBarBackground: {
    width: '100%',
    height: 8,
    backgroundColor: '#ffffff24',
    borderRadius: 4,
    marginTop: 10,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#ffaa00',
    borderRadius: 4,
  },
  progressText: {
    color: '#ffffff90',
    fontSize: 10,
    marginTop: 4,
  },
});
export default HomeScreen;
