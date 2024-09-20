import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import MainHeader from '../../Component/Header/MainHeaders';
import SafeArea from '../../Component/SafeAreaViewCustom/SafeArea';
import FullBtn from '../../Component/Buttons/FullBtn';
import AuthTitleText from '../../Component/Header/AuthTitle.tsx/AuthTitle';
import Icon from 'react-native-remix-icon';
import {Colors} from '../../Component/Colors/Colors';
import SemiBoldText from '../../Component/Texts/SemiBoldText';
import BodyView from '../../Component/SafeAreaViewCustom/BodyView';
import {useNavigation} from '@react-navigation/native';
import CustomDropdown from '../../Component/CustomInputs/CustomDropdown';
import NewCustomTextInput from '../../Component/CustomInputs/NewCustomTextInput';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../Redux/Store/Store';
import {
  getCurrentUser,
  getUserProfile,
  updateUser,
} from '../../Redux/Profile/Profile';
import MultipleDropdown from '../../Component/CustomInputs/MulitpleDropdown';

const GetStartedScreen: React.FC = () => {
  const initialValues = {
    selectedNiches: [],
    bio: '',
    clearDescriptionOfStrategy: '',
    riskProfile: '', // For dropdown selection
    breakdownsSubscriptionsBenefits: '',
  };

  const validationSchema = yup.object().shape({
    selectedNiches: yup
      .array()
      .min(1, 'Please select at least one niche')
      .required('Please select a niche'),
    bio: yup.string(),
    clearDescriptionOfStrategy: yup
      .string()
      .required('Strategy description is required'),
    riskProfile: yup.string().required('Risk profile is required'),
    breakdownsSubscriptionsBenefits: yup
      .string()
      .required('Please describe the benefits breakdown'),
  });

  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.profile.user);

  const handleSelectNiche = (niches: string[], setFieldValue: Function) => {
    setFieldValue('selectedNiches', niches);
  };

  const handleSelectRiskProfile = (
    riskProfile: string,
    setFieldValue: Function,
  ) => {
    setFieldValue('riskProfile', riskProfile); // Set the single selected value
  };

  const onSubmit = (values: any) => {
    console.log({
      selectedNiches: values.selectedNiches,
      bio: values.bio,
      clearDescriptionOfStrategy: values.clearDescriptionOfStrategy,
      riskProfile: values.riskProfile,
      breakdownsSubscriptionsBenefits: values.breakdownsSubscriptionsBenefits,
    });

    const payload = {
      niches: values.selectedNiches,
      bio: values.bio,
      clearDescriptionOfStrategy: values.clearDescriptionOfStrategy,
      riskProfile: values.riskProfile,
      breakdownsSubscriptionsBenefits: values.breakdownsSubscriptionsBenefits,
    };

    dispatch(updateUser(payload))
      .then(response => {
        console.log('payload', response);
        if (response?.payload?.message === 'User updated successfully') {
          navigation.navigate('KYCOptionsPage' as never);
        }
      })
      .catch(error => {
        console.error('Error updating user profile:', error);
      });
  };

  useEffect(() => {
    dispatch(getCurrentUser())
      .then(response => {
        console.log('User profile retrieved:', response);
        if (response?.payload?.user?._id) {
          dispatch(getUserProfile(response?.payload?.user?._id));
        }
      })
      .catch(error => {
        console.error('Error retrieving user profile:', error);
      });
  }, [dispatch]);

  return (
    <SafeArea>
      <View style={{backgroundColor: 'white', height: '100%'}}>
        <MainHeader />
        <BodyView>
          <AuthTitleText
            text="Get Started Becoming a Provider"
            title="Become a Provider"
            icon={<Icon name="question" size={20} color={Colors.white} />}
            marginTop={24}
            ctaText=""
          />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({handleSubmit, errors, setFieldValue, values}) => (
              <View>
                <Field
                  component={MultipleDropdown}
                  name="selectedNiches"
                  label="Choose Niches"
                  options={['Crypto', 'Stocks', 'Forex', 'Commodities']}
                  onSelect={(niches: string[]) =>
                    handleSelectNiche(niches, setFieldValue)
                  }
                />
                {errors.selectedNiches && (
                  <SemiBoldText
                    color={Colors.primary}
                    fontSize={13}
                    textContent={errors.selectedNiches}
                  />
                )}

                <Field
                  name="bio"
                  component={NewCustomTextInput}
                  label="Bio"
                  value={values.bio}
                  onChangeText={(text: string) => setFieldValue('bio', text)}
                  error={errors.bio}
                  placeholder="Enter Bio"
                  multiline
                  numberOfLines={12}
                  minHeight={170}
                  padding={16}
                />
                {errors.bio && (
                  <SemiBoldText
                    color={Colors.primary}
                    fontSize={13}
                    textContent={errors.bio}
                  />
                )}

                {/* New Field: Risk Profile Dropdown */}
                <CustomDropdown
                  name="riskProfile"
                  label="Risk Profile"
                  options={['Low Risk', 'Moderate Risk', 'High Risk']} // Dropdown with only two options
                  selectedValue={values.riskProfile}
                  onSelect={(riskProfile: string) =>
                    handleSelectRiskProfile(riskProfile, setFieldValue)
                  }
                />
                {errors.riskProfile && (
                  <SemiBoldText
                    color={Colors.primary}
                    fontSize={13}
                    textContent={errors.riskProfile}
                  />
                )}

                <Field
                  name="clearDescriptionOfStrategy"
                  component={NewCustomTextInput}
                  label="Clear Description of Strategy"
                  value={values.clearDescriptionOfStrategy}
                  onChangeText={(text: string) =>
                    setFieldValue('clearDescriptionOfStrategy', text)
                  }
                  error={errors.clearDescriptionOfStrategy}
                  placeholder="Enter Strategy Description"
                  multiline
                  numberOfLines={12}
                  minHeight={170}
                  padding={16}
                />

                <Field
                  name="breakdownsSubscriptionsBenefits"
                  component={NewCustomTextInput}
                  label="Breakdown of Subscriptions and Benefits"
                  value={values.breakdownsSubscriptionsBenefits}
                  onChangeText={(text: string) =>
                    setFieldValue('breakdownsSubscriptionsBenefits', text)
                  }
                  error={errors.breakdownsSubscriptionsBenefits}
                  placeholder="Enter Breakdown"
                  multiline
                  numberOfLines={12}
                  minHeight={170}
                  padding={16}
                />

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

export default GetStartedScreen;
