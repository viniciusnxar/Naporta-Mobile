import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { UserStackRoutes } from './user.stack.routes';
import { Product } from '@src/screens/Product';

export function Routes() {
  return (
    <NavigationContainer>
      <UserStackRoutes />
    </NavigationContainer>
  );
}
