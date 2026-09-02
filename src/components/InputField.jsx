import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function InputField({
  icon,
  placeholder = '',
  secureTextEntry = false,
  value,
  onChangeText,
  keyboardType = 'default',

  // Password eye icon props
  rightIcon,
  onRightIconPress,
}) {
  return (
    <View style={styles.container}>
      
      {/* Left Icon */}
      {icon ? (
        <Ionicons
          name={icon}
          size={20}
          color="#9E9E9E"
          style={styles.icon}
        />
      ) : null}

      {/* Text Input */}
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

      {/* Right Eye Icon */}
      {rightIcon ? (
        <TouchableOpacity
          style={styles.rightIconButton}
          onPress={onRightIconPress}
          activeOpacity={0.7}
        >
          <Ionicons
            name={rightIcon}
            size={21}
            color="#64748B"
          />
        </TouchableOpacity>
      ) : null}
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 5,

    elevation: 2,
  },

  // Left icon
  icon: {
    marginRight: 14,
  },

  // Input
  input: {
    flex: 1,

    fontSize: 15,
    color: '#1E293B',

    paddingVertical: 0,

    fontWeight: '500',
  },

  // Right eye button
  rightIconButton: {
    width: 40,
    height: 56,

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: -10,
  },
});

