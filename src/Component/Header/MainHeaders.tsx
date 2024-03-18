import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
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
      borderBottomColor: isDarkModeEnabled ? Colors?.primary : '#12121245',
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
          backgroundColor: isDarkModeEnabled ? theme.background : '#fff',
        },
        {},
      ]}>
      {goBackTwice ? null : (
        <TouchableOpacity onPress={handleBackPress}>
          <Icon name="arrow-left-s-line" size={24} color={theme.text} />
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={toggleTheme} style={styles.toggleIcon}>
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
