import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import {
  Container,
  Image,
  Name,
  Description,
  StatusContainer,
  StatusLabel,
  StatusTypesProps,
} from './styles';

type Props = TouchableOpacityProps & {
  index: number;
};

export function OrderCard({ index, ...rest }: Props) {
  return (
    <Container index={index} {...rest}>
      <Image source={{ uri: 'https://github.com/viniciusnxar' }} />

      <Name>4 Queijos</Name>

      <Description>Mesa 5 Qnt: x</Description>

      <StatusContainer status='Preparando'>
        <StatusLabel status='Preparando'>Preparando</StatusLabel>
      </StatusContainer>
    </Container>
  );
}
