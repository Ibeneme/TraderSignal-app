import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-remix-icon';
import {useTheme} from '../../Context/ThemeProvidr';
import {Colors} from '../Colors/Colors';

interface CustomDropdownProps {
  label?: string;
  options: string[];
  onSelect: (option: string) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  options,
  onSelect,
}) => {
  const {isDarkModeEnabled, theme} = useTheme();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>(''); // State to hold selected option
  const {fontScale} = useWindowDimensions();
  const [isFocused, setIsFocused] = useState<boolean>(false); // State to track focus

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    console.log('FOCUS');
    setIsFocused(true);
  };

  return (
    <View style={styles.dropdownContainer}>
      <Text style={[styles.label, {color: theme.text}]}>{label}</Text>
      <TouchableOpacity
        style={[
          styles.dropdownWrapper,
          {
            borderColor: isFocused
              ? Colors.primary
              : isDarkModeEnabled
              ? '#ffffff45'
              : '#12121245',
          },
        ]}
        onPress={toggleVisibility}
        onFocus={() => {
          console.log('FOCUS');
          setIsFocused(true);
        }} // Set isFocused to true when focused
        onBlur={() => setIsFocused(false)}>
        <Text
          style={[
            styles.selectedOption,
            {
              color: isFocused
                ? Colors.primary
                : isDarkModeEnabled
                ? '#fff'
                : '#121212',
            },
            ,
          ]}>
          {selectedOption ? selectedOption : 'Select Option'}
        </Text>
        <Icon
          name="arrow-down-s-line"
          size={20}
          color={
            isFocused
              ? Colors.primary
              : !isDarkModeEnabled
              ? Colors.black
              : Colors.white
          }
        />
      </TouchableOpacity>
      {isVisible && (
        <View
          style={[
            styles.optionsContainer,
            {backgroundColor: theme.background},
          ]}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionItem}
              onPress={() => {
                setSelectedOption(option); // Set selected option
                onSelect(option);
                toggleVisibility();
                setIsFocused(false);
              }}>
              <Text
                style={[
                  styles.optionText,
                  {color: theme.text, fontSize: 14 * fontScale},
                ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    marginTop: 16,
    width: '100%',
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    fontFamily: 'Plus Jakarta Sans SemiBold',
  },
  dropdownWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    height: 50,
  },
  selectedOption: {
    flex: 1,
    fontFamily: 'Plus Jakarta Sans Regular',
  },
  optionsContainer: {
    marginTop: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 5,
  },
  optionItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Plus Jakarta Sans Regular',
    paddingVertical: 5,
  },
});

export default CustomDropdown;
