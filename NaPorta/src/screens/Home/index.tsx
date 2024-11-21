import React, { useState, useCallback } from 'react';
import { TouchableOpacity, Alert, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  orderBy,
  startAt,
  endAt,
  getDocs,
  query,
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

import { useNavigation, useFocusEffect } from '@react-navigation/native';

import happyEmoji from '@assets/happy.png';

import { useAuth } from '@hooks/auth';
import { Search } from '@components/Search';
import { ProductCard, ProductProps } from '@components/ProductCard';

import {
  Container,
  Header,
  Greeting,
  GreetingEmoji,
  GreetingText,
  Title,
  MenuHeader,
  MenuItemsNumber,
  NewProductButton,
} from './styles';

export function Home() {
  const [pizzas, setPizzas] = useState<ProductProps[]>([]);
  const [search, setSearch] = useState('');

  const { COLORS } = useTheme();
  const navigation = useNavigation();
  const { user, signOut } = useAuth();

  async function fetchPizzas(value: string) {
    const formattedValue = value.toLowerCase().trim();
    const q = query(
      collection(firestore, 'pizzas'),
      orderBy('name_insensitive'),
      startAt(formattedValue),
      endAt(`${formattedValue}\uf8ff`)
    );

    try {
      const response = await getDocs(q);
      const data = response.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ProductProps[];
      setPizzas(data);
    } catch {
      Alert.alert('Consulta', 'Não foi possível realizar a consulta');
    }
  }

  function handleSearch() {
    fetchPizzas(search);
  }

  function handleSearchClear() {
    setSearch('');
    fetchPizzas('');
  }

  function handleOpen(id: string) {
    const route = user?.isAdmin ? 'product' : 'order';
    navigation.navigate(route, { id });
  }

  function handleAdd() {
    navigation.navigate('product', {});
  }

  useFocusEffect(
    useCallback(() => {
      fetchPizzas('');
    }, [])
  );

  return (
    <Container>
      <Header>
        <Greeting>
          <GreetingEmoji source={happyEmoji} />
          <GreetingText>Olá</GreetingText>
        </Greeting>

        <TouchableOpacity onPress={signOut}>
          <MaterialIcons name='logout' color={COLORS.TITLE} size={24} />
        </TouchableOpacity>
      </Header>

      <Search
        onChangeText={setSearch}
        value={search}
        onSearch={handleSearch}
        onClear={handleSearchClear}
      />

      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemsNumber>{pizzas.length} pizzas</MenuItemsNumber>
      </MenuHeader>

      <FlatList
        data={pizzas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard data={item} onPress={() => handleOpen(item.id)} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 125,
          marginHorizontal: 24,
        }}
      />

      {user?.isAdmin && (
        <NewProductButton
          title='Cadastrar Pizza'
          type='secondary'
          onPress={handleAdd}
        />
      )}
    </Container>
  );
}
