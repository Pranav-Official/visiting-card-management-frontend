import React from 'react';
import HomeStackNavigation from './navigation/AppNavigation';
import { NavigationContainer } from '@react-navigation/native';

const Main = () => {
  return (
    <NavigationContainer>
      <HomeStackNavigation />
    </NavigationContainer>
  );
};

export default Main;
