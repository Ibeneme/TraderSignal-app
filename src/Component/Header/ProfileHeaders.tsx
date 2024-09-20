import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-remix-icon';
import {useTheme} from '../../Context/ThemeProvidr';
import {Colors} from '../Colors/Colors';

type ProfileHeadersProps = {
  title?: string;
  hideCart?: boolean;
  goBackTwice?: boolean;
};

const ProfileHeaders: React.FC<ProfileHeadersProps> = ({
  title,
  goBackTwice,
  hideCart,
}) => {
  const navigation = useNavigation();
  const {isDarkModeEnabled, theme, toggleTheme} = useTheme();

  const handleBackPress = () => {
    navigation.goBack();
    if(goBackTwice){
      navigation.goBack();
    navigation.goBack();
    }
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
            backgroundColor: '#ffaa0025',
            borderRadius: 64,

            width: 32,
            height: 32,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="arrow-left-s-line" size={18} color={Colors?.primary} />
        </TouchableOpacity>

        <View>
          {/* <Text
            style={{
              fontFamily: 'Plus Jakarta Sans SemiBold',
              fontSize: 16,
              marginVertical: 4,
              marginBottom: 32,
              color: '#fff',
            }}>
            Ibeneme Ikenna 
          </Text>*/}
        </View>
      </View>

      {/* <TouchableOpacity onPress={toggleTheme} style={styles.toggleIcon}>
        <Icon
          name={!isDarkModeEnabled ? 'ri-moon-fill' : 'sun-line'}
          size={24}
          color={isDarkModeEnabled ? Colors?.primary : '#121212'}
        />
      </TouchableOpacity> */}
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
  );
};

export default ProfileHeaders;
