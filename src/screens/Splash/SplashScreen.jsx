import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import MobileStatusBar from '../../components/MobileStatusBar';

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
        <Text style={styles.tagline}>Your Health, Simplified</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DEE5FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    width: 52,
    height: 52,
    marginRight: 6,
  },
  logoText: {
    fontSize: 42,
    fontWeight: '800',
    color: '#0066FF',
    letterSpacing: -0.8,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  tagline: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '600',
    color: '#4B5563',
    letterSpacing: 0.2,
  },
});