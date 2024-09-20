import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import VideoPlayer from 'react-native-video-player';
import SafeArea from '../../Component/SafeAreaViewCustom/SafeArea';
import BodyView from '../../Component/SafeAreaViewCustom/BodyView';
import {Colors} from '../../Component/Colors/Colors';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {getCourses} from '../../Redux/Subscriptions/Sub';
import {AppDispatch} from '../../Redux/Store/Store';

const Academy: React.FC = () => {
  const [accordionOpen, setAccordionOpen] = useState<string | null>(null);
  const [videoAccordionOpen, setVideoAccordionOpen] = useState<string | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<any[]>([]); // Initialize as an empty array

  const dispatch = useDispatch<AppDispatch>();
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      dispatch(getCourses())
        .then(response => {
          console.log(response, 'responsecour');
          setCourses(response.payload);
        })
        .catch(error => {
          setLoading(false);
          console.error('Error retrieving user sub:', error);
        });
    }, [dispatch]),
  );

  const toggleAccordion = (title: string) => {
    setAccordionOpen(accordionOpen === title ? null : title);
  };

  const toggleVideoAccordion = (title: string) => {
    setVideoAccordionOpen(videoAccordionOpen === title ? null : title);
  };

  const openExternalLink = (url: string) => {
    Linking.openURL(url).catch(err =>
      console.error('Failed to open URL: ', err),
    );
  };

  const renderVideoAccordionItem = (video: any, index: number) => (
    <View key={index} style={styles.videoAccordionItem}>
      <TouchableOpacity
        onPress={() => toggleVideoAccordion(video?.title)}
        style={styles.videoHeader}>
        <Text style={styles.videoHeaderText}>{video?.title}</Text>
        <Text style={styles.videoIcon}>
          {videoAccordionOpen === video?.title ? '-' : '+'}
        </Text>
      </TouchableOpacity>
      {videoAccordionOpen === video?.title && (
        <View>
          <VideoPlayer
            video={{uri: video?.url}}
            style={styles.video}
            disableControls={true}
            autoplay={false}
            defaultMuted={true}
            resizeMode="contain"
          />
          <TouchableOpacity
            onPress={() => openExternalLink(video?.url)}
            style={{
              backgroundColor: '#ffaa0030',
              padding: 12,
              marginBottom: 24,
              alignSelf: 'flex-end',
              borderRadius: 24,
            }}>
            <Text style={styles.externalLinkText}>View Video on Browser</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const renderAccordionItem = (course: any) => (
    <View key={course?.title} style={styles.accordionItem}>
      <TouchableOpacity
        onPress={() => toggleAccordion(course?.title)}
        style={styles.header}>
        <Text style={styles.headerText}>{course?.title}</Text>
        <Text style={styles.icon}>
          {accordionOpen === course?.title ? '-' : '+'}
        </Text>
      </TouchableOpacity>
      {accordionOpen === course?.title && (
        <>
          <Text style={styles.description}>{course?.description}</Text>
          <Text style={styles.courseVideoHeader}>Course Videos</Text>
          <View style={styles.videoAccordionContainer}>
            {course?.videos?.map((video: any, index: number) =>
              renderVideoAccordionItem(video, index),
            )}
          </View>
        </>
      )}
    </View>
  );

  return (
    <SafeArea>
      <BodyView>
        <ScrollView>
          <View style={{marginTop: 48}}>
            <Text style={styles.title}>OTI Academy</Text>
          </View>
          {courses?.map(course => renderAccordionItem(course))}
        </ScrollView>
      </BodyView>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  accordionItem: {
    marginBottom: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderRadius: 5,
    marginTop: 8,
  },
  headerText: {
    fontSize: 14,
    fontFamily: 'Plus Jakarta Sans SemiBold',
    color: Colors.newBG,
  },
  icon: {
    fontSize: 24,
    color: Colors.newBG,
  },
  description: {
    fontSize: 12,
    marginBottom: 10,
    fontFamily: 'Plus Jakarta Sans Regular',
    color: '#fff',
    marginTop: 24,
  },
  courseVideoHeader: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: 'Plus Jakarta Sans Bold',
    fontWeight: 900,
    color: '#fff',
    paddingTop: 24,
  },
  videoAccordionContainer: {
    backgroundColor: '#ffffff20',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 6,
    marginBottom: 12,
  },
  videoAccordionItem: {
    // marginBottom: 12,
  },
  videoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffaa00',
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 2,
    borderRadius: 5,
  },
  videoHeaderText: {
    fontSize: 14,
    fontFamily: 'Plus Jakarta Sans SemiBold',
    color: '#333',
  },
  externalLinkText: {
    fontSize: 14,
    fontFamily: 'Plus Jakarta Sans Regular',
    color: '#ffaa00',
    marginHorizontal: 8,
  },
  videoIcon: {
    fontSize: 24,
    color: '#333',
  },
  video: {
    width: '100%',
    height: 200,
    marginBottom: 12,
  },
  title: {
    color: '#fff',
    fontFamily: 'Plus Jakarta Sans Bold',
    fontWeight: 900,
    fontSize: 22,
    marginBottom: 16,
    textAlign: 'left',
  },
});

export default Academy;
