import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {useTheme} from '../../Context/ThemeProvidr';
import {Colors} from '../Colors/Colors';
import BoldText from '../Texts/BoldText';
import SemiBoldText from '../Texts/SemiBoldText';
import RegularText from '../Texts/RegularText';

interface ClickableProps {
  text: string;
  title: string;
  marginTop?: number;
  icon?: React.ReactNode;
  onPress?: () => void;
  ctaText?: string;
  iconArrow?: React.ReactNode;
  display?: boolean;
  isDebit?: boolean; // New prop to indicate whether it's a debit transaction
}

const Clickable: React.FC<ClickableProps> = ({
  text,
  marginTop,
  title,
  icon,
  onPress,
  ctaText,
  iconArrow,
  display,
  isDebit, // Default value is false
}) => {
  const {isDarkModeEnabled, theme} = useTheme();
  const {width, fontScale} = useWindowDimensions();
  const textColor = isDarkModeEnabled ? '#fff' : '#121212';
  //   const iconColor = isDebit ? 'red' : Colors.primary; // Set icon color based on whether it's a debit transaction

  return (
    <TouchableOpacity onPress={onPress} style={{width: '100%'}}>
      <View style={[styles.container]}>
        <View style={styles.iconTextContainer}>
          <View style={{gap: 8, flexDirection: 'row'}}>
            {icon ? (
              <View
                style={{
                  backgroundColor: isDebit // Default value is false
                    ? '#FF000025'
                    : '#ffaa0035',
                  padding: 8,
                  borderRadius: 444,
                  display: display ? 'flex' : 'none',
                  height: 48,
                  width: 48,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {icon}
              </View>
            ) : null}
            <View style={[styles.titleContainer]}>
              <BoldText fontSize={14} textContent={`${title}`} />
              <TouchableOpacity style={{flexDirection: 'row'}}>
                <RegularText
                  fontSize={13}
                  color={'#808080'}
                  textContent={`${text}`}
                />
                {ctaText ? (
                  <RegularText
                    fontSize={13}
                    color={textColor}
                    textContent={`${ctaText}`}
                  />
                ) : null}
              </TouchableOpacity>
            </View>
          </View>
          {iconArrow ? (
            <View
              style={{
                backgroundColor: isDebit // Default value is false
                  ? '#FF000025'
                  : '#ffaa0035',
                padding: 6,
                borderRadius: 444,
                // marginRight: -12,
              }}>
              {iconArrow}
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    /// marginBottom: 10,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
    marginVertical: 14,
  },
  titleContainer: {
    alignSelf: 'flex-start',
    gap: 4,
  },
});

export default Clickable;
