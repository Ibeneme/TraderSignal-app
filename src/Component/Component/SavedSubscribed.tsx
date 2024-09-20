import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-remix-icon';
import BoldText from '../Texts/BoldText';

interface WalletImageWithDetailsProps {
  isDarkModeEnabled: boolean;
  heartIconColor: string;
  savedTextContent: string;
  onPress?: any;
  imageUrl?: any;
  savedTextContentTitle?: any;
  savedTextContentTitleMain?: any;
}

const WalletImageWithDetails: React.FC<WalletImageWithDetailsProps> = ({
  isDarkModeEnabled,
  heartIconColor,
  savedTextContent,
  onPress,
  imageUrl,
  savedTextContentTitle,
  savedTextContentTitleMain,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={imageUrl} style={styles.image} />
      <View style={styles.detailsContainer}>
        <View style={styles.iconContainer}>
          <View style={[styles.heartIcon, {backgroundColor: '#ffffff65'}]}>
            <Icon
              name={heartIconColor}
              size={18}
              color={isDarkModeEnabled ? '#fff' : '#fff'}
            />
          </View>
        </View>
        <View style={styles.savedTextContainer}>
          <View style={{marginLeft: 12}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                // backgroundColor: '#ffffff55',
                // width: 180,
                // padding: 8,
                // borderColor: '#fff',
                // borderWidth: 1,
                // borderRadius: 43,
                width: 274,
              }}>
              <Text
                style={{
                  fontFamily: 'Plus Jakarta Sans SemiBold',
                  fontSize: 12,
                  color: '#fff',
                  textAlign: 'center',
                }}>
                {savedTextContentTitleMain.slice(0, 24)}....
              </Text>

              <Text
                style={{
                  fontFamily: 'Plus Jakarta Sans Bold',
                    fontWeight:900,
                  fontSize: 12,
                  color: '#fff',
                  textAlign: 'left',
                  marginLeft: 12,
                }}>
                {savedTextContent}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: 'Plus Jakarta Sans Bold',
                  fontWeight:900,
                fontSize: 16,
                color: '#fff',
                textAlign: 'left',
                // marginLeft: 12,
              }}>
              ${savedTextContentTitle}
            </Text>
            {/* <Icon
            name="arrow-right-line"
            size={24}
            color={isDarkModeEnabled ? '#fff' : heartIconColor}
          /> */}
          </View>
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
    width: 340,
    height: 80,
    borderRadius: 12,
    marginRight: 8,
  },
  detailsContainer: {
    position: 'absolute',
    top: 15,
    left: 12,
    justifyContent: 'space-between',
    height: '65%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  heartIcon: {
    padding: 8,
    width: 32,
    borderRadius: 12,
  },
  savedTextContainer: {
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    fontSize: 13,
    //marginTop: 32,
  },
});

export default WalletImageWithDetails;
