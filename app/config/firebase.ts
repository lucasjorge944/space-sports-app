import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBfNZojAQZTEqrkLdvXt2VYNN6cS_sMgCo',
  authDomain: 'sports-space-344db.firebaseapp.com',
  projectId: 'sports-space-344db',
  storageBucket: 'sports-space-344db.firebasestorage.app',
  messagingSenderId: '245738778317',
  appId: '1:245738778317:web:98b0288258836854800384',
  measurementId: 'G-6X3VNMXSP6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services with React Native persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
