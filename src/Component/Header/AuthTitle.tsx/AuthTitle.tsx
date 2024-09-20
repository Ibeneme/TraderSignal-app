import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {useTheme} from '../../../Context/ThemeProvidr';
import {Colors} from '../../Colors/Colors';
import BoldText from '../../Texts/BoldText';
import RegularText from '../../Texts/RegularText';
import SemiBoldText from '../../Texts/SemiBoldText';

interface AuthTitleTextProps {
  text: string;
  title: string;
  marginTop?: number;
  icon: React.ReactNode;
  onPress?: () => void;
  ctaText: string;
}

const AuthTitleText: React.FC<AuthTitleTextProps> = ({
  text,
  marginTop,
  title,
  icon,
  onPress,
  ctaText,
}) => {
  const {isDarkModeEnabled, theme} = useTheme(); // Use the useTheme hook
  const {width, fontScale} = useWindowDimensions();
  const textColor = isDarkModeEnabled ? '#fff' : '#fff';

  return (
    <View>
      <View style={[styles.container, {marginTop: marginTop}]}>
        <View style={styles.iconTextContainer}>
          <View
            style={{
              backgroundColor: isDarkModeEnabled
                ? Colors.primary
                : Colors.primary,
              padding: 8,
              borderRadius: 444,
              display: 'none',
              //marginTop: -6,
            }}>
            {icon}
          </View>
          <View style={[styles.titleContainer]}>
            <BoldText textContent={`${title}`} />
            <TouchableOpacity style={{flexDirection: 'row'}} onPress={onPress}>
              <Text
                style={{
                  color: textColor,
                  fontFamily: 'Plus Jakarta Sans Regular',
                  fontSize: 13 * fontScale,
                 
                }}>
                {text} {''}
                {''}
                {''}
                <Text
                  style={{
                    color: Colors?.primary,
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                    fontSize: 13 * fontScale,
                    
                  }}>
                  {''} {ctaText}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    paddingVertical: 24,
    //padding: 16,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    gap: 12,
    marginVertical: 12,
  },

  titleContainer: {
    alignSelf: 'flex-start',
    gap: 4,
  },
});

export default AuthTitleText;
