import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-remix-icon';
import { useTheme } from '../../Context/ThemeProvidr';
import { Colors } from '../Colors/Colors';

interface MultipleDropdownProps {
  label?: string;
  options: string[];
  onSelect: (selectedOptions: string[]) => void; // Modified to pass an array of selected options
  error?: string;
}

const MultipleDropdown: React.FC<MultipleDropdownProps> = ({
  label,
  options,
  onSelect,
  error,
}) => {
  const { isDarkModeEnabled, theme } = useTheme();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // State to hold multiple selected options
  const { fontScale } = useWindowDimensions();
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    setIsFocused(true);
  };

  const handleOptionSelect = (option: string) => {
    const isSelected = selectedOptions.includes(option);
    let updatedSelectedOptions: string[];

    if (isSelected) {
      // If option is already selected, remove it
      updatedSelectedOptions = selectedOptions.filter(
        (selected) => selected !== option
      );
    } else {
      // If option is not selected, add it
      updatedSelectedOptions = [...selectedOptions, option];
    }

    setSelectedOptions(updatedSelectedOptions); // Update the selected options state
    onSelect(updatedSelectedOptions); // Call the onSelect prop with the updated array
    console.log('Selected Options:', updatedSelectedOptions); // Log the selected options array
  };

  const isOptionSelected = (option: string) =>
    selectedOptions.includes(option);

  return (
    <View style={styles.dropdownContainer}>
      <Text
        style={[
          styles.label,
          { color: isFocused ? Colors.primary : '#fff', fontWeight: '900' },
        ]}
      >
        {label}
      </Text>
      <TouchableOpacity
        style={[
          styles.dropdownWrapper,
          {
            borderColor: isFocused
              ? Colors.primary
              : isDarkModeEnabled
              ? '#ffffff00'
              : '#ffffff00',
            backgroundColor: '#ffffff10',
            borderRadius: 12,
          },
        ]}
        onPress={toggleVisibility}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <Text
          style={[
            styles.selectedOption,
            {
              color: isFocused ? Colors.primary : '#fff',
            },
          ]}
        >
          {selectedOptions.length > 0
            ? selectedOptions.join(', ') // Display all selected options, separated by commas
            : 'Select Options'}
        </Text>
        <Icon
          name="arrow-down-s-line"
          size={20}
          color={isFocused ? Colors.primary : '#fff'}
        />
      </TouchableOpacity>
      {isVisible && (
        <View
          style={[
            styles.optionsContainer,
            { backgroundColor: Colors.newBG, borderRadius: 12, marginTop: 10 },
          ]}
        >
          {options?.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionItem}
              onPress={() => handleOptionSelect(option)}
            >
              <Text
                style={[
                  styles.optionText,
                  {
                    color: isOptionSelected(option) ? Colors.primary : '#fff',
                    fontSize: 14 * fontScale,
                  },
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <Text
        style={[
          styles.errorText,
          { color: Colors.primary, fontFamily: 'Plus Jakarta Sans Regular' },
        ]}
      >
        {error}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    marginTop: 16,
    width: '100%',
  },
  errorText: {
    fontSize: 12,
    marginTop: 3,
    marginBottom: 8,
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
    borderColor: '#ffaa00',
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

export default MultipleDropdown;