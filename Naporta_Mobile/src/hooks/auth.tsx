import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';

import { Alert } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
} from 'firebase/auth';

// Carregar as variáveis de ambiente usando o Expo Constants
const firebaseConfig = {
  apiKey: 'AIzaSyD5qKn3JhjYSzglvBjHDM8qylTwV9Gmnhs',

  authDomain: 'naportamobile-5ab92.firebaseapp.com',

  projectId: 'naportamobile-5ab92',

  storageBucket: 'naportamobile-5ab92.appspot.com',

  messagingSenderId: '55889757096',

  appId: '1:55889757096:web:27b4e22c9be5e82334539d',

  measurementId: 'G-SJQWMZNQ55',
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

type User = {
  id: string;
  name: string;
  isAdmin: boolean;
};

type AuthContextData = {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  isLogging: boolean;
  user: User | null;
};

type AuthProviderProps = {
  children: ReactNode;
};

const USER_COLLECTION = '@NaportaMobile:users';

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLogging, setIsLogging] = useState(false);

  async function signIn(email: string, password: string) {
    if (!email || !password) {
      return Alert.alert('Login', 'Informe o e-mail e a senha.');
    }

    setIsLogging(true);

    try {
      const account = await signInWithEmailAndPassword(auth, email, password);
      const profileDoc = await getDoc(
        doc(firestore, 'users', account.user.uid)
      );

      if (profileDoc.exists()) {
        const { name, isAdmin } = profileDoc.data() as User;
        const userData = { id: account.user.uid, name, isAdmin };

        await AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(userData));
        setUser(userData);
      } else {
        throw new Error('Usuário não encontrado.');
      }
    } catch (error: any) {
      const { code } = error;
      if (code === 'auth/user-not-found' || code === 'auth/wrong-password') {
        Alert.alert('Login', 'E-mail e/ou senha inválida.');
      } else {
        Alert.alert('Login', 'Não foi possível realizar o login.');
        console.log(error);
      }
    } finally {
      setIsLogging(false);
    }
  }

  async function loadUserStorageData() {
    setIsLogging(true);

    const storedUser = await AsyncStorage.getItem(USER_COLLECTION);
    if (storedUser) {
      const userData = JSON.parse(storedUser) as User;
      setUser(userData);
    }

    setIsLogging(false);
  }

  async function signOut() {
    await firebaseSignOut(auth);
    await AsyncStorage.removeItem(USER_COLLECTION);
    setUser(null);
  }

  async function forgotPassword(email: string) {
    if (!email) {
      return Alert.alert('Redefinir Senha', 'Informe o e-mail.');
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        'Redefinir Senha',
        'Enviamos um link no seu e-mail para redefinir sua senha.'
      );
    } catch {
      Alert.alert(
        'Redefinir Senha',
        'Não foi possível enviar o e-mail para redefinição da senha.'
      );
    }
  }

  useEffect(() => {
    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, isLogging, forgotPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
