import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function HomeIndicator({ color = '#E5E5EA' }) {
  return (
    <View style={styles.container} pointerEvents="none">
      <View style={[styles.bar, { backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 6,
    zIndex: 999,
  },
  bar: { width: 134, height: 5, borderRadius: 100 },
});
