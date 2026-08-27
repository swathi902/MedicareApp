import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import AuthHeader from '../../components/AuthHeader';
import InputField from '../../components/InputField';
import MobileStatusBar from '../../components/MobileStatusBar';
import { styles } from './styles';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      return Alert.alert('Missing Info', 'Please fill in all fields.');
    }
    Alert.alert('Success', 'Account created successfully!');
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <MobileStatusBar />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} bounces={false}>
        <AuthHeader title={'Sign Up for a Smarter,\nHealthier You'} />
        <View style={styles.form}>
          <InputField icon="person" placeholder="Type something here..." value={name} onChangeText={setName} />
          <InputField icon="mail" placeholder="Type something here..." value={email} onChangeText={setEmail} keyboardType="email-address" />
          <InputField icon="lock-closed" placeholder="Type something here..." value={password} onChangeText={setPassword} secureTextEntry />
          <TouchableOpacity style={styles.forgotBtn} onPress={() => Alert.alert('Reset', 'Password reset email sent.')} activeOpacity={0.7}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryBtn} onPress={onSubmit} activeOpacity={0.88}>
            <Text style={styles.primaryBtnText}>Get Started</Text>
          </TouchableOpacity>
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Already have account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
