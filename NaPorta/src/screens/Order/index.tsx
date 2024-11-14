import React, { useState, useEffect } from 'react';
import { Platform, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { initializeApp } from 'firebase/app';

import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
} from 'firebase/firestore';

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

import { useAuth } from '@hooks/auth';

import { PIZZA_TYPES } from '@utils/pizzaTypes';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { ButtonBack } from '@components/ButtonBack';
import { RadioButton } from '@components/RadioButton';
import { ProductProps } from '@src/components/ProductCard';
import { OrderNavigationProps } from '@src/@types/navigation';

import {
  Container,
  ContentScroll,
  Header,
  Photo,
  Sizes,
  Form,
  Title,
  Label,
  InputGroup,
  FormRow,
  Price,
} from './styles';

type PizzaResponse = ProductProps & {
  prices_sizes: {
    [key: string]: number;
  };
};

export function Order() {
  const [size, setSize] = useState('');
  const [pizza, setPizza] = useState<PizzaResponse>({} as PizzaResponse);
  const [quantity, setQuantity] = useState(0);
  const [tableNumber, setTableNumber] = useState('');
  const [sendingOrder, setSendingOrder] = useState(false);

  const { user } = useAuth();

  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as OrderNavigationProps;

  const amount = size ? pizza.prices_sizes[size] * quantity : '0,00';

  function handleGoBack() {
    navigation.goBack();
  }

  function handleOrder() {
    if (!size) {
      return Alert.alert('Pedido', 'Selecione o tamanho da pizza.');
    }
    if (!tableNumber) {
      return Alert.alert('Pedido', 'Informe o número da mesa.');
    }
    if (!quantity) {
      return Alert.alert('Pedido', 'Informe a quantidade.');
    }
    setSendingOrder(true);
    firestore()
      .collection('orders')
      .add({
        quantity,
        amount,
        pizza: pizza.name,
        size,
        table_number: tableNumber,
        status: 'Preparando',
        waiter_id: user?.id,
        image: pizza.photo_url
      })
      .then(() => navigation.navigate('home'))
      .catch(() => {
        Alert.alert('Pedido', 'Não foi possível realizar o pedido.');
        setSendingOrder(false);
      });
  }

  useEffect(() => {
    if (id) {
      const fetchPizza = async () => {
        try {
          const pizzaDoc = await getDoc(doc(firestore, 'pizzas', id));
          setPizza(pizzaDoc.data() as PizzaResponse);
        } catch {
          Alert.alert('Pedido', 'Não foi possível carregar o produto');
        }
      };
      fetchPizza();
    }
  }, [id]);

  return (
    <ContentScroll>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Header>
          <ButtonBack
            onPress={handleGoBack}
            style={{ marginBottom: 108 }}
          ></ButtonBack>
        </Header>
        <Photo source={{ uri: 'https://github.com/viniciusnxar' }}></Photo>
        <Sizes>
          {PIZZA_TYPES.map((item) => (
            <RadioButton
              key={item.id}
              title={item.name}
              onPress={() => setSize(item.id)}
              selected={size === item.id}
            />
          ))}
        </Sizes>
        <FormRow>
          <InputGroup>
            <Label>Número da mesa</Label>
            <Input keyboardType="numeric" onChangeText={setTableNumber} />
          </InputGroup>

          <InputGroup>
            <Label>Quantidade</Label>
            <Input keyboardType="numeric" onChangeText={(value) => setQuantity(Number(value))} />
          </InputGroup>
        </FormRow>
        <Price>Valor de R$ {amount}</Price>
        <Button
            title="Confirmar pedido"
            onPress={handleOrder}
            isLoading={sendingOrder}
          />
      </Container>
    </ContentScroll>
  );
}
