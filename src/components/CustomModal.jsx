import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';

export default function CustomModal({
  visible,
  config,
  name,
  email,
  setName,
  setEmail,
  onClose,
  onLogout,
}) {
  const isEdit = config.type === 'edit';
  const isLogout = config.type === 'logout';

  const iconName = isLogout
    ? 'log-out-outline'
    : isEdit
      ? 'create-outline'
      : 'information-circle-outline';

  const iconColor = isLogout
    ? '#EF4444'
    : colors.primary;

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>

              {/* Icon */}
              <View style={styles.iconContainer}>
                <Ionicons
                  name={iconName}
                  size={28}
                  color={iconColor}
                />
              </View>

              {/* Title */}
              <Text style={styles.title}>
                {config.title}
              </Text>

              {/* Message */}
              <Text style={styles.message}>
                {config.message}
              </Text>

              {/* Edit Profile */}
              {isEdit && (
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>
                    Full Name
                  </Text>

                  <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter name"
                    placeholderTextColor={colors.placeholder}
                  />

                  <Text style={styles.label}>
                    Email Address
                  </Text>

                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter email"
                    placeholderTextColor={colors.placeholder}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              )}

              {/* Buttons */}
              <View style={styles.buttonsRow}>

                {isLogout ? (
                  <>
                    <TouchableOpacity
                      style={[
                        styles.button,
                        styles.cancelButton,
                      ]}
                      onPress={onClose}
                    >
                      <Text style={styles.cancelText}>
                        Cancel
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.button,
                        styles.logoutButton,
                      ]}
                      onPress={onLogout}
                    >
                      <Text style={styles.logoutText}>
                        Logout
                      </Text>
                    </TouchableOpacity>
                  </>
                ) : isEdit ? (
                  <>
                    <TouchableOpacity
                      style={[
                        styles.button,
                        styles.cancelButton,
                      ]}
                      onPress={onClose}
                    >
                      <Text style={styles.cancelText}>
                        Cancel
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.button,
                        styles.confirmButton,
                      ]}
                      onPress={onClose}
                    >
                      <Text style={styles.confirmText}>
                        Save Changes
                      </Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity
                    style={[
                      styles.button,
                      styles.confirmButton,
                      styles.fullButton,
                    ]}
                    onPress={onClose}
                  >
                    <Text style={styles.confirmText}>
                      Okay
                    </Text>
                  </TouchableOpacity>
                )}

              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  container: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    elevation: 10,
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },

  message: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },

  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },

  label: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 6,
  },

  input: {
    height: 44,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: colors.text,
    marginBottom: 12,
  },

  buttonsRow: {
    width: '100%',
    flexDirection: 'row',
  },

  button: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },

  fullButton: {
    flex: 1,
  },

  cancelButton: {
    backgroundColor: '#F1F5F9',
  },

  cancelText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },

  confirmButton: {
    backgroundColor: colors.primary,
  },

  confirmText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },

  logoutButton: {
    backgroundColor: '#EF4444',
  },

  logoutText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
});