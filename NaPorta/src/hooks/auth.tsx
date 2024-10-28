import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, firestore } from '@src/firebaseConfig'; // Importações corretas no novo padrão

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

const USER_COLLECTION = '@NaportamMobile:users';

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLogging, setIsLogging] = useState(false);

  const auth = getAuth();  // Inicializando a instância de auth
  const firestore = getFirestore();  // Inicializando Firestore

  async function signIn(email: string, password: string) {
    if (!email || !password) {
      return Alert.alert('Login', 'Informe o e-mail e a senha.');
    }

    setIsLogging(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(async (account) => {
        const userDocRef = doc(firestore, 'users', account.user.uid);
        const profile = await getDoc(userDocRef);

        if (profile.exists()) {
          const { name, isAdmin } = profile.data() as User;
          const userData = {
            id: account.user.uid,
            name,
            isAdmin,
          };

          await AsyncStorage.setItem(
            USER_COLLECTION,
            JSON.stringify(userData)
          );
          setUser(userData);
        } else {
          Alert.alert(
            'Login',
            'Não foi possível buscar os dados de perfil do usuário.'
          );
        }
      })
      .catch((error) => {
        const { code } = error;

        if (code === 'auth/user-not-found' || code === 'auth/wrong-password') {
          Alert.alert('Login', 'E-mail e/ou senha inválida.');
        } else {
          Alert.alert('Login', 'Não foi possível realizar o login.');
        }
      })
      .finally(() => setIsLogging(false));
  }

  async function loadUserStorageData() {
    setIsLogging(true);

    const storedUser = await AsyncStorage.getItem(USER_COLLECTION);

    if (storedUser) {
      const userData = JSON.parse(storedUser) as User;
      console.log(userData);
      setUser(userData);
    }

    setIsLogging(false);
  }

  async function signOutUser() {
    await signOut(auth);
    await AsyncStorage.removeItem(USER_COLLECTION);
    setUser(null);
  }

  async function forgotPassword(email: string) {
    if (!email) {
      return Alert.alert('Redefinir Senha', 'Informe o e-mail.');
    }

    sendPasswordResetEmail(auth, email)
      .then(() =>
        Alert.alert(
          'Redefinir Senha',
          'Enviamos um link no seu e-mail para você redefinir sua senha.'
        )
      )
      .catch(() =>
        Alert.alert(
          'Redefinir Senha',
          'Não foi possível enviar o e-mail para redefinição da senha.'
        )
      );
  }

  useEffect(() => {
    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut: signOutUser,
        isLogging,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
