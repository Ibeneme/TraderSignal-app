import React from 'react';
import {Text, View} from 'react-native';

import MainHeader from '../../Component/Header/MainHeaders';
import Icon from 'react-native-remix-icon';
import {Colors} from '../../Component/Colors/Colors';
import Clickable from '../../Component/Component/Clickable';
import SafeArea from '../../Component/SafeAreaViewCustom/SafeArea';
import BodyView from '../../Component/SafeAreaViewCustom/BodyView';
import RegularText from '../../Component/Texts/RegularText';
import {useTheme} from '../../Context/ThemeProvidr';
import ImagePickerComponent from '../../Component/CustomInputs/ImagePicker';

const KYCImageUpload: React.FC = () => {
  const handleImageSelection = (images: string[]) => {
    console.log('Selected Images:', images);
  };

  const {isDarkModeEnabled} = useTheme();
  return (
    <SafeArea>
      <View style={{backgroundColor: '#f4f4f4', height: '100%'}}>
        <MainHeader />
        <BodyView color='#f4f4f4'>
          <View
            style={{
              padding: 12,
              backgroundColor: isDarkModeEnabled ? '#000' : '#fff',
              marginTop: 36,
              borderRadius: 24,
            }}>
            <View
              style={{
                backgroundColor: '#ffaa0025',
                padding: 18,
                borderRadius: 12,
              }}>
              <RegularText
                textContent="Upload a Valid Document"
                fontSize={14}
                //color={Colors?.primary}
              />
            </View>
            <View style={{paddingHorizontal: 0, paddingTop: 24}}>
              <ImagePickerComponent
                onSelectImages={handleImageSelection}
                uploadText={`Upload a Photo from your gallery`}
              />
            </View>
          </View>
        </BodyView>
      </View>
    </SafeArea>
  );
};

export default KYCImageUpload;
