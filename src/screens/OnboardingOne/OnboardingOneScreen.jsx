import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MobileStatusBar from '../../components/MobileStatusBar';
import { styles } from './styles';

export default function OnboardingOneScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <MobileStatusBar theme="dark" />

      <View style={styles.header}>
        <Text style={styles.title}>
          A Smarter Way to Manage{ '\n' }Your Health
        </Text>
      </View>

      <View style={styles.imageArea} />

      <View style={styles.card}>
        <Text style={styles.description}>
          With features like automation, reminders,{ '\n' }
          and data integration, we help you make{ '\n' }
          smarter choices every day.
        </Text>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.88}
          onPress={() => navigation.navigate('OnboardingTwo')}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
