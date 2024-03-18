import React from 'react';
import {View} from 'react-native';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import BodyView from '../../Component/SafeAreaViewCustom/BodyView';
import MainHeader from '../../Component/Header/MainHeaders';
import SafeArea from '../../Component/SafeAreaViewCustom/SafeArea';
import FullBtn from '../../Component/Buttons/FullBtn';
import AuthTitleText from '../../Component/Header/AuthTitle.tsx/AuthTitle';
import Icon from 'react-native-remix-icon';
import {Colors} from '../../Component/Colors/Colors';
import RegularText from '../../Component/Texts/RegularText';
import {useNavigation} from '@react-navigation/native';
import CustomDropdown from '../../Component/CustomInputs/CustomDropdown';
import Clickable from '../../Component/Component/Clickable';

const WhatBringsYouHerePage: React.FC = () => {
  const initialValues = {
    selectedOption: '',
  };

  const validationSchema = yup.object().shape({
    selectedOption: yup.string().required('Please select an option'),
  });

  const navigation = useNavigation();

  const handleSelectOption = (option: string, setFieldValue: Function) => {
    setFieldValue('selectedOption', option); // Set the selected option using Formik's setFieldValue function
  };

  const renderError = (errors: any) => {
    return (
      errors.selectedOption && (
        <View style={{marginTop: 4, marginBottom: 13}}>
          <RegularText
            color={Colors.primary}
            fontSize={13}
            textContent={errors.selectedOption}
          />
        </View>
      )
    );
  };

  const onSubmit = (values: any) => {
    console.log(values.selectedOption);
    navigation.navigate('KYCOptionsPage' as never); // Handle the selected option on form submission
    // Add navigation logic based on selected option
  };

  return (
    <SafeArea>
      <View style={{backgroundColor: 'white', height: '100%'}}>
        <MainHeader />
        <BodyView>
          <AuthTitleText
            text="Welcome!, What brings you here?"
            title="What brings you here?"
            icon={<Icon name="question" size={20} color={Colors.white} />}
            marginTop={24}
            ctaText=""
          />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({handleSubmit, errors, setFieldValue}) => (
              <View>
                <Field
                  component={CustomDropdown}
                  name="selectedOption"
                  label="Select Option"
                  options={['Access trading signals', 'Be a signal provider']}
                  onSelect={(option: string) =>
                    handleSelectOption(option, setFieldValue)
                  }
                />
                {renderError(errors)}
                <FullBtn buttonText="Continue" onPress={handleSubmit} />
              </View>
            )}
          </Formik>
          <View style={{marginBottom: 48}}></View>
        </BodyView>
      </View>
    </SafeArea>
  );
};

export default WhatBringsYouHerePage;
