import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-remix-icon';
import {useTheme} from '../../Context/ThemeProvidr';
import {Colors} from '../Colors/Colors';
import {getCurrentUser} from '../../Redux/Profile/Profile';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../Redux/Store/Store';

type SubHeadersProps = {
  title?: string;
  hideCart?: boolean;
  goBackTwice?: boolean;
  GroupName: string;
  count: number;
  id: any;
  creator?: string;
};

const SubHeaders: React.FC<SubHeadersProps> = ({
  title,
  goBackTwice,
  hideCart,
  GroupName,
  count,
  id,
  creator,
}) => {
  const navigation = useNavigation();
  const {isDarkModeEnabled, theme, toggleTheme} = useTheme();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const trimGroupName = (name: string, maxLength: number) => {
    return name?.length > maxLength
      ? `${name?.substring(0, maxLength)}...`
      : name;
  };
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState([]);
  useEffect(() => {
    dispatch(getCurrentUser())
      .then(response => {
        setUser(response?.payload);
        // Handle successful user data fetch
      })
      .catch(error => {
        console.error('Error fetching user:', error); // Log the error for debugging
      });
  }, []);
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
        {goBackTwice ? null : (
          <View>
            <Text
              style={{
                fontFamily: 'Plus Jakarta Sans SemiBold',
                color: '#fff',
                fontSize: 14,
                fontWeight:900,
              }}>
              {trimGroupName(GroupName, 25)}
            </Text>
            <Text
              style={{
                fontFamily: 'Plus Jakarta Sans SemiBold',
                fontWeight:900,
                color: '#ffffff85',
                fontSize: 10,
                marginTop: 3,
              }}>
              {count} Subscribers
            </Text>
          </View>
        )}
      </View>

      {user?.user?._id === creator ? (
        goBackTwice ? (
          <TouchableOpacity
            style={{
              padding: 8,
              backgroundColor: '#ffaa0045',
              borderRadius: 64,
              paddingHorizontal: 16,
              flexDirection: 'row',
              gap: 8,
            }}
            onPress={() => navigation.navigate('EditSubScreen', {id: id})}>
            <Text
              style={{
                fontFamily: 'Plus Jakarta Sans SemiBold',
                color: '#ffaa00',
                fontSize: 12,
              }}>
              Edit
            </Text>
            <Icon name="pencil-line" size={16} color={Colors?.primary} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              padding: 8,
              backgroundColor: '#ffaa0045',
              borderRadius: 64,
              paddingHorizontal: 16,
            }}
            onPress={() => navigation.navigate('GetSubUsers', {id: id})}>
            <Text
              style={{
                fontFamily: 'Plus Jakarta Sans SemiBold',
                color: '#ffaa00',
                fontSize: 12,
              }}>
              View
            </Text>
          </TouchableOpacity>
        )
      ) : null}
    </View>
  );
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

export default SubHeaders;
