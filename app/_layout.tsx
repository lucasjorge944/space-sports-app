import React, { useEffect, useState, useRef } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Animated } from 'react-native';
import { app } from './config/firebaseConfig';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CustomSplash } from './components/CustomSplash';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

SplashScreen.preventAutoHideAsync();

function useProtectedRoute(user: any, loading: boolean) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    const inAuthGroup = segments[0] === '(auth)';
    if (!user && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (user && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [user, loading, segments]);
}

function RootLayoutNav() {
  const { user, loading } = useAuth();
  useProtectedRoute(user, loading);
  if (loading) {
    return <CustomSplash />;
  }
  return (
    <GluestackUIProvider mode="light">
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
    </GluestackUIProvider>
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
        await SplashScreen.preventAutoHideAsync();
        console.log('Firebase initialized:', !!app);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
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
