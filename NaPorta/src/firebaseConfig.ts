import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage

// Carregar as variáveis de ambiente usando o Expo Constants
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_I,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKE,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_I,
  appId: process.env.FIREBASE_APP_I,
  measurementId: process.env.FIREBASE_MEASUREMENT_I,
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

// Inicializar a autenticação com persistência
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { firestore, storage, auth };
