import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';

export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search',
  showClear = false,
  onClear,
  showFilter = false,
  onFilterPress,
}) {
  return (
    <View style={styles.container}>
      <Ionicons
        name="search"
        size={18}
        color={colors.placeholder}
        style={styles.searchIcon}
      />

      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />

      {showClear && value?.length > 0 && (
        <TouchableOpacity
          onPress={onClear}
          activeOpacity={0.7}
        >
          <Ionicons
            name="close-circle"
            size={18}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      )}

      {showFilter && (
        <TouchableOpacity
          onPress={onFilterPress}
          activeOpacity={0.7}
        >
          <Ionicons
            name="options-outline"
            size={18}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    height: 48,
    borderRadius: 24,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 15,
  },

  searchIcon: {
    marginRight: 8,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
});