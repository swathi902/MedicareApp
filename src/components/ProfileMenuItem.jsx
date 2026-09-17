import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';

export default function ProfileMenuItem({
  icon,
  title,
  onPress,
  danger = false,
}) {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.left}>
        <Ionicons
          name={icon}
          size={20}
          color={danger ? '#EF4444' : colors.primary}
        />

        <Text
          style={[
            styles.text,
            danger && styles.dangerText,
          ]}
        >
          {title}
        </Text>
      </View>

      {!danger && (
        <Ionicons
          name="chevron-forward"
          size={16}
          color={colors.textSecondary}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  text: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 12,
  },

  dangerText: {
    color: '#EF4444',
  },
});