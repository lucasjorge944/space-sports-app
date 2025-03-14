import React, { useEffect, useState, useRef } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { View, Text } from 'react-native';
import { Animated } from 'react-native';
import { CustomSplash } from './components/CustomSplash';
import app from './config/firebase';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Mantenha a tela de splash visível enquanto carregamos recursos
SplashScreen.preventAutoHideAsync();

function useProtectedRoute(user: any) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup) {
      // Redirect to the sign-in page if not signed in
      router.replace('/(auth)/login');
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page if signed in
      router.replace('/(tabs)');
    }
  }, [user, segments]);
}

function RootLayoutNav() {
  const { user } = useAuth();
  useProtectedRoute(user);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="space/[id]"
        options={{
          headerShown: false,
          presentation: 'card',
        }}
      />
      <Stack.Screen
        name="(modals)/booking"
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(modals)/location"
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(modals)/enrollment"
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
    </Stack>
  );
}

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

        // Inicialize o Firebase e aguarde um momento para simular carregamento
        console.log('Firebase initialized:', !!app);
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
    <AuthProvider>
      <>
        <RootLayoutNav />
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
    </AuthProvider>
  );
}
