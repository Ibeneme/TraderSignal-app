import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-remix-icon';
import {useTheme} from '../../Context/ThemeProvidr';
import {Colors} from '../Colors/Colors';

type MainHeaderProps = {
  title?: string;
  hideCart?: boolean;
  goBackTwice?: boolean;
};

const MainHeader: React.FC<MainHeaderProps> = ({
  title,
  goBackTwice,
  hideCart,
}) => {
  const navigation = useNavigation();
  const {isDarkModeEnabled, theme, toggleTheme} = useTheme();

  const handleBackPress = () => {
    navigation.goBack();
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
        },
        {},
      ]}>
      {goBackTwice ? null : (
        <TouchableOpacity
          onPress={handleBackPress}
          style={{
            padding: 6,
            backgroundColor: '#ffaa0017',
            borderRadius: 64,
          }}>
          <Icon name="arrow-left-s-line" size={24} color={Colors?.primary} />
        </TouchableOpacity>
      )}

      {title ? (
        <Text
          style={{
            color: '#FFAA00',
            fontFamily: 'Plus Jakarta Sans Bold',
            fontWeight:900,
            fontSize: 16,
            marginTop: 8,
          }}>
          {title}
        </Text>
      ) : null}
      <TouchableOpacity
        onPress={toggleTheme}
        style={[styles.toggleIcon, {opacity: 0.0}]}>
        <Icon
          name={!isDarkModeEnabled ? 'ri-moon-fill' : 'sun-line'}
          size={24}
          color={isDarkModeEnabled ? Colors?.primary : '#121212'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default MainHeader;
