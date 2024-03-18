import React from 'react';
import { View } from 'react-native';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import CustomTextInput from '../../Component/CustomInputs/CustomTextInput';
import BodyView from '../../Component/SafeAreaViewCustom/BodyView';
import MainHeader from '../../Component/Header/MainHeaders';
import SafeArea from '../../Component/SafeAreaViewCustom/SafeArea';
import FullBtn from '../../Component/Buttons/FullBtn';
import AuthTitleText from '../../Component/Header/AuthTitle.tsx/AuthTitle';
import Icon from 'react-native-remix-icon';
import { Colors } from '../../Component/Colors/Colors';
import RegularText from '../../Component/Texts/RegularText';
import { useNavigation } from '@react-navigation/native';

interface FormValues {
  email: string;
}

const ForgotPasswordScreen: React.FC = () => {
  const initialValues: FormValues = {
    email: '',
  };
  const navigation = useNavigation();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
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

  const onSubmit = (values: FormValues) => {
    console.log(values);
    navigation.navigate('ResetOTPScreen' as never);
  };

  return (
    <SafeArea>
      <View style={{backgroundColor: 'white', height: '100%'}}>
        <MainHeader />
        <BodyView>
          <AuthTitleText
            title="Forgot Password?"
            text="Enter your email"
            icon={<Icon name="email" size={20} color={Colors.white} />}
            marginTop={24}
            ctaText=""
          />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({handleSubmit, errors, handleChange}) => ( // added handleChange here
              <View>
                <Field
                  component={CustomTextInput}
                  name="email"
                  label="Email Address"
                  placeholder="Enter email address"
                  fontFamily="Plus Jakarta Sans SemiBold"
                  fontSize={13}
                  onChangeText={handleChange('email')} // added onChangeText
                />
                {renderError('email', errors)}
                <FullBtn buttonText="Submit" onPress={handleSubmit} />
              </View>
            )}
          </Formik>
          <View style={{marginBottom: 48}}></View>
        </BodyView>
      </View>
    </SafeArea>
  );
};

export default ForgotPasswordScreen;
