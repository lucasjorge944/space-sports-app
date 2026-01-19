// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
//@ts-ignore
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBfNZojAQZTEqrkLdvXt2VYNN6cS_sMgCo',
  authDomain: 'sports-space-344db.firebaseapp.com',
  projectId: 'sports-space-344db',
  storageBucket: 'sports-space-344db.firebasestorage.app',
  messagingSenderId: '245738778317',
  appId: '1:245738778317:web:98b0288258836854800384',
  measurementId: 'G-6X3VNMXSP6',
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);
export { app, db, auth };
