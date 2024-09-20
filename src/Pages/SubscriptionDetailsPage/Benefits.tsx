import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import SafeArea from '../../Component/SafeAreaViewCustom/SafeArea';
import ProfileHeaders from '../../Component/Header/ProfileHeaders';
import BodyView from '../../Component/SafeAreaViewCustom/BodyView';
import {Colors} from '../../Component/Colors/Colors';

const Benefits: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // Get the 'type' param from route
  const {type} = route.params as {type: string};

  // Define benefits data in JSON-like format
  const benefits = {
    General: [
      'Comprehensive trading tools and resources for traders of all levels.',
      'Real-time market insights to stay informed.',
      'Access to a thriving community forum for knowledge sharing and support.',
      'Improved trading performance through signals from experienced traders.',
      'Educational resources including on-demand courses and curated news.',
      'Reduced risk and increased confidence in trading decisions.',
      'Convenience of accessing multiple subscription options.',
    ],
    'For Users': [
      'Improved trading performance through signals from experienced traders.',
      'Educational resources including on-demand courses and curated news.',
      'Reduced risk and increased confidence in trading decisions.',
      'Convenience of accessing multiple subscription options.',
    ],
    'For Pro Traders': [
      'New audience and revenue stream through signal subscriptions.',
      'Credibility, recognition, and community engagement.',
      'Effortless community management features.',
      'Global reach to attract new subscribers organically.',
      'Improved trading performance through signals from experienced traders.',
      'Educational resources including on-demand courses and curated news.',
      'Reduced risk and increased confidence in trading decisions.',
      'Convenience of accessing multiple subscription options.',
    ],
  };

  // Determine which content to render based on the 'type' param
  const renderContent = () => {
    switch (type) {
      case 'general':
        return (
          <View style={styles.categoryContainer}>
            <Text style={styles.title}>General</Text>
            {benefits.General.map((benefit, index) => (
              <Text key={index} style={styles.benefitItem}>
                {`\u2022 ${benefit}`}
              </Text>
            ))}
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('JoinCommunity')}>
              <Text style={styles.buttonText}>
                Subscribe to Join Our Community
              </Text>
            </TouchableOpacity>
          </View>
        );
      case 'pro_trader':
        return (
          <View style={styles.categoryContainer}>
            <Text style={styles.title}>For Pro Traders</Text>
            {benefits['For Pro Traders'].map((benefit, index) => (
              <Text key={index} style={styles.benefitItem}>
                {`\u2022 ${benefit}`}
              </Text>
            ))}
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('JoinCommunity')}>
              <Text style={styles.buttonText}>
                Join the Pro Trader Community
              </Text>
            </TouchableOpacity>
          </View>
        );
      case 'users':
        return (
          <View style={styles.categoryContainer}>
            <Text style={styles.title}>For Users</Text>
            {benefits['For Users'].map((benefit, index) => (
              <Text key={index} style={styles.benefitItem}>
                {`\u2022 ${benefit}`}
              </Text>
            ))}
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('JoinCommunity')}>
              <Text style={styles.buttonText}>Join Our User Community</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return <Text style={styles.errorText}>Invalid section type</Text>;
    }
  };

  return (
    <SafeArea>
      <ProfileHeaders />
      <BodyView color="#f4f4f4">
        {/* <Text style={styles.title}>Benefits of OTI Community Platform</Text> */}
        <View style={{marginTop: 32}}>{renderContent()}</View>
        <View style={{marginBottom: 120}}></View>
      </BodyView>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Plus Jakarta Sans Bold',
    fontSize: 18,
    color: '#ffaa00',
    marginVertical: 16,
    alignSelf: 'flex-start',
    fontWeight: '900',
  },
  categoryContainer: {
    marginBottom: 0,
    marginTop: 12,
    backgroundColor: '#ffffff13',
    borderRadius: 16,
    padding: 16,
  },
  // title: {
  //   fontFamily: 'Plus Jakarta Sans Bold',
  //   fontSize: 16,
  //   color: '#ffaa00',
  //   alignSelf: 'flex-start',
  //   paddingBottom: 12,
  //   fontWeight: 'bold',
  // },
  benefitItem: {
    fontFamily: 'Plus Jakarta Sans Bold',
    fontSize: 12,
    color: '#ffffff95',
    alignSelf: 'flex-start',
    paddingBottom: 12,
    lineHeight: 24,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonText: {
    fontFamily: 'Plus Jakarta Sans Bold',
    fontSize: 14,
    color: Colors.newBG,
    fontWeight: 'bold',
  },
  errorText: {
    fontFamily: 'Plus Jakarta Sans Bold',
    fontSize: 14,
    color: 'red',
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default Benefits;
