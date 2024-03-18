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
  otp: string;
}

const OTPScreen: React.FC = () => {
  const initialValues: FormValues = {
    otp: '',
  };

  const validationSchema = yup.object().shape({
    otp: yup
      .string()
      .matches(/^[0-9]{6}$/, 'OTP must be 6 digits')
      .required('OTP is required'),
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
    // Handle OTP submission
    navigation.navigate('WhatBringsYouHerePage' as never)
  };

  return (
    <SafeArea>
      <View style={{backgroundColor: 'white', height: '100%'}}>
        <MainHeader />
        <BodyView>
          <AuthTitleText
            text="Verify Your Account"
            title="Enter the 6-digit code sent to your email address"
            icon={<Icon name="lock" size={20} color={Colors.white} />}
            marginTop={24}
            ctaText=""
          />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {(
              {handleSubmit, handleChange, errors}, // added handleChange
            ) => (
              <View>
                <Field
                  component={CustomTextInput}
                  name="otp"
                  label="OTP"
                  placeholder="Enter OTP"
                  keyboardType="numeric"
                  maxLength={6}
                  onChangeText={handleChange('otp')} // added onChangeText
                  fontFamily="Plus Jakarta Sans SemiBold"
                  fontSize={13}
                />
                {renderError('otp', errors)}

                <View
                  style={{
                    width: '100%',
                    alignItems: 'flex-end',
                    //backgroundColor: '#ff00aa',
                  }}>
                  <RegularText
                    fontSize={13}
                    textContent="Resend OTP"
                    onPress={
                      () => console.log('Resend')
                      //navigation.navigate('ForgotPasswordScreen' as never)
                    }
                  />
                </View>

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

export default OTPScreen;
