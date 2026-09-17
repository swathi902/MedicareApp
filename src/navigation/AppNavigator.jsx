import React, { useState } from 'react';
import { View } from 'react-native';
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
import ForgotPasswordScreen from '../screens/ForgotPassword/ForgotPasswordScreen'; 
import HomeScreen from '../screens/Home/HomeScreen';
import SearchScreen from '../screens/Search/SearchScreen'; 
import ProfileScreen from '../screens/Profile/ProfileScreen';
import CalendarScreen from '../screens/Calendar/CalendarScreen';
import ScheduleScreen from '../screens/ScheduleScreen/ScheduleScreen';
import VideoConsultationScreen from '../screens/VideoConsultationScreen/VideoConsultationScreen';

import ChatConsultationScreen from '../screens/ChatConsultation/ChatConsultationScreen';
import HealthSummaryScreen from '../screens/HealthSummary/HealthSummaryScreen';
import BottomNavigation from '../components/BottomNavigation';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const navRef = useNavigationContainerRef();
  const [currentScreen, setCurrentScreen] = useState('Splash');

  const mainTabs = ['Home', 'Search', 'Calendar', 'Profile'];
  const showBottomNav = mainTabs.includes(currentScreen);

  return (
    <View style={{ flex: 1 }}>
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
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Calendar" component={CalendarScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="ScheduleScreen" component={ScheduleScreen} />
          <Stack.Screen name="VideoConsultationScreen" component={VideoConsultationScreen} />
          <Stack.Screen name="ChatConsultationScreen" component={ChatConsultationScreen} />
          <Stack.Screen name="HealthSummaryScreen" component={HealthSummaryScreen} />
        </Stack.Navigator>
      </NavigationContainer>

      {/* Renders your custom bottom bar only on main screens */}
      {showBottomNav && (
        <BottomNavigation navigation={navRef} activeTab={currentScreen} />
      )}
    </View>
  );
}