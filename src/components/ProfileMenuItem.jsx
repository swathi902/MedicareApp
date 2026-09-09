```jsx
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
  onClose,
  title,
  message,
  type = 'info',

  name,
  email,
  onNameChange,
  onEmailChange,

  onConfirm,
}) {
  const isLogout = type === 'logout';
  const isEdit = type === 'edit';

  const iconName = isLogout
    ? 'log-out-outline'
    : isEdit
    ? 'create-outline'
    : 'information-circle-outline';

  const iconColor = isLogout ? '#EF4444' : colors.primary;

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

              <View style={styles.iconContainer}>
                <Ionicons
                  name={iconName}
                  size={28}
                  color={iconColor}
                />
              </View>

              <Text style={styles.title}>{title}</Text>

              <Text style={styles.message}>{message}</Text>

              {isEdit && (
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Full Name</Text>

                  <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={onNameChange}
                    placeholder="Enter name"
                    placeholderTextColor={colors.placeholder}
                  />

                  <Text style={styles.label}>Email Address</Text>

                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={onEmailChange}
                    placeholder="Enter email"
                    placeholderTextColor={colors.placeholder}
                    keyboardType="email-address"
                  />
                </View>
              )}

              <View style={styles.buttonsRow}>
                {isLogout || isEdit ? (
                  <>
                    <TouchableOpacity
                      style={[styles.button, styles.cancelButton]}
                      onPress={onClose}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.button,
                        isLogout
                          ? styles.logoutButton
                          : styles.confirmButton,
                      ]}
                      onPress={onConfirm}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.confirmText}>
                        {isLogout ? 'Logout' : 'Save Changes'}
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
                    activeOpacity={0.8}
                  >
                    <Text style={styles.confirmText}>Okay</Text>
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
    flexDirection: 'row',
    width: '100%',
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

  logoutButton: {
    backgroundColor: '#EF4444',
  },

  confirmText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
});
```
