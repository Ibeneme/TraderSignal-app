import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-remix-icon';
import {useTheme} from '../../Context/ThemeProvidr';
import {Colors} from '../Colors/Colors';

type HomeHeadersProps = {
  title?: string;
  hideCart?: boolean;
  goBackTwice?: boolean;
};

const HomeHeaders: React.FC<HomeHeadersProps> = ({
  title,
  goBackTwice,
  hideCart,
}) => {
  const navigation = useNavigation();
  const {isDarkModeEnabled, theme, toggleTheme} = useTheme();

  const handleBackPress = () => {
    navigation.navigate('NewProfileScreen' as never);
  };

  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      padding: 12,
      paddingRight: 18,
      borderBottomWidth: 1,
      borderBottomColor: Colors?.primary,
      width: '100%',
      justifyContent: 'space-between',
    },
    toggleIcon: {
      padding: 4,
    },
  });

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: Colors.newBG,
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        {},
      ]}>
      <View
        style={{
          flexDirection: 'row',
          gap: 12,
        }}>
        <TouchableOpacity
          onPress={handleBackPress}
          style={{
            padding: 12,
            backgroundColor: '#ffaa0017',
            borderRadius: 64,
            borderWidth: 2,
            borderColor: Colors.primary,
            width: 20,
            height: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="user-line" size={16} color={Colors?.primary} />
        </TouchableOpacity>
      </View>
      <View>
        {/* <Image
          source={require('../../../assets/images/logo.jpg')} // Replace './path/to/your/image.jpg' with the path to your image in the assets folder
          style={{width: 24, height: 24, borderRadius: 24}} // Set width and height as per your requirement
        /> */}
      </View>
      {/* <TouchableOpacity onPress={toggleTheme} style={styles.toggleIcon}>
        <Icon
          name={!isDarkModeEnabled ? 'ri-moon-fill' : 'sun-line'}
          size={24}
          color={isDarkModeEnabled ? Colors?.primary : '#121212'}
        />
      </TouchableOpacity> */}
      <View style={{flexDirection: 'row', gap: 12}}>
        <View></View>
        <TouchableOpacity
          onPress={() => navigation.navigate('MySubs' as never)}
          style={{
            padding: 8,
            backgroundColor: '#ffaa0017',
            borderRadius: 64,
          }}>
          <Icon name="notification-fill" size={20} color={Colors?.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeaders;
