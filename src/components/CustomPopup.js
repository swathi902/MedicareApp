import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';

export default function CustomPopup({
  visible,
  title,
  message,
  type = 'info',
  onClose,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.popupOverlay}>
        <View style={styles.popupContainer}>

          {/* Popup Icon */}
          <View
            style={[
              styles.popupIcon,
              type === 'success'
                ? styles.successIcon
                : type === 'error'
                  ? styles.errorIcon
                  : styles.infoIcon,
            ]}
          >
            <Text style={styles.popupIconText}>
              {type === 'success'
                ? '✓'
                : type === 'error'
                  ? '!'
                  : 'i'}
            </Text>
          </View>

          {/* Popup Title */}
          <Text style={styles.popupTitle}>
            {title}
          </Text>

          {/* Popup Message */}
          <Text style={styles.popupMessage}>
            {message}
          </Text>

          {/* Popup Button */}
          <TouchableOpacity
            style={styles.popupButton}
            onPress={onClose}
            activeOpacity={0.85}
          >
            <Text style={styles.popupButtonText}>
              OK
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },

  popupContainer: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingHorizontal: 25,
    paddingVertical: 28,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },

  popupIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },

  successIcon: {
    backgroundColor: '#DCFCE7',
  },

  errorIcon: {
    backgroundColor: '#FEE2E2',
  },

  infoIcon: {
    backgroundColor: '#DBEAFE',
  },

  popupIconText: {
    fontSize: 30,
    fontWeight: '800',
    color: '#0066FE',
  },

  popupTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10,
    textAlign: 'center',
  },

  popupMessage: {
    fontSize: 15.5,
    fontWeight: '500',
    color: '#64748B',
    lineHeight: 23,
    textAlign: 'center',
    marginBottom: 22,
  },

  popupButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#0066FE',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  popupButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

