import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

type AuthContextData = {
  signIn: (email: string, password: string) => Promise<void>;
  isLoggin: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggin, setIsLoggin] = useState(false);

  async function signIn(email: string, password: string) {
    if (!email || !password) {
      return Alert.alert('Login', 'Informe um email e senha');
    }

    setIsLoggin(true);

    try {
      const account = await auth().signInWithEmailAndPassword(email, password);
      console.log(account);
    } catch (error: any) {
      const { code } = error;

      if (code === 'auth/user-not-found' || code === 'auth/wrong-password') {
        return Alert.alert('Login', 'Email e/ou senha inválidos');
      } else {
        return Alert.alert('Login', 'Não foi possível realizar o login');
      }
    } finally {
      setIsLoggin(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isLoggin,
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
