import React from 'react';
import { View } from 'react-native';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
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
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

const ProfileUpdatePage: React.FC = () => {
  const initialValues: FormValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  };

  const validationSchema = yup.object().shape({
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup.string().email('Invalid email'),
    phoneNumber: yup.string(),
  });

  const navigation = useNavigation();

  const renderError = (fieldName: keyof FormValues, errors: any) => {
    return (
      errors[fieldName] && (
        <View style={{ marginTop: -20, marginBottom: 13 }}>
          <RegularText
            //color={Colors.primary}
            fontSize={13}
            textContent={errors[fieldName]}
          />
        </View>
      )
    );
  };

  const onSubmit = (values: FormValues) => {
    console.log(values);
    // Logic to update user profile
  };

  return (
    <SafeArea>
      <View style={{ backgroundColor: 'white', height: '100%' }}>
        <MainHeader />
        <BodyView>
          <AuthTitleText
            text="Update your Profile"
            title="Profile Update"
            icon={<Icon name="user-fill" size={20} color={Colors.white} />}
            marginTop={24}
            ctaText=''
          />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({ handleSubmit, setFieldValue, errors }) => (
              <View>
                <Field
                  component={CustomTextInput}
                  name="firstName"
                  label="First Name"
                  placeholder="Enter first name"
                  onChangeText={(value: string) =>
                    setFieldValue('firstName', value)
                  }
                  fontFamily="Plus Jakarta Sans SemiBold"
                  fontSize={13}
                />
                {renderError('firstName', errors)}

                <Field
                  component={CustomTextInput}
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter last name"
                  onChangeText={(value: string) =>
                    setFieldValue('lastName', value)
                  }
                  fontFamily="Plus Jakarta Sans SemiBold"
                  fontSize={13}
                />
                {renderError('lastName', errors)}

                <Field
                  component={CustomTextInput}
                  name="email"
                  label="Email Address"
                  placeholder="Enter email address"
                  onChangeText={(value: string) =>
                    setFieldValue('email', value)
                  }
                  fontFamily="Plus Jakarta Sans SemiBold"
                  fontSize={13}
                />
                {renderError('email', errors)}

                <Field
                  component={CustomTextInput}
                  name="phoneNumber"
                  label="Phone Number"
                  placeholder="Enter phone number"
                  onChangeText={(value: string) =>
                    setFieldValue('phoneNumber', value)
                  }
                  fontFamily="Plus Jakarta Sans SemiBold"
                  fontSize={13}
                />
                {renderError('phoneNumber', errors)}

                <FullBtn buttonText="Submit" onPress={handleSubmit} />
              </View>
            )}
          </Formik>

          <View style={{ marginBottom: 48 }}></View>
        </BodyView>
      </View>
    </SafeArea>
  );
};

export default ProfileUpdatePage;
