import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Modal,
  StyleSheet,
} from 'react-native';

import AuthHeader from '../../components/AuthHeader';
import InputField from '../../components/InputField';
import MobileStatusBar from '../../components/MobileStatusBar';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Popup states
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('');

  const showCustomPopup = (
    title,
    message,
    type = 'info'
  ) => {
    setPopupTitle(title);
    setPopupMessage(message);
    setPopupType(type);
    setShowPopup(true);
  };

  const onSubmit = () => {
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      showCustomPopup(
        'Missing Info',
        'Please fill in all fields.',
        'error'
      );
      return;
    }

    showCustomPopup(
      'Success',
      'Account created successfully!',
      'success'
    );
  };

  const handlePopupClose = () => {
    setShowPopup(false);

    if (popupType === 'success') {
      navigation.navigate('Login');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }
    >
      <MobileStatusBar />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        <AuthHeader
          title={'Sign Up for a Smarter,\nHealthier You'}
        />

        {/* Round Profile Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../assets/Doctor2.jpg')}
            style={styles.headerImage}
            resizeMode="contain"
          />
        </View>

        {/* Sign Up Form */}
        <View style={styles.form}>
          {/* Name */}
          <InputField
            icon="person"
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
          />

          {/* Email */}
          <InputField
            icon="mail"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          {/* Password */}
          <InputField
            icon="lock-closed"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            rightIcon={
              showPassword
                ? 'eye-off'
                : 'eye'
            }
            onRightIconPress={() =>
              setShowPassword(
                prev => !prev
              )
            }
          />

          {/* Get Started */}
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={onSubmit}
            activeOpacity={0.88}
          >
            <Text style={styles.primaryBtnText}>
              Get Started
            </Text>
          </TouchableOpacity>

          {/* Sign In */}
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>
              Already have account?{' '}
            </Text>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Login')
              }
            >
              <Text style={styles.footerLink}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Custom Popup */}
      <Modal
        visible={showPopup}
        transparent={true}
        animationType="fade"
        onRequestClose={() =>
          setShowPopup(false)
        }
      >
        <View style={styles.popupOverlay}>
          <View style={styles.popupContainer}>

            {/* Popup Icon */}
            <View
              style={[
                styles.popupIcon,
                popupType === 'success'
                  ? styles.successIcon
                  : popupType === 'error'
                    ? styles.errorIcon
                    : styles.infoIcon,
              ]}
            >
              <Text style={styles.popupIconText}>
                {popupType === 'success'
                  ? '✓'
                  : popupType === 'error'
                    ? '!'
                    : 'i'}
              </Text>
            </View>

            {/* Popup Title */}
            <Text style={styles.popupTitle}>
              {popupTitle}
            </Text>

            {/* Popup Message */}
            <Text style={styles.popupMessage}>
              {popupMessage}
            </Text>

            {/* Popup Button */}
            <TouchableOpacity
              style={styles.popupButton}
              onPress={handlePopupClose}
              activeOpacity={0.85}
            >
              <Text style={styles.popupButtonText}>
                OK
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DEE5FF',
  },

  scrollContent: {
    paddingBottom: 40,
    flexGrow: 1,
  },

  imageContainer: {
    alignSelf: 'center',
    width: 95,
    height: 95,
    borderRadius: 47.5,
    overflow: 'hidden',
    marginTop: -47.5,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    zIndex: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  headerImage: {
    width: '100%',
    height: '100%',
  },

  form: {
    marginTop: 15,
    paddingHorizontal: 22,
  },

  primaryBtn: {
    backgroundColor: '#0066FE',
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,

    shadowColor: '#0066FE',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },

  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  footerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },

  footerLink: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0066FE',
  },

  // =====================================
  // CUSTOM POPUP
  // =====================================

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

