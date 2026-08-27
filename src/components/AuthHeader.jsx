import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './AuthHeader.styles';

export default function AuthHeader({ title }) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.leftLobe} />
      <View style={styles.rightLobe} />
      <View style={styles.outerCircle}>
        <View style={styles.innerWhiteCircle}>
          <View style={styles.photoPlaceholder} />
        </View>
      </View>
    </View>
  );
}
