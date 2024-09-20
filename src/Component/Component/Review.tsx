import React from 'react';
import {View, StyleSheet, Image, Text, ScrollView} from 'react-native';
import BoldText from '../Texts/BoldText';
import RegularText from '../Texts/RegularText'; // Assuming you have defined your colors
import Icon from 'react-native-remix-icon';
import {Colors} from '../Colors/Colors';

interface Review {
  profilePhoto?: any; // Update the type of profilePic as per your requirement
  rating: number;
  review: string;
  verified?: string;
  timestamp?: string;
  firstName?: string;
  lastName?: string;
}

const ReviewItem: React.FC<{reviewContent: Review}> = ({reviewContent}) => {
  const {rating, profilePhoto, firstName, lastName, review, timestamp} =
    reviewContent;

  console.log(review, 'lllllreview');
  const stars = Math.floor(rating);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const options = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };

    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(
      date,
    );

    return formattedDate;
  };

  return (
    <ScrollView>
      <View style={styles.reviewContainer}>
        {profilePhoto ? (
          <View style={styles.profilePicContainer}>
            <Image source={{uri: profilePhoto}} style={styles.profilePic} />
          </View>
        ) : (
          <View
            style={{
              marginTop: 10,
              padding: 16,
              backgroundColor: '#ffaa0025',
              width: 48,
              height: 48,
              marginRight: 6,
              borderRadius: 12,
            }}>
            <Icon
              name={'user-line'}
              size={14}
              color={Colors.primary} // Assuming you have defined primary color
            />
          </View>
        )}

        <View style={styles.reviewContent}>
          <Text
            style={{
              color: '#ffaa00',
              fontSize: 14,
              fontFamily: 'Plus Jakarta Sans SemiBold',
              marginTop: 6,
              marginBottom: 10,
            }}>
            {firstName} {lastName}
          </Text>

          <View style={styles.ratingContainer}>
            <View style={styles.starsContainer}>
              {[...Array(stars)].map((_, index) => (
                <Icon
                  key={index}
                  name={index < stars - 1 ? 'star-fill' : 'star-half-line'}
                  size={14}
                  color={Colors.primary} // Assuming you have defined primary color
                />
              ))}
            </View>
          </View>
          <View style={styles.reviewTextContainer}>
            {/* {verified && <BoldText textContent={verified} fontSize={14} />} */}
            <Text
              style={{
                color: '#fff',
                fontSize: 13,
                fontFamily: 'Plus Jakarta Sans Medium',
                marginTop: 6,
              }}>
              {review}
            </Text>

            <Text
              style={{
                color: '#808080',
                fontSize: 12,
                fontFamily: 'Plus Jakarta Sans SemiBold',
                marginVertical: 8,
              }}>
              {formatDate(timestamp)}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  reviewContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  profilePicContainer: {
    marginRight: 10,
  },
  profilePic: {
    width: 36,
    height: 36,
    borderRadius: 25,
  },
  reviewContent: {
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  reviewTextContainer: {},
});

export default ReviewItem;
