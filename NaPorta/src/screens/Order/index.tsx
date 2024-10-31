import React from 'react';
import { Platform } from 'react-native';
import { Container, Header, Photo } from './styles';
import { ButtonBack } from '@src/components/ButtonBack';

export function Order() {
  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header>
        <ButtonBack
          onPress={() => {}}
          style={{ marginBottom: 108 }}
        ></ButtonBack>
      </Header>
      <Photo source={{ uri: 'https://github.com/viniciusnxar' }}></Photo>
    </Container>
  );
}
