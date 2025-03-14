import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB33cmpYGPxALEJZHlFtb6qT56uacRjH0M',
  authDomain: 'space-sports-a6aa5.firebaseapp.com',
  projectId: 'space-sports-a6aa5',
  storageBucket: 'space-sports-a6aa5.firebasestorage.app',
  messagingSenderId: '301832539995',
  appId: '1:301832539995:web:0074e2df63183127a2547e',
  measurementId: 'G-FVCNH18D0L',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
