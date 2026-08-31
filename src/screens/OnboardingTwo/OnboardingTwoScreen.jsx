import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import MobileStatusBar from '../../components/MobileStatusBar';
import { styles } from './styles';

export default function OnboardingTwoScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <MobileStatusBar theme="dark" />

      <View style={styles.header}>
        <Text style={styles.title}>
          Connecting You with the{ '\n' }Right Care
        </Text>
      </View>

      <View style={styles.imageArea}>
        <Image 
          source={require('../../../assets/Healthcare1.png')} 
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.description}>
          Our app connects you with the right{ '\n' }
          doctors and healthcare professionals based{ '\n' }
          on your specific needs.
        </Text>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.88}
          onPress={() => navigation.replace('SignUp')}
        >
          <Text style={styles.buttonText}>Start Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}