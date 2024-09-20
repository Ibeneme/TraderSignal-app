import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  ScrollView,
  TextInput,
} from 'react-native';
import SafeArea from '../../Component/SafeAreaViewCustom/SafeArea';
import BodyView from '../../Component/SafeAreaViewCustom/BodyView';
import Icon from 'react-native-remix-icon';
import {Colors} from '../../Component/Colors/Colors';
import {useNavigation, useRoute} from '@react-navigation/core';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../Redux/Store/Store';
import Rating from './Rating';
import ProfileHeaders from '../../Component/Header/ProfileHeaders';
import FastImage from 'react-native-fast-image';
const nichesArray = ['All', 'Crypto', 'Stocks', 'Forex', 'Commodities'];

export const calculateAverageRating = ratings => {
  if (ratings?.length === 0) return 0; // Avoid division by zero

  const totalRating = ratings?.reduce((sum, rating) => sum + rating?.rating, 0);
  const averageRating = totalRating / ratings?.length;

  return averageRating;
};
const ViewAllProviders: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  //const [subDetails, setSubDetails] = useState([]);
  const [selectedNiche, setSelectedNiche] = useState<string | null>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const route = useRoute();
  const {subDetails} = route.params;

  const filteredProviders = subDetails?.filter((user: any) => {
    const matchesNiche = selectedNiche
      ? selectedNiche === 'All' || user?.niche?.includes(selectedNiche)
      : true;
    const matchesSearch =
      user?.username?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      user?.firstName?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    return matchesNiche && matchesSearch;
  });

  const renderItem = ({user, index}: {user: any; index: number}) => (
    <TouchableOpacity
      key={index}
      onPress={() =>
        navigation.navigate('ProfileDetailsPage', {userId: user?._id})
      }
      style={styles.providerItem}>
      <View style={styles.providerDetails}>
        {!user?.profilePhoto ? (
          <TouchableOpacity style={styles.avatarContainer}>
            <Icon name="user-line" size={18} color={Colors?.primary} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.avatarContainer}>
            <FastImage
              source={{
                uri: user?.profilePhoto,
                priority: FastImage.priority.normal,
              }}
              style={styles.avatarImage}
              resizeMode={FastImage.resizeMode.cover} // or 'contain', 'stretch', etc.
            />
          </TouchableOpacity>
        )}
        <View style={{width: '100%'}}>
          <Text style={styles.providerName}>
            {user?.username ? user?.username : user?.firstName}
          </Text>
          <View style={{marginTop: 6}}>
            <Rating rating={calculateAverageRating(user?.ratings || [])} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const toggleNiche = (niche: string) => {
    setSelectedNiche(prevNiche => (prevNiche === niche ? null : niche));
  };

  return (
    <SafeArea>
      <View style={{backgroundColor: '#f4f4f4', height: '100%'}}>
        <ProfileHeaders />
        <BodyView color="#f4f4f4">
          <View style={{marginTop: 48}}>
            <Text style={styles.headerText}>All Providers</Text>
            <Text style={styles.subHeaderText}>View all Providers</Text>
          </View>

          {/* Search Input */}
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search by name"
            style={styles.searchInput}
            placeholderTextColor={'#ffffff60'}
          />

          {/* Niche Filter ScrollView */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.nicheScrollView}>
            {nichesArray.map((niche, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => toggleNiche(niche)}
                style={[
                  styles.nicheButton,
                  selectedNiche === niche && styles.selectedNicheButton,
                ]}>
                <Text
                  style={[
                    styles.nicheButtonText,
                    selectedNiche === niche && styles.selectedNicheText,
                  ]}>
                  {niche}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={{marginBottom: 96, marginTop: 18}}>
            <FlatList
              data={filteredProviders}
              renderItem={({item, index}) => renderItem({user: item, index})}
              keyExtractor={(user, index) => index.toString()}
            />
          </View>
        </BodyView>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  providerItem: {
    marginLeft: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
    backgroundColor: '#ffffff18',
    padding: 16,
    borderRadius: 16,
  },
  providerDetails: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'flex-start',
    width: '75%',
  },
  avatarContainer: {
    padding: 14,
    backgroundColor: Colors.newBG,
    borderRadius: 64,
    borderWidth: 1.4,
    width: 48,
    height: 48,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 36,
    height: 36,
    borderRadius: 333,
  },
  providerName: {
    fontFamily: 'Plus Jakarta Sans Bold',
    fontWeight: '900',
    color: 'white',
    fontSize: 14,
  },
  headerText: {
    fontFamily: 'Plus Jakarta Sans Bold',
    fontWeight: '900',
    fontSize: 16,
    color: '#fff',
    textAlign: 'left',
  },
  subHeaderText: {
    fontFamily: 'Plus Jakarta Sans Regular',
    fontSize: 12,
    color: '#fff',
    marginTop: 2,
    textAlign: 'left',
  },
  searchInput: {
    backgroundColor: '#ffffff12',
    padding: 16,
    borderRadius: 8,
    marginVertical: 24,
    //    marginHorizontal: 16,
    fontFamily: 'Plus Jakarta Sans Regular',
    fontSize: 14,
    borderColor: '#ffffff90',
    borderWidth: 0.3,
    color: '#fff',
    fontWeight: 900,
  },
  nicheScrollView: {
    marginVertical: 10,
  },
  nicheButton: {
    backgroundColor: '#ffffff18',
    padding: 8,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  selectedNicheButton: {
    backgroundColor: Colors.primary,
  },
  nicheButtonText: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'Plus Jakarta Sans Regular',
  },
  selectedNicheText: {
    color: '#fff',
    fontFamily: 'Plus Jakarta Sans Bold',
  },
});

export default ViewAllProviders;
