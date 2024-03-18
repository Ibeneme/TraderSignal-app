import React, {useState} from 'react';
import {View, StyleSheet, Text, Modal, TouchableOpacity} from 'react-native';
import BodyView from '../../Component/SafeAreaViewCustom/BodyView';
import SafeArea from '../../Component/SafeAreaViewCustom/SafeArea';
import MainHeader from '../../Component/Header/MainHeaders';
import {useTheme} from '../../Context/ThemeProvidr';
import BoldText from '../../Component/Texts/BoldText';
import RegularText from '../../Component/Texts/RegularText';
import SemiBoldText from '../../Component/Texts/SemiBoldText';
import FullBtn from '../../Component/Buttons/FullBtn';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-remix-icon';
import {Colors} from '../../Component/Colors/Colors';

interface Props {}

const CheckPay: React.FC<Props> = () => {
  const {isDarkModeEnabled} = useTheme();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubscribe = () => {
    setModalVisible(false);
    navigation.navigate('SubscriptionSuccessScreen' as never);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    //navigation.navigate('CheckPay' as never);
  };

  return (
    <SafeArea>
      <MainHeader />
      <BodyView color="#f4f4f4" paddingHorizontal={true}>
        <View
          style={[
            styles.container,
            {backgroundColor: isDarkModeEnabled ? '#000' : '#fff'},
          ]}>
          <BoldText textContent="Subscribe to $45" />
          <RegularText
            textContent="Walter Saturn’s Weekly Subscription plan"
            fontSize={13}
            //color={'#808080'}
          />

          <View
            style={{
              marginVertical: 48,
              flexDirection: 'row',
              gap: 12,
              alignItems: 'center',
              width: '91%',
            }}>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#80808045',
                padding: 12,
                width: 48,
                borderRadius: 333,
                height: 48,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <RegularText
                textContent="1"
                fontSize={13}
                //color={'#808080'}
              />
            </View>
            <View style={{width: '100%'}}>
              <SemiBoldText
                textContent="Send USDT on TRC-20 to"
                fontSize={16}
              />
              <RegularText
                textContent="Send USDT on TRC-20 network to this account"
                fontSize={14}
                //color={'#808080'}
              />
            </View>
          </View>

          <View
            style={{
              marginVertical: 48,
              flexDirection: 'row',
              gap: 12,
              alignItems: 'center',
              width: '91%',
              marginTop: -16,
            }}>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#80808045',
                padding: 12,
                width: 48,
                borderRadius: 333,
                height: 48,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <RegularText
                textContent="1"
                fontSize={13} //color={'#808080'}
              />
            </View>
            <View style={{width: '100%'}}>
              <SemiBoldText
                textContent="Use this description as transaction narration"
                fontSize={16}
              />
              <RegularText
                textContent="hshsf$#Ts7syhvshal u3dvgsbsssi-u994"
                fontSize={14}
                //color={'#808080'}
              />
            </View>
          </View>
          <FullBtn buttonText="Done" onPress={() => setModalVisible(true)} />
        </View>
      </BodyView>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View
          style={[
            styles.modalContainer,
            {backgroundColor: isDarkModeEnabled ? '#00000095' : '#00000045'},
          ]}>
          <View
            style={[
              styles.modalContent,
              {backgroundColor: isDarkModeEnabled ? '#000' : '#fff'},
            ]}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                backgroundColor: '#ffaa00',
                padding: 8,
                borderRadius: 244,
                borderWidth: 2,
                borderColor: '#fff',
                width: 48,
                marginBottom: 24,
              }}>
              <Icon name="arrow-left-s-line" size={24} color={'#fff'} />
            </TouchableOpacity>

            <BoldText textContent="Confirm you understand this?" />
            <TouchableOpacity
              style={[
                {
                  marginTop: 24,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  width: '100%',
                },
              ]}
              onPress={handleModalClose}>
              <View
                style={{
                  backgroundColor: '#ffaa0015',
                  padding: 12,
                  borderLeftWidth: 4,
                  borderLeftColor: '#ffaa00',
                }}>
                <RegularText
                  fontSize={12}
                  // color="#ffaa00"
                  textContent="Ensure you copy the valid USDT Trc-20 address, sending USDT to the wrong address is not refundable, ensure you use the description as transaction narration, failure to may lead to loss of assets"
                />
              </View>
            </TouchableOpacity>
            <View style={{marginTop: 32}}>
              <FullBtn
                buttonText="Yes, I understand"
                onPress={handleSubscribe}
              />
            </View>

            {/* Add more subscription options as needed */}
          </View>
        </View>
      </Modal>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '93%',
    margin: 12,
    borderRadius: 24,
    padding: 16,
    paddingTop: 24,
  },
  transactionNarration: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 12,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    width: '100%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subscriptionOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  subscriptionOptionText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CheckPay;
