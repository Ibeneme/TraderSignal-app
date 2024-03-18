import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import BoldText from '../Texts/BoldText';
import RegularText from '../Texts/RegularText'; // Assuming you have defined your colors
import Icon from 'react-native-remix-icon';
import {Colors} from '../Colors/Colors';

interface Review {
  profilePic: any; // Update the type of profilePic as per your requirement
  rating: number;
  reviewText: string;
  verified: string;
}

const ReviewItem: React.FC<{review: Review}> = ({review}) => {
  const {profilePic, rating, reviewText, verified} = review;

  const stars = Math.floor(rating);

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.profilePicContainer}>
        <Image source={profilePic} style={styles.profilePic} />
      </View>
      <View style={styles.reviewContent}>
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
          {verified && <BoldText textContent={verified} fontSize={16} />}

          <RegularText textContent={reviewText} color="#808080" />
        </View>
      </View>
    </View>
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
    width: 50,
    height: 50,
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
