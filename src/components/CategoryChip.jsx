import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default function CategoryChip({
  title,
  selected = false,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        selected && styles.selectedChip,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.text,
          selected && styles.selectedText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },

  selectedChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  text: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },

  selectedText: {
    color: colors.white,
  },
});