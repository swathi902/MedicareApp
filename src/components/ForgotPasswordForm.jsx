import React, { useRef, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import InputField from './InputField';
import colors from '../constants/colors';

export default function ForgotPasswordForm({
  step,
  email,
  setEmail,
  showCustomPopup,
}) {
  // ================================================================
  // STATES
  // ================================================================

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('');

  const inputs = useRef([]);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ================================================================
  // STEP 1 - SEND OTP
  // ================================================================

  const handleSendOTP = () => {
    const cleanEmail = email.trim();

    // Email validation
    if (
      !cleanEmail ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)
    ) {
      showCustomPopup(
        'Invalid Email',
        'Please enter a valid email address.',
        'error'
      );
      return;
    }

    setEmail(cleanEmail);

    // Generate 6-digit OTP
    const randomOtp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    setGeneratedOtp(randomOtp);

    // Show OTP popup
    showCustomPopup(
      'OTP Sent',
      `Your verification code is: ${randomOtp}`,
      'success'
    );
  };

  // ================================================================
  // STEP 2 - OTP CHANGE
  // Supports:
  // 1. Normal typing
  // 2. Complete OTP copy/paste
  // ================================================================

  const handleOtpChange = (text, index) => {
    // Allow numbers only
    const value = text.replace(/[^0-9]/g, '');

    // ============================================================
    // COMPLETE OTP COPY/PASTE
    // Example: User copies "123456" and pastes it
    // ============================================================

    if (value.length > 1) {
      const digits = value.slice(0, 6).split('');

      const newOtp = ['', '', '', '', '', ''];

      digits.forEach((digit, i) => {
        newOtp[i] = digit;
      });

      setOtp(newOtp);

      const lastIndex = Math.min(digits.length - 1, 5);

      setTimeout(() => {
        inputs.current[lastIndex]?.focus();
      }, 50);

      return;
    }

    // ============================================================
    // NORMAL SINGLE DIGIT INPUT
    // ============================================================

    const newOtp = [...otp];

    newOtp[index] = value;

    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  // ================================================================
  // OTP BACKSPACE
  // ================================================================

  const handleKeyPress = (event, index) => {
    if (
      event.nativeEvent.key === 'Backspace' &&
      !otp[index] &&
      index > 0
    ) {
      inputs.current[index - 1]?.focus();
    }
  };

  // ================================================================
  // STEP 2 - VERIFY OTP
  // ================================================================

  const handleVerifyOTP = () => {
    // Check empty OTP
    if (otp.some(digit => digit === '')) {
      showCustomPopup(
        'OTP Required',
        'Please enter the verification code.',
        'error'
      );
      return;
    }

    // Combine OTP digits
    const enteredOtp = otp.join('');

    // Check OTP length and numbers
    if (
      enteredOtp.length !== 6 ||
      !/^\d{6}$/.test(enteredOtp)
    ) {
      showCustomPopup(
        'Invalid OTP',
        'Must be a 6-digit code.',
        'error'
      );
      return;
    }

    // Check generated OTP
    if (
      !generatedOtp ||
      enteredOtp !== generatedOtp
    ) {
      showCustomPopup(
        'Invalid OTP',
        'The code you entered is incorrect.',
        'error'
      );
      return;
    }

    // OTP success
    showCustomPopup(
      'Success',
      'OTP Verified Successfully!',
      'success'
    );

    // IMPORTANT:
    // Do not setStep here.
    // Parent ForgotPasswordScreen handles step changes
    // when the success popup is closed.
  };

  // ================================================================
  // STEP 3 - RESET PASSWORD
  // ================================================================

  const handleResetPassword = () => {
    // Password required
    if (!password.trim() || password.length < 6) {
      showCustomPopup(
        'Invalid Password',
        'Password must be at least 6 characters.',
        'error'
      );
      return;
    }

    // Uppercase validation
    if (!/[A-Z]/.test(password)) {
      showCustomPopup(
        'Invalid Password',
        'Must contain at least one uppercase letter.',
        'error'
      );
      return;
    }

    // Lowercase validation
    if (!/[a-z]/.test(password)) {
      showCustomPopup(
        'Invalid Password',
        'Must contain at least one lowercase letter.',
        'error'
      );
      return;
    }

    // Number validation
    if (!/[0-9]/.test(password)) {
      showCustomPopup(
        'Invalid Password',
        'Must contain at least one number.',
        'error'
      );
      return;
    }

    // Confirm password required
    if (!confirmPassword.trim()) {
      showCustomPopup(
        'Confirm Password',
        'Please confirm your new password.',
        'error'
      );
      return;
    }

    // Password match
    if (password !== confirmPassword) {
      showCustomPopup(
        'Password Mismatch',
        'Passwords do not match.',
        'error'
      );
      return;
    }

    // Password reset success
    showCustomPopup(
      'Password Updated',
      'Your password has been reset successfully.',
      'success'
    );

    // IMPORTANT:
    // Do not navigate here.
    // Parent ForgotPasswordScreen handles Login navigation.
  };

  // ================================================================
  // UI
  // ================================================================

  return (
    <View style={styles.formContainer}>

      {/* ============================================================
          STEP 1 - EMAIL
      ============================================================ */}

      {step === 1 && (
        <>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Email Address
            </Text>

            <InputField
              icon="mail-outline"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSendOTP}
            activeOpacity={0.8}
          >
            <Text style={styles.submitButtonText}>
              Send OTP
            </Text>
          </TouchableOpacity>
        </>
      )}

      {/* ============================================================
          STEP 2 - OTP
      ============================================================ */}

      {step === 2 && (
        <>
          <View style={styles.otpRow}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => {
                  inputs.current[index] = ref;
                }}
                style={styles.otpBox}
                keyboardType="number-pad"

                // Allows complete OTP copy/paste
                maxLength={6}

                value={digit}

                onChangeText={text =>
                  handleOtpChange(text, index)
                }

                onKeyPress={event =>
                  handleKeyPress(event, index)
                }

                autoCorrect={false}
                autoCapitalize="none"
              />
            ))}
          </View>

          <Text style={styles.infoText}>
            Please enter the 6-digit code sent to your email.
          </Text>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleVerifyOTP}
            activeOpacity={0.8}
          >
            <Text style={styles.submitButtonText}>
              Verify OTP
            </Text>
          </TouchableOpacity>
        </>
      )}

      {/* ============================================================
          STEP 3 - RESET PASSWORD
      ============================================================ */}

      {step === 3 && (
        <>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              New Password
            </Text>

            <InputField
              icon="lock-closed-outline"
              placeholder="Enter new password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              rightIcon={
                showPassword
                  ? 'eye-off-outline'
                  : 'eye-outline'
              }
              onRightIconPress={() =>
                setShowPassword(prev => !prev)
              }
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Confirm Password
            </Text>

            <InputField
              icon="lock-closed-outline"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              rightIcon={
                showConfirmPassword
                  ? 'eye-off-outline'
                  : 'eye-outline'
              }
              onRightIconPress={() =>
                setShowConfirmPassword(prev => !prev)
              }
            />
          </View>

          <View style={styles.requirementsContainer}>
            <Text style={styles.requirementsTitle}>
              Password must contain:
            </Text>

            <Text style={styles.requirementText}>
              • At least 6 characters{'\n'}
              • At least one uppercase letter{'\n'}
              • At least one lowercase letter{'\n'}
              • At least one number
            </Text>
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleResetPassword}
            activeOpacity={0.8}
          >
            <Text style={styles.submitButtonText}>
              Reset Password
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

// ================================================================
// STYLES
// ================================================================

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    backgroundColor: colors.surface,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 40,
  },

  inputGroup: {
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },

  submitButton: {
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },

  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },

  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 5,
  },

  otpBox: {
    width: 48,
    height: 55,
    borderRadius: 14,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },

  infoText: {
    width: '100%',
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 19,
  },

  requirementsContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: colors.white,
    borderRadius: 12,
  },

  requirementsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },

  requirementText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});