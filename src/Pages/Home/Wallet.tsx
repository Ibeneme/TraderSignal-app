import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Text,
  ScrollView,
} from 'react-native';

import MainHeader from '../../Component/Header/MainHeaders';
import Icon from 'react-native-remix-icon';
import {Colors} from '../../Component/Colors/Colors';
import Clickable from '../../Component/Component/Clickable';
import SafeArea from '../../Component/SafeAreaViewCustom/SafeArea';
import BodyView from '../../Component/SafeAreaViewCustom/BodyView';
import RegularText from '../../Component/Texts/RegularText';
import {useTheme} from '../../Context/ThemeProvidr';
import {useNavigation} from '@react-navigation/native';
import BoldText from '../../Component/Texts/BoldText';
import MediumText from '../../Component/Texts/MediumText';

const transactions = [
  {
    id: 1,
    date: '28th October, 2023, 10:23am GMT + 1',
    title: 'New Subscription  +200 USDT',
    //amount: '+200',
    iconColor: Colors.primary,
    isDebit: false,
    status: 'Successful',
    receiverName: 'Benjamin Jimoh',
    receiverPhoneNumber: '+23480000000000',
    receiverUsername: '@benjamin_jimoh',
    serviceStatus: 'Delivered',
    receiversAddress: 'aD4363gbsfdadatgbb^gss7hsbsgss',
  },
  {
    id: 2,
    date: '27th October, 2023, 10:23am GMT + 1',
    title: 'New Subscription  +200 USDT',
    //amount: '+200',
    iconColor: Colors.primary,
    isDebit: false,
    status: 'Successful',
    receiverName: 'Benjamin Jimoh',
    receiverPhoneNumber: '+23480000000000',
    receiverUsername: '@benjamin_jimoh',
    serviceStatus: 'Delivered',
    receiversAddress: 'aD4363gbsfdadatgbb^gss7hsbsgss',
  },
  {
    id: 3,
    date: '27th October, 2023, 10:23am GMT + 1',
    title: 'Withdrawal - 2,000 USDT',
    //amount: '-2000',
    iconColor: '#FF0000',
    isDebit: true,
    status: 'Successful',
    receiverName: 'Benjamin Jimoh',
    receiverPhoneNumber: '+23480000000000',
    receiverUsername: '@benjamin_jimoh',
    serviceStatus: 'Delivered',
    receiversAddress: 'aD4363gbsfdadatgbb^gss7hsbsgss',
  },
  {
    id: 4,
    date: '27th October, 2023, 10:23am GMT + 1',
    title: 'Withdrawal - 4,000 USDT',
    //amount: '-4000',
    iconColor: '#FF0000',
    isDebit: true,
    status: 'Successful',
    receiverName: 'Benjamin Jimoh',
    receiverPhoneNumber: '+23480000000000',
    receiverUsername: '@benjamin_jimoh',
    serviceStatus: 'Delivered',
    receiversAddress: 'aD4363gbsfdadatgbb^gss7hsbsgss',
  },
];

export interface Transaction {
  id?: number;
  date?: any;
  title?: any;
  iconColor?: string;
  isDebit?: boolean;
  status?: string;
  receiverName?: string;
  receiverPhoneNumber?: string;
  receiverUsername?: string;
  serviceStatus?: string;
  receiversAddress?: string;
  onPress?: () => void;
}

