import React, { useEffect, useState } from 'react';

import { Platform } from 'react-native';
import { useTheme } from 'styled-components/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  getFirestore,
  collection,
  where,
  onSnapshot,
  query,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

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

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

import { Home } from '@screens/Home';
import { Orders } from '@screens/Orders';
import { BottomMenu } from '@components/BottomMenu';

const { Navigator, Screen } = createBottomTabNavigator();

export function UserTabRoutes() {
  const [notifications, setNotifications] = useState('0');
  const { COLORS } = useTheme();

  useEffect(() => {
    const ordersRef = collection(firestore, 'orders');
    const q = query(ordersRef, where('status', '==', 'Pronto'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setNotifications(String(querySnapshot.docs.length));
    });

    return () => unsubscribe();
  }, []);

  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.SECONDARY_900,
        tabBarInactiveTintColor: COLORS.SECONDARY_400,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
        },
      }}
    >
      <Screen
        name='home'
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomMenu title='Cardápio' color={color} />
          ),
        }}
      />

      <Screen
        name='orders'
        component={Orders}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomMenu
              title='Pedidos'
              color={color}
              notifications={notifications}
            />
          ),
        }}
      />
    </Navigator>
  );
}
