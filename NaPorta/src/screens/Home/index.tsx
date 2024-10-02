import React, { useEffect,useState, useCallback } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity, Alert, FlatList } from 'react-native';
import { Search } from '@src/components/Serach';
import { ProductCard, ProductProps } from '@src/components/ProductCard';
import {useTheme} from 'styled-components/native';
import firestore from '@react-native-firebase/firestore';
import {
  Container,
  Header,
  Greeting,
  GreetingEmoji,
  GreetingText,
  MenuHeader,
  MenuItemsNumber,
  Title
} from './styles';

import happyEmoji from '@src/assets/happy.png';
import { BorderlessButton } from 'react-native-gesture-handler';

export function Home() {

  const { COLORS } = useTheme();

  function fetchPizzas(value: string) {
    const formattedValue = value.toLocaleLowerCase().trim();

    firestore()
      .collection('pizzas')
      .orderBy('name_insensitive')
      .startAt(formattedValue)
      .endAt(`${formattedValue}\uf8ff`)
      .get()
      .then(response => {
        const data = response.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ProductProps[];

        console.log(data);
      })
      .catch(() => Alert.alert('Consulta', 'Não foi possível realizar a consulta'));
    }

      useEffect(() => {
        fetchPizzas('');
      }, []);

  return (
    <Container>
      <Header>
        <Greeting>
          <GreetingEmoji source={happyEmoji} />
          <GreetingText>Olá, Admin</GreetingText>
        </Greeting>
        <TouchableOpacity>
          <MaterialIcons name='logout' size={24} />
        </TouchableOpacity>
      </Header>
      <Search onSearch={() => {}} onClear={() => {}} />
        <MenuHeader>
          <Title>Cardápio</Title>
          <MenuItemsNumber>10 pizzas</MenuItemsNumber>
        </MenuHeader>
        <ProductCard 
          data={{
            id: '1',
            name: 'Pizza',
            description: 'Ingredientes dessa pizza bla bla bla',
            photo_url: 'https://github.com/rodrigorgtic.png'
          }}
        />

    </Container>
  );
}
