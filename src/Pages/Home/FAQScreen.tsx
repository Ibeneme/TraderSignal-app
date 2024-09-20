import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import SafeArea from '../../Component/SafeAreaViewCustom/SafeArea';
import {Colors} from '../../Component/Colors/Colors';
import {useNavigation} from '@react-navigation/core';
import ProfileHeaders from '../../Component/Header/ProfileHeaders';
import Icon from 'react-native-remix-icon';

const FAQScreen: React.FC = () => {
  const navigation = useNavigation();
  const [faqs, setFaqs] = useState([
    {
      Question: 'What is OTI Signals?',
      Answer:
        'OTI Signals is a revolutionary mobile application designed to empower traders of all experience levels with comprehensive trading tools and resources. It offers real-time market insights, educational resources, a thriving community forum, and access to premium features through tiered subscriptions.',
    },
    {
      Question: 'Who can use OTI Signals?',
      Answer:
        "OTI Signals caters to traders across diverse asset classes, including Forex, Cryptocurrencies, Stocks, and ETFs. Whether you're a beginner or an experienced trader, our platform provides valuable resources to enhance your trading journey.",
    },
    {
      Question: 'How can I access OTI Signals?',
      Answer:
        'You can download the OTI Signals mobile application from the App Store or Google Play Store and create an account to start exploring our features and resources.',
    },

    {
      Question: 'What benefits do users receive from using OTI Signals?',
      Answer:
        'Users of OTI Signals enjoy improved trading performance through access to signals from experienced traders, educational resources, reduced risk, increased confidence, convenience, and multiple subscription options tailored to their needs and budget.',
    },
    {
      Question:
        'Are there any educational resources available on the platform?',
      Answer:
        'Yes, OTI Signals provides on-demand courses and curated news to help users learn about cryptocurrency trading, risk management, market analysis, and other relevant topics.',
    },
    {
      Question: 'How can I interact with other users on the platform?',
      Answer:
        "Our platform features a thriving community forum where users can engage in knowledge sharing, discussions, and support. It's a great place to connect with like-minded traders and learn from each other's experiences.",
    },

    {
      Question: 'What opportunities does OTI Signals offer for pro traders?',
      Answer:
        'OTI Signals provides pro traders with a new audience and revenue stream through signal subscriptions. Additionally, our platform offers credibility, recognition, community engagement, and effortless community management features.',
    },
    {
      Question:
        "How can pro traders benefit from the platform's global reach and scalability?",
      Answer:
        "Pro traders can reach a larger global audience beyond their existing community limitations, attract new subscribers organically, and enhance efficiency through the platform's integrated system for signal performance tracking and user ratings.",
    },
    {
      Question:
        'Are there monetization opportunities for pro traders on OTI Signals?',
      Answer:
        "Yes, pro traders can earn from their educational materials hosted on the platform and benefit from the app's established infrastructure, including payment processing and subscription management, freeing them to focus on their expertise.",
    },

    {
      Question:
        "I'm experiencing technical issues with the app. How can I get help?",
      Answer:
        'If you encounter any technical issues with the OTI Signals app, please reach out to our customer support team via email at support@otisignals.com. Our team will assist you promptly in resolving any issues you may be facing.',
    },

    {
      Question: 'How do I subscribe to OTI Signals?',
      Answer:
        'You can subscribe to OTI Signals directly through the mobile app. Simply select the subscription tier and signal packages that best fit your needs and budget, and follow the prompts to complete the subscription process.',
    },
    {
      Question: 'How can I manage my subscription and billing information?',
      Answer:
        'You can manage your subscription and billing information directly within the OTI Signals app. Simply navigate to the settings menu and select the "Subscription" tab to make any necessary changes or updates to your account.',
    },
  ]);

  const toggleAccordion = (index: number) => {
    setFaqs(prevFaqs =>
      prevFaqs.map((faq, i) => ({
        ...faq,
        isOpen: index === i ? !faq.isOpen : false,
      })),
    );
  };

  return (
    <SafeArea>
      <View style={styles.container}>
        <ProfileHeaders />
        <ScrollView>
          <Text
            style={{
              fontFamily: 'Plus Jakarta Sans Bold',
              fontWeight: 900,
              fontSize: 24,
              color: '#fff',
              marginTop: 48,
              textAlign: 'center',
            }}>
            FAQS
          </Text>
          <View style={styles.content}>
            {faqs.map((faq, index) => (
              <View key={index} style={styles.faqItem}>
                <TouchableOpacity
                  onPress={() => toggleAccordion(index)}
                  style={styles.questionContainer}>
                  <Text
                    style={[styles.question, {fontWeight: 900, width: '95%'}]}>
                    {faq.Question}
                  </Text>
                  <View style={{width: '05%'}}>
                    <Icon
                      name={
                        faqs[index].isOpen
                          ? 'arrow-drop-up-line'
                          : 'arrow-drop-down-line'
                      }
                      size={24}
                      color={Colors.primary}
                    />
                  </View>
                </TouchableOpacity>
                {faq.isOpen && (
                  <Text
                    style={[styles.answer, {fontWeight: 800, lineHeight: 20}]}>
                    {faq.Answer}
                  </Text>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f4f4f4',
  },
  content: {
    padding: 16,
    backgroundColor: '#ffffff15',
    margin: 12,
    borderRadius: 24,
    marginTop: 24,
  },
  faqItem: {
    marginBottom: 20,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ffaa0075',
    paddingVertical: 10,
  },
  question: {
    fontFamily: 'Plus Jakarta Sans Bold',
    fontWeight: 900,
    fontSize: 14,
    color: '#FFAA00',
  },
  answer: {
    fontFamily: 'Plus Jakarta Sans SemiBold',
    fontSize: 13,
    color: '#fff',
    marginTop: 10,
  },
});

export default FAQScreen;
