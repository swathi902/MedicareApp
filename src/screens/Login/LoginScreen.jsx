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
import colors from '../../constants/colors';

export default function LoginScreen({ navigation }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Popup states
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [popupMessage, setPopupMessage] = useState('');

  const onLogin = () => {
    if (!user.trim() || !password.trim()) {
      setPopupTitle('Missing Info');
      setPopupMessage(
        'Please enter your username and password.'
      );
      setShowPopup(true);
      return;
    }

    setPopupTitle('Welcome Back');
    setPopupMessage(
      `Logged in successfully as ${user}`
    );
    setShowPopup(true);
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
          title={'Your Health, Just a Login\nAway'}
        />

        {/* Round Profile Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../assets/Doctor1.jpg')}
            style={styles.headerImage}
            resizeMode="cover"
          />
        </View>

        {/* Login Form */}
        <View style={styles.form}>

          {/* Username / Email */}
          <InputField
            icon="person"
            placeholder="Enter username or email"
            value={user}
            onChangeText={setUser}
          />

          {/* Password */}
          <InputField
            icon="lock-closed"
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            rightIcon={
              showPassword
                ? 'eye-off'
                : 'eye'
            }
            onRightIconPress={() =>
              setShowPassword(prev => !prev)
            }
          />

          {/* Login Button */}
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={onLogin}
            activeOpacity={0.88}
          >
            <Text style={styles.primaryBtnText}>
              Login
            </Text>
          </TouchableOpacity>

          {/* Sign Up */}
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>
              Don't have account?{' '}
            </Text>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('SignUp')
              }
              activeOpacity={0.7}
            >
              <Text style={styles.footerLink}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>

      {/* Custom Popup */}
      <Modal
        visible={showPopup}
        transparent
        animationType="fade"
        onRequestClose={() =>
          setShowPopup(false)
        }
      >
        <View style={styles.popupOverlay}>
          <View style={styles.popupContainer}>

            <Text style={styles.popupTitle}>
              {popupTitle}
            </Text>

            <Text style={styles.popupMessage}>
              {popupMessage}
            </Text>

            <TouchableOpacity
              style={styles.popupButton}
              onPress={() => {
                setShowPopup(false);
                navigation.navigate('Home');
              }}
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


// ======================================================
// STYLES
// ======================================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },

  scrollContent: {
    paddingBottom: 40,
    flexGrow: 1,
  },

  imageContainer: {
    alignSelf: 'center',
    width: 90,
    height: 90,
    borderRadius: 45,
    overflow: 'hidden',
    marginTop: -45,
    backgroundColor: colors.primary,
    zIndex: 10,
    elevation: 10,
    shadowColor: colors.black,
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
    marginTop: 20,
    paddingHorizontal: 22,
    flex: 1,
  },

  primaryBtn: {
    backgroundColor: colors.primary,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 24,

    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,

    elevation: 4,
  },

  primaryBtnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },

  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    paddingBottom: 16,
  },

  footerText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },

  footerLink: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },

  // =========================
  // Custom Popup Styles
  // =========================

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
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',

    elevation: 8,

    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },

  popupTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },

  popupMessage: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textSecondary,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 22,
  },

  popupButton: {
    width: '100%',
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  popupButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },

});