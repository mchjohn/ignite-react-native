import React from 'react';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';
import { StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import { Routes } from './src/routes';

import { AuthProvider, useAuth } from './src/hooks/auth';

import theme from './src/global/styles/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });
  const { isLoading } = useAuth();

  if (!fontsLoaded || isLoading) return <AppLoading />;

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <StatusBar barStyle='light-content' />
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
