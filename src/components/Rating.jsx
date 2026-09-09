import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';

export default function Rating({
  rating,
  reviews,
  size = 13,
}) {
  return (
    <View style={styles.container}>
      <Ionicons
        name="star"
        size={size}
        color={colors.warning}
      />

      <Text style={styles.rating}>
        {rating}
      </Text>

      {reviews && (
        <Text style={styles.reviews}>
          ({reviews})
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rating: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
    marginLeft: 4,
  },

  reviews: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 3,
  },
});