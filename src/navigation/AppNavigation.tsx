import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screens/AppScreens/HomeScreen';
const StackNav = createNativeStackNavigator();
const HomeStackNavigation = () => {
  return (
    <StackNav.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <StackNav.Screen name="Home" component={HomeScreen} />
    </StackNav.Navigator>
  );
};

export default HomeStackNavigation;
