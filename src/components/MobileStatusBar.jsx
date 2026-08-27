import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MobileStatusBar({ theme = 'dark' }) {
  const isLight = theme === 'light';
  const textColor = isLight ? '#FFFFFF' : '#000000';
  const iconColor = isLight ? '#FFFFFF' : '#000000';

  return (
    <View style={styles.statusBarContainer} pointerEvents="none">
      {/* Time */}
      <View style={styles.leftContainer}>
        <Text style={[styles.timeText, { color: textColor }]}>9:41 AM</Text>
      </View>

      {/* Dynamic Island */}
      <View style={styles.dynamicIsland} />

      {/* Icons */}
      <View style={styles.rightContainer}>
        {/* Signal Bars */}
        <View style={styles.signalContainer}>
          <View style={[styles.signalBar, { height: 3.5, backgroundColor: iconColor }]} />
          <View style={[styles.signalBar, { height: 5.5, backgroundColor: iconColor }]} />
          <View style={[styles.signalBar, { height: 7.5, backgroundColor: iconColor }]} />
          <View style={[styles.signalBar, { height: 9.5, backgroundColor: iconColor }]} />
        </View>

        {/* WiFi Icon */}
        <View style={styles.wifiContainer}>
          <View style={[styles.wifiArcOuter, { borderColor: iconColor }]} />
          <View style={[styles.wifiArcInner, { borderColor: iconColor }]} />
          <View style={[styles.wifiDot, { backgroundColor: iconColor }]} />
        </View>

        {/* Battery */}
        <View style={styles.batteryContainer}>
          <View style={[styles.batteryBody, { borderColor: iconColor }]}>
            <View style={[styles.batteryFill, { backgroundColor: iconColor }]} />
          </View>
          <View style={[styles.batteryCap, { backgroundColor: iconColor }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statusBarContainer: {
    width: '100%',
    height: 48,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: 'transparent',
  },
  leftContainer: { width: 75, justifyContent: 'center' },
  timeText: { fontSize: 14, fontWeight: '700', letterSpacing: -0.2 },
  dynamicIsland: { width: 104, height: 27, backgroundColor: '#000000', borderRadius: 14 },
  rightContainer: { width: 75, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 5.5 },
  signalContainer: { flexDirection: 'row', alignItems: 'flex-end', height: 10, gap: 1.5 },
  signalBar: { width: 2.5, borderRadius: 0.5 },
  wifiContainer: { width: 15, height: 11, alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' },
  wifiArcOuter: { width: 15, height: 15, borderRadius: 7.5, borderTopWidth: 2, borderLeftWidth: 2, borderRightWidth: 2, position: 'absolute', top: -2, transform: [{ rotate: '45deg' }] },
  wifiArcInner: { width: 9, height: 9, borderRadius: 4.5, borderTopWidth: 2, borderLeftWidth: 2, borderRightWidth: 2, position: 'absolute', top: 2, transform: [{ rotate: '45deg' }] },
  wifiDot: { width: 2.5, height: 2.5, borderRadius: 1.5, position: 'absolute', bottom: 0 },
  batteryContainer: { flexDirection: 'row', alignItems: 'center' },
  batteryBody: { width: 21, height: 11, borderWidth: 1.2, borderRadius: 3, padding: 1, justifyContent: 'center' },
  batteryFill: { width: '100%', height: '100%', borderRadius: 1.5 },
  batteryCap: { width: 1.5, height: 4, borderTopRightRadius: 1, borderBottomRightRadius: 1, marginLeft: 0.5 },
});
