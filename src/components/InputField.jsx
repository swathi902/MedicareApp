import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function InputField({
  icon,
  placeholder = '',
  secureTextEntry = false,
  value,
  onChangeText,
  keyboardType = 'default',
}) {
  return (
    <View style={styles.container}>
      {icon ? <Ionicons name={icon} size={20} color="#9E9E9E" style={styles.icon} /> : null}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: 56,
    borderRadius: 28,
    paddingHorizontal: 22,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
  },
  icon: { marginRight: 14 },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1E293B',
    paddingVertical: 0,
    fontWeight: '500',
  },
});
