import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import MobileStatusBar from '../../components/MobileStatusBar';
import CustomPopup from '../../components/CustomPopup';
import ForgotPasswordForm from '../../components/ForgotPasswordForm';
import colors from '../../constants/colors';

export default function ForgotPasswordScreen({ navigation }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');

  const [popup, setPopup] = useState({
    visible: false,
    title: '',
    message: '',
    type: 'info',
  });

  const showCustomPopup = (title, message, type = 'info') => {
    setPopup({
      visible: true,
      title,
      message,
      type,
    });
  };

  const handlePopupClose = () => {
    const currentPopupType = popup.type;

    setPopup(prev => ({
      ...prev,
      visible: false,
    }));

    if (currentPopupType === 'success') {
      if (step === 1) {
        setStep(2);
      } else if (step === 2) {
        setStep(3);
      } else if (step === 3) {
        navigation.navigate('Login');
      }
    }
  };

  const handleBack = () => {
    if (step === 1) {
      navigation.goBack();
    } else {
      setStep(prev => prev - 1);
    }
  };

  const getHeader = () => {
    if (step === 1) {
      return [
        'Forgot Password?',
        'Enter your registered email to receive a verification code',
      ];
    }

    if (step === 2) {
      return [
        'Enter OTP',
        `We have sent a 6-digit verification code to ${email}`,
      ];
    }

    return [
      'Reset Password',
      'Create a new password for your account',
    ];
  };

  const [headerTitle, headerSubtitle] = getHeader();

  return (
    <View style={styles.container}>

      <MobileStatusBar />

      {/* ============================================================
          HEADER
      ============================================================ */}

      <View style={styles.headerContainer}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={colors.white}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          {headerTitle}
        </Text>

        <Text style={styles.headerSubtitle}>
          {headerSubtitle}
        </Text>

      </View>

      {/* ============================================================
          FORGOT PASSWORD FORM COMPONENT
      ============================================================ */}

      <ForgotPasswordForm
        step={step}
        setStep={setStep}
        email={email}
        setEmail={setEmail}
        showCustomPopup={showCustomPopup}
      />

      {/* ============================================================
          CUSTOM POPUP
      ============================================================ */}

      <CustomPopup
        visible={popup.visible}
        title={popup.title}
        message={popup.message}
        type={popup.type}
        onClose={handlePopupClose}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },

  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 8,
  },

  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 20,
  },
});
