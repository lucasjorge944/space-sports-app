import React, { useEffect, useState, useRef } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { View, Text } from 'react-native';
import { Animated } from 'react-native';
import { CustomSplash } from './components/CustomSplash';

// Mantenha a tela de splash visível enquanto carregamos recursos
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    // ... existing fonts ...
  });

  const [splashAnimationFinished, setSplashAnimationFinished] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    async function prepare() {
      try {
        // Mantenha a splash screen visível enquanto preparamos tudo
        await SplashScreen.preventAutoHideAsync();

        // Aguarde um momento para simular carregamento
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Só inicie a animação quando tudo estiver pronto
        if (fontsLoaded || fontError) {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }).start(() => {
            setSplashAnimationFinished(true);
            SplashScreen.hideAsync();
          });
        }
      }
    }

    prepare();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return <CustomSplash />;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="space/[id]" options={{ headerShown: false }} />
      </Stack>
      {!splashAnimationFinished && (
        <Animated.View
          style={{
            position: 'absolute',
            backgroundColor: '#FFFFFF',
            width: '100%',
            height: '100%',
            opacity: fadeAnim,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999,
          }}
        >
          <CustomSplash />
        </Animated.View>
      )}
      <StatusBar style="auto" />
    </>
  );
}
