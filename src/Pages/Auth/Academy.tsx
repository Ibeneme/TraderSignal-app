import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
//import VideoPlayer from 'react-native-video-player';
import SafeArea from '../../Component/SafeAreaViewCustom/SafeArea';
import BodyView from '../../Component/SafeAreaViewCustom/BodyView';
import {Colors} from '../../Component/Colors/Colors';

const Academy: React.FC = () => {
  const [accordionOpen, setAccordionOpen] = useState<string | null>(null);

  const toggleAccordion = (title: string) => {
    setAccordionOpen(accordionOpen === title ? null : title);
  };

  const renderAccordionItem = (course: any) => (
    <View key={course.title} style={styles.accordionItem}>
      <TouchableOpacity
        onPress={() => toggleAccordion(course.title)}
        style={styles.header}>
        <Text style={styles.headerText}>{course.title}</Text>
        <Text style={styles.icon}>
          {accordionOpen === course.title ? '-' : '+'}
        </Text>
      </TouchableOpacity>
      {accordionOpen === course.title && (
        <>
          <Text style={styles.description}>{course.description}</Text>
          {course.videos.map((video: any, index: number) => (
            <View key={index}>
              <Text style={styles.videoTitle}>{video.title}</Text>
              {/* <VideoPlayer
                video={{ uri: video.url }}
                style={styles.video}
                disableControls={true}
                autoplay={false}
                defaultMuted={true}
                resizeMode="contain"
              /> */}
            </View>
          ))}
        </>
      )}
    </View>
  );

  return (
    <SafeArea>
      <BodyView>
        <ScrollView>
          <View style={{marginTop: 48}}>
            <Text style={styles.title}>Our Academy</Text>
          </View>
          {courses.map((course: any) => renderAccordionItem(course))}
        </ScrollView>
      </BodyView>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  accordionItem: {
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffaa00',
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 2,
    borderRadius: 5,
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
  },
  videoTitle: {
    fontSize: 14,
    marginBottom: 6,
    fontFamily: 'Plus Jakarta Sans SemiBold',
    color: '#fff',
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
    textAlign: 'center',
  },
});

export default Academy;
