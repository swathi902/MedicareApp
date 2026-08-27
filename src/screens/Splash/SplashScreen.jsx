import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import MobileStatusBar from '../../components/MobileStatusBar';
import { styles } from './styles';

export default function SplashScreen({ navigation }) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={() => navigation.navigate('OnboardingOne')}
    >
      <MobileStatusBar />
      <View style={styles.centerContainer}>
        <View style={styles.logoRow}>
          <Image
            source={require('../../../assets/image.png')}
            style={styles.logoIcon}
            resizeMode="contain"
          />
          <Text style={styles.logoText}>ediCare</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
