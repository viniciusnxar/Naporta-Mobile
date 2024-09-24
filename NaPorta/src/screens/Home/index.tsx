import React, { useState, useCallback } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity, Alert, FlatList } from 'react-native';
import {
  Container,
  Header,
  Greeting,
  GreetingEmoji,
  GreetingText,
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
          <MaterialIcons name='logout' color={COLORS.TITLE} size={24} />
        </TouchableOpacity>
      </Header>
    </Container>
  );
}
