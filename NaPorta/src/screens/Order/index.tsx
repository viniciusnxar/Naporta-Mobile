import React, { useState, useEffect } from 'react';
import { Platform, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

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

export function Order() {
  const [size, setSize] = useState('');
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

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
