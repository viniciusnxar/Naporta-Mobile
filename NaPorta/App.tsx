import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppLoading from 'expo-app-loading';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
export default function App() {
  const [fonts] = [
    useFonts({
      Roboto_400Regular,
    }),
  ];

  if (!fonts) {
    return <AppLoading />;
  }
  return <View></View>;
}
