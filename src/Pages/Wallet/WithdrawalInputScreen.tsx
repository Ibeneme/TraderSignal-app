import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import NewCustomTextInput from '../../Component/CustomInputs/NewCustomTextInput';
import SafeArea from '../../Component/SafeAreaViewCustom/SafeArea';
import MainHeader from '../../Component/Header/MainHeaders';
import BodyView from '../../Component/SafeAreaViewCustom/BodyView';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Colors} from '../../Component/Colors/Colors';
import {AppDispatch} from '../../Redux/Store/Store';
import {useDispatch} from 'react-redux';
import {createWithdrawals, getWithdrawals} from '../../Redux/Subscriptions/Sub';
import {
  getCurrentUser,
  getUserProfile,
  postWithdrawal,
} from '../../Redux/Profile/Profile';
// import { withdraw } from '../../Redux/Withdrawal/Withdrawal'; // Assuming the withdrawal action is imported

// Validation schema using Yup
const validationSchema = yup.object().shape({
  amount: yup.number().required('Amount is required'),
  recipientAddress: yup.string().required('Recipient address is required'),
});

const WithdrawalInputScreen = () => {
  const [formErrors, setFormErrors] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); // Introduce loading state
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const [pendingItemsList, setPendingItemsList] = useState([]);
  const [balance, setBalance] = useState([]);

  const [mainBal, setMainBal] = useState([]);
  const [userFetched, setUserFetched] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getCurrentUser())
        .then(response => {
          console.log('get getCurrentUser retrieved:', response);
          console.log('get getCurrentUser retrieved:', response?.payload);

          dispatch(getUserProfile(response?.payload?.user?._id))
            .then(response => {
              setUserFetched(response?.payload);
              console.log(
                response,
                'hometabshometabs sssgetUserProfile?.payload',
              );
            })
            .catch(error => {
              console.error('Erhmetab hometabs user sub:', error);
            });
        })
        .catch(error => {
          console.error('Error retrieving user sub:', error);
        });

      return () => {
        // Cleanup function (optional)
      };
    }, [dispatch]),
  );

  useEffect(() => {
    // Dispatch the action to fetch user statuses
    dispatch(getWithdrawals())
      .then(response => {
        console.log('get statusss retrieved:', response?.payload?.userStatuses);
        // Check if response contains data before updating state
        if (response?.payload?.withdrawals) {
          setPendingItemsList(response.payload?.balance);
        }
      })
      .catch(error => {
        // Handle error if needed
        console.error('Error fetching user status:', error);
      });

    // dispatch(getBalance())
    //   .then(response => {
    //     console.log('getbalancs:', response?.payload);
    //     setBalance(response?.payload);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching user status:', error);
    //   });
  }, [dispatch]);

  const handleWithdrawal = (
    values: {amount: number; recipientAddress: string},
    {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void},
  ) => {
    setLoading(true); // Set loading state to true when withdrawal begins
    setFormErrors('');
    console.log(values, 'values');

    if (values?.amount > userFetched?.totalEarning) {
      Alert.alert(
        'Insufficent Funds, Amount to be Withdrawn cannnot be greater than your balance',
      );
      setLoading(false);
      setSubmitting(false);
    } else {
      dispatch(
        postWithdrawal({
          amount: values.amount,
          recipientAddress: values.recipientAddress,
        }),
      )
        .then(response => {
          setLoading(false);
          console.log('Withdrawal successful', response);
          if (response?.payload?.message === 'Withdrawal request submitted') {
            navigation.navigate('WithdrawalSuccessScreen', {
              amount: values?.amount,
            } as never);
          }
        })
        .catch(error => {
          setLoading(false);
          console.log('Withdrawal failed', error);
          setFormErrors('Network Error');
        })
        .finally(() => {
          setLoading(false);
          //Set loading state to false after withdrawal ends
          setSubmitting(false);
        });
    }
  };

  return (
    <SafeArea>
      <View style={{backgroundColor: 'white', height: '100%'}}>
        <MainHeader />
        <BodyView>
          <Text
            style={{
              fontFamily: 'Plus Jakarta Sans Bold',
              fontWeight: 900,
              fontSize: 18,
              color: '#fff',
              marginTop: 48,
            }}>
            Withdrawal
          </Text>
          <Text
            style={{
              fontFamily: 'Plus Jakarta Sans Regular',
              fontSize: 12,
              marginVertical: 4,
              marginBottom: 32,
              color: '#fff',
            }}>
            Please enter withdrawal amount and recipient wallet address.
          </Text>
          <Formik
            initialValues={{
              amount: '',
              recipientAddress: '',
            }}
            onSubmit={handleWithdrawal}
            validationSchema={validationSchema}>
            {({handleChange, handleSubmit, values, errors, isSubmitting}) => (
              <>
                <NewCustomTextInput
                  label="Amount in USDT"
                  value={values.amount}
                  onChangeText={handleChange('amount')}
                  error={errors.amount}
                  placeholder="Enter Amount"
                  keyboardType="numeric"
                />
                <NewCustomTextInput
                  label="Recipient Wallet Address"
                  value={values.recipientAddress}
                  onChangeText={handleChange('recipientAddress')}
                  error={errors.recipientAddress}
                  placeholder="Enter Recipient Wallet Address"
                />
                <TouchableOpacity
                  style={[styles.button, loading && {backgroundColor: '#ccc'}]}
                  onPress={handleSubmit} // handleSubmit is already provided by Formik
                  disabled={loading || isSubmitting}>
                  {loading ? (
                    <ActivityIndicator color={Colors.newBG} /> // Show activity indicator while loading
                  ) : (
                    <Text
                      style={{
                        fontFamily: 'Plus Jakarta Sans Regular',
                        fontSize: 14,
                        color: Colors.newBG,
                      }}>
                      Withdraw
                    </Text>
                  )}
                </TouchableOpacity>

                {formErrors ? (
                  <View
                    style={{
                      backgroundColor: '#Ff000045',
                      marginVertical: 24,
                      padding: 16,
                    }}>
                    <Text style={styles.errorText}>{formErrors}</Text>
                  </View>
                ) : null}
              </>
            )}
          </Formik>
        </BodyView>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    marginBottom: -12,
  },
  errorText: {
    color: 'red',
    fontFamily: 'Plus Jakarta Sans Regular',
  },
});

export default WithdrawalInputScreen;
