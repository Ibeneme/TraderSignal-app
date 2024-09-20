import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-remix-icon';

const Rating = ({ rating }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name={
            i <= rating ? 'star-fill' : 'star-line'
          }
          size={14}
          color={'#FF7527'}
        />
      );
    }
    return stars;
  };

  return <View style={{ flexDirection: 'row' }}>{renderStars()}</View>;
};

export default Rating;
