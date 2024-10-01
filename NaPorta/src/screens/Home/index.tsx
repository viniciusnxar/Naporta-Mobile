import React, { useState, useCallback } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity, Alert, FlatList } from 'react-native';
import { Search } from '@src/components/Serach';
import { ProductCard } from '@src/components/ProductCard';
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
