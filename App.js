import './global.css';
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import DeviceFrame from './src/components/DeviceFrame';

export default function App() {
  return (
    <DeviceFrame>
      <AppNavigator />
    </DeviceFrame>
  );
}
