/**
 * Cat Tinder App
 * A Tinder-like app for cats using The Cat API
 *
 * @format
 */

import React from 'react';
import { LogBox, StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import App from './src/App';

function MainApp() {
  LogBox.ignoreAllLogs();
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <App />
    </SafeAreaProvider>
  );
}

export default MainApp;
