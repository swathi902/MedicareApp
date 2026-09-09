import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';

export default function EmptyState({
  icon = 'search-outline',
  message = 'No results found',
}) {
  return (
    <View style={styles.container}>
      <Ionicons
        name={icon}
        size={40}
        color={colors.placeholder}
      />

      <Text style={styles.text}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },

  text: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 10,
  },
});