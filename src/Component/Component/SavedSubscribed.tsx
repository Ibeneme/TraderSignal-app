import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-remix-icon';
import BoldText from '../Texts/BoldText';

interface WalletImageWithDetailsProps {
  isDarkModeEnabled: boolean;
  heartIconColor: string;
  savedTextContent: string;
  onPress?: any;
}

const WalletImageWithDetails: React.FC<WalletImageWithDetailsProps> = ({
  isDarkModeEnabled,
  heartIconColor,
  savedTextContent,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        source={require('../../../assets/images/wallet.png')}
        style={styles.image}
      />
      <View style={styles.detailsContainer}>
        <View style={styles.iconContainer}>
          <View style={[styles.heartIcon, {backgroundColor: '#ffffff25'}]}>
            <Icon
              name={heartIconColor}
              size={24}
              color={isDarkModeEnabled ? '#fff' : '#fff'}
            />
          </View>
        </View>
        <View style={styles.savedTextContainer}>
          <BoldText
            color={isDarkModeEnabled ? '#fff' : heartIconColor}
            textContent={savedTextContent}
            fontSize={16}
          />
          <Icon
            name="arrow-right-line"
            size={24}
            color={isDarkModeEnabled ? '#fff' : heartIconColor}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginVertical: 12,
  },
  image: {
    width: 300,
    height: 150,
    borderRadius: 12,
    marginRight: 16,
  },
  detailsContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    justifyContent: 'space-between',
    height: '65%',
    width: '100%',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  heartIcon: {
    padding: 8,
    width: 40,
    borderRadius: 12,
  },
  savedTextContainer: {
    justifyContent: 'space-between',
    width: '83%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 32,
  },
});

export default WalletImageWithDetails;
