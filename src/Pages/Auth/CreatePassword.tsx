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
  password: string;
  confirmPassword: string;
}

const CreatePasswordScreen: React.FC = () => {
  const initialValues: FormValues = {
    password: '',
    confirmPassword: '',
  };

  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .required('Password is required')
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?!.*\s).{8,}$/,
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character',
      ),
    confirmPassword: yup
      .string()
      .required('Confirm Password is required')
      .oneOf([yup.ref('password')], 'Passwords must match'),
  });

  const navigation = useNavigation();

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
    // Add your logic to handle password submission here
  };

  return (
    <SafeArea>
      <View style={{backgroundColor: 'white', height: '100%'}}>
        <MainHeader />
        <BodyView>
          <AuthTitleText
            text="Create New Password"
            title="Create Password"
            icon={<Icon name="lock" size={20} color={Colors.white} />}
            marginTop={24}
            ctaText=""
          />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({handleChange, handleSubmit, errors}) => (
              <View>
                <Field
                  component={CustomTextInput}
                  name="password"
                  label="Password"
                  placeholder="Enter password"
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  fontFamily="Plus Jakarta Sans SemiBold"
                  fontSize={13}
                />
                {renderError('password', errors)}
                <Field
                  component={CustomTextInput}
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Confirm password"
                  secureTextEntry
                  onChangeText={handleChange('confirmPassword')}
                  fontFamily="Plus Jakarta Sans SemiBold"
                  fontSize={13}
                />
                {renderError('confirmPassword', errors)}

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

export default CreatePasswordScreen;
