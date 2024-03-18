import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import Icon from 'react-native-remix-icon';
import {Colors} from '../Colors/Colors';
import {useTheme} from '../../Context/ThemeProvidr';
import SemiBoldText from '../Texts/SemiBoldText';
import BoldText from '../Texts/BoldText';

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  secureTextEntry?: boolean;
  fontFamily?: string; // Add fontFamily prop
  fontSize?: number;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  error,
  secureTextEntry,
  fontFamily,
  fontSize,
  ...props
}) => {
  const {isDarkModeEnabled, theme} = useTheme();
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <View style={styles.inputContainer}>
      <SemiBoldText textContent={`${label}`}  fontSize={14}/>
      <View
        style={[
          styles.inputWrapper,
          {
            borderColor: isFocused
              ? Colors.primary
              : isDarkModeEnabled
              ? '#ffffff45'
              : '#12121245',
              marginTop: 8
          },
        ]}>
        <TextInput
          placeholderTextColor={!isDarkModeEnabled ? '#12121245' : '#ffffff45'}
          style={[
            styles.input,
            {
              color: isDarkModeEnabled ? '#fff' : '#121212',
              fontFamily: fontFamily,
              fontSize: fontSize,
            },
          ]}
          secureTextEntry={secureTextEntry && hidePassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.eyeIcon}>
            <Icon
              name={hidePassword ? 'eye-2-line' : 'eye-2-fill'}
              size={20}
              color={!isDarkModeEnabled ? Colors.black : Colors.white}
            />
          </TouchableOpacity>
        )}
      </View>

      <Text
        style={[
          styles.errorText,
          {color: Colors.primary, fontFamily: fontFamily},
        ]}>
        {error}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 16,
    width: '100%',
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 50,
  },
  eyeIcon: {
    padding: 10,
  },
  errorText: {
    fontSize: 14,
    marginTop: 3,
    marginBottom: 8,
  },
});

export default CustomTextInput;
