import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screens/AppScreens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/native';
import colors from '../utils/colorPallete';
const StackNav = createNativeStackNavigator();
const HomeStackNavigation = () => {
  return (
    <StackNav.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackNav.Screen name="Home" component={HomeBottomBarNavigation} />
    </StackNav.Navigator>
  );
};

const BottomBarNavigation = createBottomTabNavigator();
const HomeBottomBarNavigation = () => {
  return (
    <BottomBarNavigation.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 15,
          borderWidth: 0,
        },
        tabBarStyle: {
          backgroundColor: colors['accent-white'],
          borderColor: colors['secondary-light'],
          shadowColor: colors['secondary-light'],
          paddingBottom: 14,
          paddingTop: 10,
          zIndex: 10,
          height: 90,
          marginTop: -30,
        },
        tabBarActiveTintColor: colors['secondary-accent'],
        tabBarInactiveTintColor: colors['accent-grey'],
      }}
    >
      <BottomBarNavigation.Screen
        name="Contacts"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="contacts"
              size={36}
              color={
                useIsFocused()
                  ? colors['secondary-accent']
                  : colors['accent-grey']
              }
            />
          ),
        }}
      />
      <BottomBarNavigation.Screen
        name="Profile"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <Ionicons
              name="person-circle-outline"
              size={36}
              color={
                useIsFocused()
                  ? colors['secondary-accent']
                  : colors['accent-grey']
              }
            />
          ),
        }}
      />
    </BottomBarNavigation.Navigator>
  );
};

export default HomeStackNavigation;
