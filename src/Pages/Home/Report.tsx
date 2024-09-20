import React, { useState } from 'react';
import { View, TextInput, Alert, ActivityIndicator } from 'react-native';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import SafeArea from '../../Component/SafeAreaViewCustom/SafeArea';
import FullBtn from '../../Component/Buttons/FullBtn';
import AuthTitleText from '../../Component/Header/AuthTitle.tsx/AuthTitle';
import Icon from 'react-native-remix-icon';
import { Colors } from '../../Component/Colors/Colors';
import SemiBoldText from '../../Component/Texts/SemiBoldText';
import BodyView from '../../Component/SafeAreaViewCustom/BodyView';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Redux/Store/Store';
import { reportUser } from '../../Redux/Profile/Profile'; // Assuming this action sends the report to the server
import MainHeader from '../../Component/Header/MainHeaders';

const ReportScreen: React.FC = () => {
  const [loading, setLoading] = useState(false); // State to manage loading
  const initialValues = {
    report: '',
  };

  const validationSchema = yup.object().shape({
    report: yup.string().required('Report is required'),
  });

  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const route = useRoute();
  const { id } = route.params; // Fetching user ID from route params

  const onSubmit = (values: any) => {
    const payload = {
      report: values.report,
      id: id, // ID from route params
    };

    setLoading(true); // Start loading indicator

    dispatch(reportUser(payload))
      .then(response => {
        // Delay before showing alert
        setTimeout(() => {
          setLoading(false); // Stop loading indicator

          if (response?.payload?.message === 'Report added successfully') {
            Alert.alert(
              'Success',
              'Report submitted successfully!',
              [
                {
                  text: 'OK',
                  onPress: () => navigation.goBack(), // Navigate back after the alert is dismissed
                },
              ],
              { cancelable: false },
            );
          }
        }, 1000); // 1-minute delay for demonstration (replace with 1000ms for actual delay)
      })
      .catch(error => {
        setLoading(false); // Stop loading indicator on error
        console.error('Error submitting report:', error);
      });
  };

  return (
    <SafeArea>
      <View style={{ backgroundColor: 'transparent', height: '100%' }}>
        <BodyView>
          <MainHeader title="Report this Provider" />

          <AuthTitleText
            text="Submit a Report"
            title="Report"
            icon={<Icon name="feedback" size={20} color={Colors.white} />}
            marginTop={24}
            ctaText=""
          />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ handleSubmit, errors, setFieldValue, values }) => (
              <View>
                <Field
                  name="report"
                  component={TextInput}
                  placeholder="Enter your report here"
                  value={values.report}
                  onChangeText={(text: string) => setFieldValue('report', text)}
                  multiline
                  numberOfLines={12}
                  placeholderTextColor="#ffffff56"
                  style={{
                    borderColor: Colors.primary,
                    borderWidth: 1,
                    padding: 16,
                    borderRadius: 8,
                    minHeight: 170,
                    backgroundColor: '#ffffff12', // Transparent background
                    color: Colors.primary,
                  }}
                />
                {errors.report && (
                  <SemiBoldText
                    color={Colors.primary}
                    fontSize={13}
                    textContent={errors.report}
                  />
                )}

                {loading ? (
                  <ActivityIndicator size="large" color={Colors.primary} style={{ marginVertical: 20 }} />
                ) : (
                  <FullBtn buttonText="Submit Report" onPress={handleSubmit} />
                )}
              </View>
            )}
          </Formik>
          <View style={{ marginBottom: 48 }}></View>
        </BodyView>
      </View>
    </SafeArea>
  );
};

export default ReportScreen;