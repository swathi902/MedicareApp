import './global.css';
import React, { useState, useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import DeviceFrame from './src/components/DeviceFrame';
import { registerForPushNotificationsAsync } from './src/services/notificationService';

export default function App() {
useEffect(() => {
  registerForPushNotificationsAsync();
}, []);
  return (
    <DeviceFrame>
      <AppNavigator />
    </DeviceFrame>
  );
}
