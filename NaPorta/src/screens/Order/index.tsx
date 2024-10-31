import React, { useState } from 'react';
import { Platform } from 'react-native';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
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
import { ButtonBack } from '@src/components/ButtonBack';
import { RadioButton } from '@src/components/RadioButton';

import { PIZZA_TYPES } from '@utils/pizzaTypes';

export function Order() {
  const [size, setSize] = useState('');

  return (
    <ContentScroll>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Header>
          <ButtonBack
            onPress={() => {}}
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
