import React from 'react';
import {View} from 'react-native';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import CustomTextInput from '../../Component/CustomInputs/CustomTextInput';
import BodyView from '../../Component/SafeAreaViewCustom/BodyView';
import MainHeader from '../../Component/Header/MainHeaders';
import SafeArea from '../../Component/SafeAreaViewCustom/SafeArea';
import FullBtn from '../../Component/Buttons/FullBtn';
import AuthTitleText from '../../Component/Header/AuthTitle.tsx/AuthTitle';
import Icon from 'react-native-remix-icon';
import {Colors} from '../../Component/Colors/Colors';
import RegularText from '../../Component/Texts/RegularText';
import {useNavigation} from '@react-navigation/native';

interface FormValues {
  email: string;
  password: string;
}

const LoginScreen: React.FC = () => {
  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const renderError = (fieldName: keyof FormValues, errors: any) => {
    return (
      errors[fieldName] && (
        <View style={{marginTop: -20, marginBottom: 13}}>
          <RegularText
            color={Colors.primary}
            fontSize={13}
            textContent={errors[fieldName]}
          />
        </View>
      )
    );
  };
  const navigation = useNavigation();
  const onSubmit = (values: FormValues) => {
    console.log(values);
    navigation.navigate('OTPScreen' as never);
  };

  return (
    <SafeArea>
      <View style={{backgroundColor: 'white', height: '100%'}}>
        <MainHeader goBackTwice />
        <BodyView>
          <AuthTitleText
            text="Don't have an account?"
            title="Log In"
            icon={<Icon name="user-fill" size={20} color={Colors.white} />}
            marginTop={24}
            ctaText="Create Account"
            onPress={() => navigation.navigate('CreateAccount' as never)}
          />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({handleChange, handleSubmit, errors}) => (
              <View>
                <Field
                  component={CustomTextInput}
                  name="email"
                  label="Email Address"
                  placeholder="Enter email address"
                  onChangeText={handleChange('email')} // Use handleChange for email field
                  fontFamily="Plus Jakarta Sans SemiBold"
                  fontSize={13}
                />
                {renderError('email', errors)}
                <Field
                  component={CustomTextInput}
                  name="password"
                  label="Password"
                  placeholder="Enter password"
                  secureTextEntry
                  onChangeText={handleChange('password')} // Use handleChange for password field
                  fontFamily="Plus Jakarta Sans SemiBold"
                  fontSize={13}
                />
                {renderError('password', errors)}

                <View
                  style={{
                    width: '100%',
                    alignItems: 'flex-end',
                    //backgroundColor: '#ff00aa',
                  }}>
                  <RegularText
                    fontSize={13}
                    textContent="Forgot Password?"
                    onPress={() =>
                      navigation.navigate('ForgotPasswordScreen' as never)
                    }
                  />
                </View>
                <FullBtn buttonText="Login" onPress={handleSubmit} />
              </View>
            )}
          </Formik>
          <View style={{marginBottom: 48}}></View>
        </BodyView>
      </View>
    </SafeArea>
  );
};

export default LoginScreen;
