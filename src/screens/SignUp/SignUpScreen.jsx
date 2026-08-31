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
} from 'react-native';

import AuthHeader from '../../components/AuthHeader';
import InputField from '../../components/InputField';
import MobileStatusBar from '../../components/MobileStatusBar';
import { styles } from './styles';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Popup states
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('');

  const showCustomPopup = (title, message, type = 'info') => {
    setPopupTitle(title);
    setPopupMessage(message);
    setPopupType(type);
    setShowPopup(true);
  };

  const onSubmit = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
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

    // After successful signup, go to Login
    if (popupType === 'success') {
      navigation.navigate('Login');
    }
  };

  const handleForgotPassword = () => {
    showCustomPopup(
      'Reset Password',
      'Password reset email sent.',
      'info'
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <MobileStatusBar />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        <AuthHeader title={'Sign Up for a Smarter,\nHealthier You'} />

        {/* Round Profile Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../assets/Doctor2.jpg')}
            style={styles.headerImage}
            resizeMode="cover"
          />
        </View>

        {/* Sign Up Form */}
        <View style={styles.form}>
          <InputField
            icon="person"
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
          />

          <InputField
            icon="mail"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <InputField
            icon="lock-closed"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {/* Forgot Password */}
          <TouchableOpacity
            style={styles.forgotBtn}
            onPress={handleForgotPassword}
            activeOpacity={0.7}
          >
            <Text style={styles.forgotText}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

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
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.footerLink}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* ================= CUSTOM POPUP ================= */}
      <Modal
        visible={showPopup}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowPopup(false)}
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

