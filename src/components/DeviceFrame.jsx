import React from 'react';
import { View, StyleSheet, useWindowDimensions, Platform } from 'react-native';
import HomeIndicator from './HomeIndicator';

export default function DeviceFrame({ children }) {
  const { width } = useWindowDimensions();
  const isDesktop = width > 500;

  if (!isDesktop) {
    return <View style={styles.mobileFullContainer}>{children}<HomeIndicator color="#E5E5EA" /></View>;
  }

  return <View style={styles.desktopOuter}><View style={styles.deviceWrapper}><View style={styles.deviceScreen}>{children}<HomeIndicator color="#E5E5EA" /></View></View></View>;
}

const styles = StyleSheet.create({
  mobileFullContainer: { flex: 1, backgroundColor: '#FFFFFF', width: '100%', height: '100%' },
  desktopOuter: { flex: 1, backgroundColor: '#0F172A', alignItems: 'center', justifyContent: 'center', padding: 16, width: '100%', height: Platform.OS === 'web' ? '100vh' : '100%' },
  deviceWrapper: { width: '100%', maxWidth: 412, height: '100%', maxHeight: 860, borderRadius: 48, borderWidth: 8, borderColor: '#1E293B', backgroundColor: '#000000', overflow: 'hidden', shadowColor: '#000000', shadowOffset: { width: 0, height: 25 }, shadowOpacity: 0.5, shadowRadius: 35, elevation: 20 },
  deviceScreen: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 40, overflow: 'hidden', position: 'relative' },
});
