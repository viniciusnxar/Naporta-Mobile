import React from 'react';
import { Platform, TouchableOpacityProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import {MaterialIcons} from '@expo/vector-icons'

import { Container, Header, Title, DeleteLabel } from './styles';

export function ButtonBack({...rest}: TouchableOpacityProps) {
    const {COLORS} = useTheme();

    return (
      <Container>
  
        <MaterialIcons name="chevron-left" size={18} color={ COLORS.TITLE} />
        
      </Container>
    );
  }