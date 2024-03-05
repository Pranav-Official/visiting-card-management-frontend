import React from 'react';
import HomeStackNavigation from './navigation/AppNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';

const Main = () => {
  return (
    <NavigationContainer>
      <RootSiblingParent>
        <HomeStackNavigation />
      </RootSiblingParent>
    </NavigationContainer>
  );
};

export default Main;
