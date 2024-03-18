import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import SemiBoldText from '../Texts/SemiBoldText';
import VerifiedBadge from '../icons/VerifiedBadge';
import RegularText from '../Texts/RegularText';
import Icon from 'react-native-remix-icon';
import BoldText from '../Texts/BoldText';
import {Colors} from '../Colors/Colors';

interface Props {
  name: string;
  subscriptionType: string;
  stars: number;
  price: string;
  imageSource?: any;
  isDarkModeEnabled: boolean;
  onPress?: any;
}

const ClickableImage: React.FC<Props> = ({
  name,
  subscriptionType,
  stars,
  price,
  imageSource,
  isDarkModeEnabled,
  onPress,
}) => {
  const cryptoColor = isDarkModeEnabled ? '#EE06F2' : '#EE06F2';
  const forexColor = isDarkModeEnabled ? '#0665F2' : '#0665F2';
  const stocksColor = isDarkModeEnabled ? '#FFAA00' : '#FFAA00';

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          {imageSource ? (
            <Image source={imageSource} style={styles.image} />
          ) : null}
          <View style={styles.textContainer}>
            <View style={styles.nameContainer}>
              <SemiBoldText textContent={name} />
              {imageSource ? (
                <VerifiedBadge
                  color={isDarkModeEnabled ? Colors?.primary : '#000000'}
                  width={16}
                  height={16}
                />
              ) : null}
            </View>
            <RegularText
              textContent={subscriptionType}
              fontSize={13}
              color="#808080"
            />
            <View style={styles.starsContainer}>
              {[...Array(stars)].map((_, index) => (
                <Icon
                  key={index}
                  name={index < stars - 1 ? 'star-fill' : 'star-half-s-line'}
                  size={14}
                  color={Colors.primary}
                />
              ))}
            </View>
          </View>
        </View>
        {imageSource ? null : (
          <View style={{flexDirection: 'row', gap: 8}}>
            <View
              style={{
                backgroundColor: isDarkModeEnabled ? '#EE06F225' : '#EE06F225',
                paddingVertical: 8,
                width: 68,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 24,
                marginTop: 10,
                paddingHorizontal: 12,
              }}>
              <SemiBoldText
                color={'#EE06F2'}
                textContent="Crypto"
                fontSize={11}
              />
            </View>

            <View
              style={{
                backgroundColor: isDarkModeEnabled ? '#0665F225' : '#0665F225',
                paddingVertical: 8,
                width: 68,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 24,
                marginTop: 10,
                paddingHorizontal: 12,
              }}>
              <SemiBoldText
                color={'#0665F2'}
                textContent="Forex"
                fontSize={11}
              />
            </View>

            <View
              style={{
                backgroundColor: '#FFAA0025',
                paddingVertical: 8,
                width: 68,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 24,
                marginTop: 10,
                paddingHorizontal: 12,
              }}>
              <SemiBoldText
                color={'#FFAA00'}
                textContent="Stocks"
                fontSize={11}
              />
            </View>
          </View>
        )}
      </View>
      <BoldText textContent={price} fontSize={14} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 2,
  },
  contentContainer: {
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  imageContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 12,
  },
  textContainer: {
    flexDirection: 'column',
    gap: 4,
  },
  nameContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    marginBottom: 2,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 3,
    marginTop: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    paddingVertical: 8,
    width: 68,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    paddingHorizontal: 12,
  },
});

export default ClickableImage;
