import React, { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
} from 'firebase/firestore';

const firebaseConfig = {

  apiKey: "AIzaSyD5qKn3JhjYSzglvBjHDM8qylTwV9Gmnhs",

  authDomain: "naportamobile-5ab92.firebaseapp.com",

  projectId: "naportamobile-5ab92",

  storageBucket: "naportamobile-5ab92.appspot.com",

  messagingSenderId: "55889757096",

  appId: "1:55889757096:web:27b4e22c9be5e82334539d",

  measurementId: "G-SJQWMZNQ55"

};


const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

import { useAuth } from '@hooks/auth';

import { OrderCard, OrderProps } from '@components/OrderCard';
import { ItemSeparator } from '@components/ItemSeparator';

import { Container, Header, Title } from './styles';

export function Orders() {
  const [orders, setOrders] = useState<OrderProps[]>([]);

  const { user } = useAuth();

  function handlePizzaDelivered(id: string) {
    Alert.alert('Pedido', 'Confirmar que a pizza foi entregue?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          const orderRef = doc(firestore, 'orders', id);
          await updateDoc(orderRef, { status: 'Entregue' });
        },
      },
    ]);
  }

  useEffect(() => {
    const q = query(
      collection(firestore, 'orders'),
      where('waiter_id', '==', user?.id)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as OrderProps[];

      setOrders(data);
    });

    return () => unsubscribe();
  }, [user?.id]);

  return (
    <Container>
      <Header>
        <Title>Pedidos feitos</Title>
      </Header>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <OrderCard
            index={index}
            data={item}
            disabled={item.status === 'Entregue'}
            onPress={() => handlePizzaDelivered(item.id)}
          />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <ItemSeparator />}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 125 }}
      />
    </Container>
  );
}
