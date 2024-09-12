import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppLoading from 'expo-app-loading';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import { ThemeProvider } from 'styled-components/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SignIn } from './src/screens/SignIN';
import { AuthProvider } from '@src/hooks/auth';

import theme from './src/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <StatusBar style='light' translucent backgroundColor='transparent' />
        <AuthProvider>
          <SignIn />
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.COLORS.BACKGROUND, // Exemplo de uso de theme diretamente
  },
  text: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 20,
    backgroundColor: theme.COLORS.PRIMARY_900,
  },
});
