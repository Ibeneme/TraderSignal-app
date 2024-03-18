import {View, Image} from 'react-native';
import {useTheme} from '../../Context/ThemeProvidr';
import {User} from '../Home/Signals';
import VerifiedBadge from '../../Component/icons/VerifiedBadge';
import RegularText from '../../Component/Texts/RegularText';
import BoldText from '../../Component/Texts/BoldText';
import {Colors} from '../../Component/Colors/Colors';
import SemiBoldText from '../../Component/Texts/SemiBoldText';

export const renderUserObject = (user: User) => {
  const {isDarkModeEnabled} = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 16,
          gap: 8,
        }}>
        <Image
          source={user.profilePicture}
          style={{width: 40, height: 40, borderRadius: 20}}
        />
        <View>
          <SemiBoldText
            textContent={`${user.firstName} ${user.lastName}`}
            fontSize={14}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: -4,
            }}>
            <RegularText textContent={`@${user.username}`} fontSize={12} />
            <VerifiedBadge
              width={16}
              height={30}
              color={isDarkModeEnabled ? Colors?.primary : '#000'}
            />
          </View>
        </View>
        <View style={{marginLeft: -4}}></View>
      </View>
      <View>
        <BoldText fontSize={12} textContent="09:46am" />
      </View>
    </View>
  );
};
