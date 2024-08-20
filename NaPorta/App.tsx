import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppLoading from 'expo-app-loading';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import { ThemeProvider } from 'styled-components/native';
import { SignIn } from "./src/screens/SignIN"

import theme from './src/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
        <Text style={styles.text}>Hello, World!</Text>
        <SignIn></SignIn>
        <StatusBar style='auto' />
      </View>
    </ThemeProvider>
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