const Wallet: React.FC = () => {
  const navigation = useNavigation();
  const {isDarkModeEnabled} = useTheme();
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    console.log(transaction, 'transaction');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const [showBalance, setShowBalance] = useState(true); // State to track visibility of balance
  //const [isDebit, setIsDebit] = useState(true);

  const handleWithdrawUSDT = () => {
    console.log('Withdraw USDT clicked');
    navigation.navigate('WithdrawalScreen' as never);
  };

  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };

  return (
    <SafeArea>
      <View style={{backgroundColor: '#f4f4f4', height: '100%'}}>
        <MainHeader />
        <BodyView color="#f4f4f4">
          <View
            style={{
              padding: 12,
              marginTop: 36,
              borderRadius: 24,
              backgroundColor: isDarkModeEnabled ? '#000000' : '#ffff',
            }}>
            <View style={{position: 'relative'}}>
              <Image
                source={require('../../../assets/images/wallet.png')} // Replace with your image source
                style={styles.image}
              />
              <View style={styles.detailsContainer}>
                <View style={{gap: 12}}>
                  <View
                    style={{
                      //   justifyContent: 'space-between',
                      //   width: '100%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 4,
                    }}>
                    <RegularText
                      //color="#fff"
                      textContent="Balance"
                    />

                    <TouchableOpacity
                      onPress={toggleBalanceVisibility}
                      style={styles.toggleButton}>
                      <View style={styles.toggleButtonText}>
                        {!showBalance ? (
                          <Icon
                            name="eye-close-line"
                            size={16}
                            color={Colors.white}
                          />
                        ) : (
                          <Icon
                            name="eye-line"
                            size={16}
                            color={Colors.white}
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                  {showBalance ? (
                    <BoldText
                      color="#fff"
                      textContent="10,000 USDT"
                      fontSize={24}
                    />
                  ) : (
                    <BoldText
                      color="#fff"
                      textContent="****** USDT"
                      fontSize={24}
                    />
                  )}
                </View>
                <TouchableOpacity
                  onPress={handleWithdrawUSDT}
                  style={styles.ctaButton}>
                  <MediumText
                    textContent="Withdraw USDT"
                    color="#121212"
                    fontSize={14}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{marginTop: 12}}>
            <View
              style={{
                borderRadius: 24,
                paddingHorizontal: 12,
                paddingVertical: 4,
                backgroundColor: isDarkModeEnabled ? '#000000' : '#ffff',
              }}>
              {transactions.map(transaction => (
                <Clickable
                  key={transaction.id}
                  text={transaction.date}
                  title={transaction.title}
                  icon={
                    <Icon
                      name="wallet-3-fill"
                      size={24}
                      color={transaction.iconColor}
                      style={{borderRadius: 24}}
                    />
                  }
                  onPress={() => handleTransactionClick(transaction)}
                  iconArrow={
                    <Icon
                      name="arrow-right-line"
                      size={20}
                      color={transaction.iconColor}
                    />
                  }
                  display={true}
                  isDebit={transaction.isDebit}
                  //ctaText={transaction.amount}
                />
              ))}
            </View>
          </View>
        </BodyView>
      </View>
      <Modal visible={showModal} transparent animationType="fade">
        <View
          style={[
            styles.modalContainer,
            {backgroundColor: isDarkModeEnabled ? '#ffffff15' : '#00000095'},
          ]}>
          <View
            style={[
              styles.modalContent,
              {
                width: '100%',
                backgroundColor: isDarkModeEnabled ? '#000000' : '#ffffff',
              },
            ]}>
            <ScrollView>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Icon
                  name="close-circle-fill"
                  size={18}
                  color={Colors.white} // Apply activeColor when focused
                />
              </TouchableOpacity>

              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 24,
                }}>
                <View
                  style={{
                    padding: 16,
                    backgroundColor: selectedTransaction?.isDebit
                      ? '#ff000025'
                      : '#ffaa0025',
                    width: 64,
                    borderRadius: 24,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="wallet-3-fill"
                    size={32}
                    color={selectedTransaction?.iconColor}
                  />
                </View>
              </View>
              <Text
                style={[
                  styles.modalText,
                  {
                    color: !isDarkModeEnabled ? '#000000' : '#ffffff',
                    fontFamily: 'Plus Jakarta Sans Bold',
                    textAlign: 'center',
                    fontSize: 14,
                    marginTop: 24,
                  },
                ]}>
                {selectedTransaction?.title}
              </Text>
              <Text
                style={[
                  styles.modalText,
                  {
                    color: !isDarkModeEnabled ? '#000000' : '#ffffff',
                    fontFamily: 'Plus Jakarta Sans Regular',
                    textAlign: 'center',
                    fontSize: 12,
                    marginBottom: 48,
                  },
                ]}>
                {selectedTransaction?.date}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 8,
                }}>
                <Text
                  style={[
                    styles.modalText,
                    {color: !isDarkModeEnabled ? '#000000' : '#ffffff'},
                  ]}>
                  Date:
                </Text>
                <Text
                  style={[
                    styles.modalText,
                    {
                      color: !isDarkModeEnabled ? '#000000' : '#ffffff',
                      fontFamily: 'Plus Jakarta Sans Regular',
                    },
                  ]}>
                  {selectedTransaction?.date}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 8,
                }}>
                <Text
                  style={[
                    styles.modalText,
                    {color: !isDarkModeEnabled ? '#000000' : '#ffffff'},
                  ]}>
                  Receiver's Name:
                </Text>
                <Text
                  style={[
                    styles.modalText,
                    {
                      color: !isDarkModeEnabled ? '#000000' : '#ffffff',
                      fontFamily: 'Plus Jakarta Sans Regular',
                    },
                  ]}>
                  {selectedTransaction?.receiverName}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 8,
                }}>
                <Text
                  style={[
                    styles.modalText,
                    {color: !isDarkModeEnabled ? '#000000' : '#ffffff'},
                  ]}>
                  Receiver's Phone Number:
                </Text>
                <Text
                  style={[
                    styles.modalText,
                    {
                      color: !isDarkModeEnabled ? '#000000' : '#ffffff',
                      fontFamily: 'Plus Jakarta Sans Regular',
                    },
                  ]}>
                  {selectedTransaction?.receiverPhoneNumber}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 8,
                }}>
                <Text
                  style={[
                    styles.modalText,
                    {color: !isDarkModeEnabled ? '#000000' : '#ffffff'},
                  ]}>
                  Receiver's Username
                </Text>
                <Text
                  style={[
                    styles.modalText,
                    {
                      color: !isDarkModeEnabled ? '#000000' : '#ffffff',
                      fontFamily: 'Plus Jakarta Sans Regular',
                    },
                  ]}>
                  {selectedTransaction?.receiverUsername}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 8,
                }}>
                <Text
                  style={[
                    styles.modalText,
                    {color: !isDarkModeEnabled ? '#000000' : '#ffffff'},
                  ]}>
                  Delivery Status:
                </Text>
                <Text
                  style={[
                    styles.modalText,
                    {
                      color: !isDarkModeEnabled ? '#000000' : '#ffffff',
                      fontFamily: 'Plus Jakarta Sans Regular',
                    },
                  ]}>
                  {selectedTransaction?.serviceStatus}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 8,
                }}>
                <Text
                  style={[
                    styles.modalText,
                    {color: !isDarkModeEnabled ? '#000000' : '#ffffff'},
                  ]}>
                  Receiver's Address:
                </Text>
                <Text
                  style={[
                    styles.modalText,
                    {
                      color: !isDarkModeEnabled ? '#000000' : '#ffffff',
                      fontFamily: 'Plus Jakarta Sans Regular',
                    },
                  ]}>
                  {selectedTransaction?.receiversAddress}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 8,
                }}>
                <Text
                  style={[
                    styles.modalText,
                    {color: !isDarkModeEnabled ? '#000000' : '#ffffff'},
                  ]}>
                  Status:
                </Text>
                <Text
                  style={[
                    styles.modalText,
                    {
                      color: !isDarkModeEnabled ? '#000000' : '#ffffff',
                      fontFamily: 'Plus Jakarta Sans Regular',
                    },
                  ]}>
                  {selectedTransaction?.status}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 8,
                }}>
                <Text
                  style={[
                    styles.modalText,
                    {color: !isDarkModeEnabled ? '#000000' : '#ffffff'},
                  ]}>
                  Status:
                </Text>
                <Text
                  style={[
                    styles.modalText,
                    {
                      color: !isDarkModeEnabled ? '#000000' : '#ffffff',
                      fontFamily: 'Plus Jakarta Sans Regular',
                    },
                  ]}>
                  {selectedTransaction?.status}
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  detailsContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    justifyContent: 'space-between',
    height: '65%',
  },
  balanceText: {
    fontSize: 24,
    color: Colors.primary,
  },
  ctaButton: {
    backgroundColor: Colors.white,
    padding: 6,
    borderRadius: 48,
    marginTop: 32,
    width: 170,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
  },

  toggleButton: {
    // position: 'absolute',
    // bottom: 20,
    // right: 20,
  },
  toggleButtonText: {
    // color: Colors.white,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'column',
  },
  modalText: {
    fontFamily: 'Plus Jakarta Sans SemiBold',
    fontSize: 13,
    marginBottom: 8,
  },
  closeButton: {
    backgroundColor: Colors.primary,
    padding: 8,
    borderRadius: 8,
    marginTop: 16,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Wallet;
