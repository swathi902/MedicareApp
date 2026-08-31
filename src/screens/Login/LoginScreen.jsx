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

export default function LoginScreen({ navigation }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [popupMessage, setPopupMessage] = useState('');

  const onLogin = () => {
    if (!user.trim() || !password.trim()) {
      setPopupTitle('Missing Info');
      setPopupMessage('Please enter your username and password.');
      setShowPopup(true);
      return;
    }

    setPopupTitle('Welcome Back');
    setPopupMessage(`Logged in successfully as ${user}`);
    setShowPopup(true);
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
        <AuthHeader title={'Your Health, Just a Login\nAway'} />

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
          <InputField
            icon="person"
            placeholder="Enter username or email"
            value={user}
            onChangeText={setUser}
          />

          <InputField
            icon="lock-closed"
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={onLogin}
            activeOpacity={0.88}
          >
            <Text style={styles.primaryBtnText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>
              Don't have account?{' '}
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('SignUp')}
            >
              <Text style={styles.footerLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Custom Popup */}
      <Modal
        visible={showPopup}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowPopup(false)}
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
              onPress={() => setShowPopup(false)}
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





