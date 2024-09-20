import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import SemiBoldText from '../Texts/SemiBoldText';
import VerifiedBadge from '../icons/VerifiedBadge';
import Icon from 'react-native-remix-icon';
import {Colors} from '../Colors/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {followUser, getSingleUser} from '../../Redux/Profile/Profile';
import {AppDispatch, RootState} from '../../Redux/Store/Store';
import {useFocusEffect} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

interface Props {
  name: string;
  subscriptionType: string;
  stars?: number;
  price?: string;
  imageSource?: any;
  isDarkModeEnabled?: boolean;
  onPress?: any;
  niche?: string;
  userId?: string;
  followerId?: string;
  followers: string[];
}

const ClickableImage: React.FC<Props> = ({
  name,
  subscriptionType,
  stars,
  price,
  imageSource,
  isDarkModeEnabled,
  onPress,
  niche,
  followerId,
  userId,
  followers,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch user data
  const fetchUserData = useCallback(async () => {
    if (userId) {
      setLoading(true);
      try {
        const res = await dispatch(getSingleUser(userId));
        const user = res?.payload;
        if (user) {
          setFollowersCount(user.followersCount);
          setIsFollowing(user.followers.includes(followerId || ''));
        }
      } catch (error) {
        console.log('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    }
  }, [userId, followerId, dispatch]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Refetch data when screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [fetchUserData]),
  );

  const handleFollow = async () => {
    if (!userId || !followerId) return;

    setLoading(true);

    try {
      await dispatch(followUser({userId, followerId}));
      const res = await dispatch(getSingleUser(userId));
      const user = res?.payload;
      if (user) {
        setFollowersCount(user.followersCount);
        setIsFollowing(user.followers.includes(followerId || ''));
      }
    } catch (error) {
      console.log('Follow/Unfollow failed', error);
    } finally {
      setLoading(false);
    }
  };

  const cryptoColor = isDarkModeEnabled ? '#EE06F2' : '#EE06F2';
  const forexColor = isDarkModeEnabled ? '#0665F2' : '#0665F2';
  const stocksColor = isDarkModeEnabled ? '#FFAA00' : '#FFAA00';

  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            {imageSource ? (
              <FastImage
                source={imageSource}
                style={styles.image}
                resizeMode={FastImage.resizeMode.cover} // or 'contain', 'stretch', etc.
              />
            ) : null}
            <View style={styles.textContainer}>
              <View style={styles.nameContainer}>
                <Text
                  style={{
                    fontFamily: 'Plus Jakarta Sans Bold',
                    fontWeight: 900,
                    fontSize: 16,
                    color: '#fff',
                  }}>
                  {name}
                </Text>
                {imageSource ? (
                  <VerifiedBadge color={'#ffaa00'} width={16} height={16} />
                ) : null}
              </View>

              <Text
                style={{
                  color: '#808080',
                  fontSize: 12,
                  fontFamily: 'Plus Jakarta Sans Regular',
                }}>
                {subscriptionType}
              </Text>
              <View style={styles.starsContainer}>
                {[...Array(stars)].map((_, index) => (
                  <Icon
                    key={index}
                    name={index < stars - 1 ? 'star-fill' : 'star-line'}
                    size={14}
                    color={Colors.primary}
                  />
                ))}
              </View>
            </View>
          </View>
          {imageSource ? null : (
            <View style={{flexDirection: 'row', gap: 8}}>
              <View
                style={{
                  backgroundColor: isDarkModeEnabled
                    ? '#EE06F225'
                    : '#EE06F225',
                  paddingVertical: 8,
                  width: 68,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 24,
                  marginTop: 10,
                  paddingHorizontal: 12,
                }}>
                <SemiBoldText
                  color={'#EE06F2'}
                  textContent={niche}
                  fontSize={11}
                />
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.followersCount}>
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <>
              {followersCount}{' '}
              <Text
                style={{fontSize: 11, fontFamily: 'Plus Jakarta Sans Regular'}}>
                Followers
              </Text>
            </>
          )}
        </Text>

        <TouchableOpacity
          onPress={handleFollow}
          style={[
            styles.button,
            {backgroundColor: isFollowing ? '#66666614' : '#ffaa0014'},
          ]}>
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text
              style={[
                styles.buttonText,
                {color: isFollowing ? '#666666' : '#ffaa00'},
              ]}>
              {isFollowing ? 'Unfollow' : 'Follow'}
            </Text>
          )}
        </TouchableOpacity>

        
      </View>
      <Text
        style={{
          fontSize: 13,
          fontFamily: 'Plus Jakarta Sans Regular',
          color: '#ffaa00',
          backgroundColor: '#ffaa0012',
          padding: 16,
          marginVertical: 12,
        }}>
        <Text style={{fontSize: 12, lineHeight: 18}}>
          <Text style={{fontWeight: 'bold'}}>
            Disclaimer: Trading Signals Risks
          </Text>
          {'\n\n'}
          This information is educational, not financial advice. Trading
          signals, especially high-risk strategies, can lead to significant
          losses.
          {'\n\n'}
          <Text style={{fontWeight: 'bold'}}>1. Market Risks:</Text>
          Trading is volatile and may result in losses. Past performance doesn't
          guarantee future results.
          {'\n\n'}
          <Text style={{fontWeight: 'bold'}}>2. High-Risk Strategies:</Text>
          These can amplify both gains and losses. Assess your risk tolerance.
          {'\n\n'}
          <Text style={{fontWeight: 'bold'}}>3. No Guarantees:</Text>
          Signals don't guarantee profits or loss avoidance. Do your research
          and seek advice.
          {'\n\n'}
          <Text style={{fontWeight: 'bold'}}>4. Responsibility:</Text>
          You are responsible for using signals. Consult a financial advisor.
          {'\n\n'}
          <Text style={{fontWeight: 'bold'}}>5. Liability:</Text>
          The platform isn't liable for losses from signals.
          {'\n\n'}
          <Text style={{fontWeight: 'bold'}}>6. Compliance:</Text>
          Ensure your trading follows the laws in your region.
          {'\n\n'}
          <Text style={{fontWeight: 'bold'}}>7. Monitor:</Text>
          Continuously review and adjust strategies.
          {'\n\n'}
          By using signals, you agree to these terms and risks.
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  followersCount: {
    fontFamily: 'Plus Jakarta Sans Bold',
    fontWeight: 900,
    fontSize: 16,
    color: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Plus Jakarta Sans Bold',
    fontWeight: 900,
    fontSize: 12,
  },
  container: {
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 14,
  },
  contentContainer: {
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  imageContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 12,
  },
  textContainer: {
    flexDirection: 'column',
    gap: 4,
  },
  nameContainer: {
    flexDirection: 'row',
    gap: -12,
    alignItems: 'center',
    marginBottom: 2,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 3,
    marginTop: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    paddingVertical: 8,
    width: 68,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    paddingHorizontal: 12,
  },
});

export default ClickableImage;
