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

interface NewCustomTextInputProps extends TextInputProps {
  label?: string;
  error?: any;
  secureTextEntry?: boolean;
  fontFamily?: string; // Add fontFamily prop
  fontSize?: number;
  height?: number;
}

const NewCustomTextInput: React.FC<NewCustomTextInputProps> = ({
  label,
  error,
  secureTextEntry,
  fontFamily,
  fontSize,
  height,
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
      <Text
        style={{
          fontFamily: 'Plus Jakarta Sans SemiBold',
          fontWeight:800,
          color: isFocused ? Colors.primary : '#ffffff',
          fontSize: 13,
        }}>
        {label}
      </Text>
      <View
        style={[
          styles.inputWrapper,
          {
            borderColor: isFocused ? Colors.primary : '#ffffff00',
            marginTop: 8,
            borderRadius: 12,
            backgroundColor: '#ffffff10',
          },
        ]}>
        <TextInput
          placeholderTextColor={!isDarkModeEnabled ? '#ffffff85' : '#ffffff85'}
          style={[
            styles.input,
            {
              color: isFocused ? Colors.primary : '#ffffff',
              fontFamily: fontFamily,
              fontSize: fontSize,

              borderRadius: 12,
              paddingLeft: 12,
              height: height ? height : 50,
              alignItems:'center'
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
              color={Colors.white}
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
    //paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#fff',
  },
  eyeIcon: {
    padding: 10,
  },
  errorText: {
    fontSize: 12,
    marginTop: 3,
    marginBottom: 8,
  },
});

export default NewCustomTextInput;
