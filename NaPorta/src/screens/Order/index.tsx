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
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as OrderNavigationProps;

  function handleGoBack() {
    navigation.goBack();
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
            <Input keyboardType='numeric' />
          </InputGroup>

          <InputGroup>
            <Label>Quantidade</Label>
            <Input keyboardType='numeric' />
          </InputGroup>
        </FormRow>
        <Price>Valor de R$ 0 0</Price>
        <Button title='Confirmar pedido' />
      </Container>
    </ContentScroll>
  );
}
