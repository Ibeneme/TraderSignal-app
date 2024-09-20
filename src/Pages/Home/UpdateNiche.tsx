import React, { useState } from 'react';
import { View, Modal, Text, Button, StyleSheet } from 'react-native';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import MainHeader from '../../Component/Header/MainHeaders';
import SafeArea from '../../Component/SafeAreaViewCustom/SafeArea';
import FullBtn from '../../Component/Buttons/FullBtn';
import AuthTitleText from '../../Component/Header/AuthTitle.tsx/AuthTitle';
import Icon from 'react-native-remix-icon';
import { Colors } from '../../Component/Colors/Colors';
import SemiBoldText from '../../Component/Texts/SemiBoldText';
import BodyView from '../../Component/SafeAreaViewCustom/BodyView';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomDropdown from '../../Component/CustomInputs/CustomDropdown';
import NewCustomTextInput from '../../Component/CustomInputs/NewCustomTextInput';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Redux/Store/Store';
import { updateUser } from '../../Redux/Profile/Profile';
import MultipleDropdown from '../../Component/CustomInputs/MulitpleDropdown';

const UpdateNiche: React.FC = () => {
  const route = useRoute();
  
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();

  // State for modal visibility
  const [modalVisible, setModalVisible] = useState(false);

  // Extract subDetails from route params
  const { subDetails } = route.params as {
    subDetails: {
      niche: string[];
      bio: string;
      clearDescriptionOfStrategy: string;
      riskProfile: string;
      breakdownsSubscriptionsBenefits: string;
    };
  };

  const initialValues = {
    selectedNiches: subDetails.niche || [],
    bio: subDetails.bio || '',
    clearDescriptionOfStrategy: subDetails.clearDescriptionOfStrategy || '',
    riskProfile: subDetails.riskProfile || '',
    breakdownsSubscriptionsBenefits: subDetails.breakdownsSubscriptionsBenefits || '',
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

  const handleSelectNiche = (niches: string[], setFieldValue: Function) => {
    setFieldValue('selectedNiches', niches);
  };

  const handleSelectRiskProfile = (
    riskProfile: string,
    setFieldValue: Function,
  ) => {
    setFieldValue('riskProfile', riskProfile);
  };

  const onSubmit = (values: any) => {
    const updatedFields: any = {};
    for (const key in values) {
      if (values[key] !== initialValues[key]) {
        updatedFields[key] = values[key];
      }
    }

    if (Object.keys(updatedFields).length > 0) {
      dispatch(updateUser(updatedFields))
        .then(response => {
          if (response?.payload?.message === 'User updated successfully') {
            setModalVisible(true);
          }
        })
        .catch(error => {
          console.error('Error updating user profile:', error);
        });
    } else {
      console.log('No changes detected.');
    }
  };

  return (
    <SafeArea>
      <View style={{ backgroundColor: 'white', height: '100%' }}>
        <MainHeader />
        <BodyView>
          <AuthTitleText
            text="Update Your Profile"
            title="Update Profile"
            icon={<Icon name="question" size={20} color={Colors.white} />}
            marginTop={24}
            ctaText=""
          />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({ handleSubmit, errors, setFieldValue, values }) => (
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

                <CustomDropdown
                  name="riskProfile"
                  label="Risk Profile"
                  options={['Low Risk', 'Moderate Risk', 'High Risk']}
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

                <FullBtn buttonText="Save Changes" onPress={handleSubmit} />
              </View>
            )}
          </Formik>

          {/* Modal for success message */}
          <Modal
            transparent={true}
            visible={modalVisible}
            animationType="slide"
            onRequestClose={() => {
              setModalVisible(false);
              navigation.goBack();
            }}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>Profile updated successfully!</Text>
                <Button
                  title="OK"
                  onPress={() => {
                    setModalVisible(false);
                    navigation.goBack();
                  }}
                />
              </View>
            </View>
          </Modal>

          <View style={{ marginBottom: 48 }}></View>
        </BodyView>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default UpdateNiche;