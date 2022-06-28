import React from 'react';


import {
  NavigationContainer,
} from '@react-navigation/native';

import RootStack from './MainTabNavigator';


export default function AppNavigator({ theme }) {
  return (
    <NavigationContainer theme={theme}>
      <RootStack />
    </NavigationContainer>)
}