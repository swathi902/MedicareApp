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

export default function LoginScreen({ navigation }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    if (!user.trim() || !password.trim()) {
      return Alert.alert('Missing Info', 'Please enter your username and password.');
    }
    Alert.alert('Welcome Back', `Logged in successfully as ${user}`);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <MobileStatusBar />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} bounces={false}>
        <AuthHeader title={'Your Health, Just a Login\nAway'} />
        <View style={styles.form}>
          <InputField icon="person" placeholder="Type something here..." value={user} onChangeText={setUser} />
          <InputField icon="lock-closed" placeholder="Type something here..." value={password} onChangeText={setPassword} secureTextEntry />
          <TouchableOpacity style={styles.primaryBtn} onPress={onLogin} activeOpacity={0.88}>
            <Text style={styles.primaryBtnText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Don't have account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.footerLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
