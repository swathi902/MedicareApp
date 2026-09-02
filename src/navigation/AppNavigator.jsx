import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/Splash/SplashScreen';

import {
  OnboardingOneScreen,
  OnboardingTwoScreen,
} from '../screens/OnboardingScreens/OnboardingScreens';

import SignUpScreen from '../screens/SignUp/SignUpScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import SearchScreen from '../screens/Search/SearchScreen'; 
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const navRef = useNavigationContainerRef();
  const [currentScreen, setCurrentScreen] = useState('Splash');

  const screens = [
    { key: 'Splash', label: 'Splash' },
    { key: 'OnboardingOne', label: 'Intro 1' },
    { key: 'OnboardingTwo', label: 'Intro 2' },
    { key: 'SignUp', label: 'Sign Up' },
    { key: 'Login', label: 'Login' },
    { key: 'Home', label: 'Home' },
    { key: 'Search', label: 'Search' },
    { key: 'Profile', label: 'Profile' },
  ];

  return (
    <View style={styles.wrapper}>
      <NavigationContainer
        ref={navRef}
        onStateChange={() => {
          const name = navRef.getCurrentRoute()?.name;

          if (name) {
            setCurrentScreen(name);
          }
        }}
      >
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            animation: 'fade',
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="OnboardingOne" component={OnboardingOneScreen} />
          <Stack.Screen name="OnboardingTwo" component={OnboardingTwoScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>

      <View style={styles.floatingSwitcher}>
        {screens.map((item) => (
          <TouchableOpacity
            key={item.key}
            style={[
              styles.switchBtn,
              currentScreen === item.key && styles.switchBtnActive,
            ]}
            onPress={() => navRef.navigate(item.key)}
          >
            <Text
              style={[
                styles.switchBtnText,
                currentScreen === item.key && styles.switchBtnTextActive,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, position: 'relative' },
  floatingSwitcher: { position: 'absolute', bottom: 24, alignSelf: 'center', flexDirection: 'row', backgroundColor: 'rgba(15, 23, 42, 0.85)', borderRadius: 20, padding: 4, zIndex: 9999, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 6, elevation: 8 },
  switchBtn: { paddingHorizontal: 7, paddingVertical: 5, borderRadius: 14 },
  switchBtnActive: { backgroundColor: '#0066FE' },
  switchBtnText: { color: '#94A3B8', fontSize: 10, fontWeight: '700' },
  switchBtnTextActive: { color: '#FFFFFF' },
});