import React from 'react';
import HomeStackNavigation from './AppNavigation';
import AuthNavigationStack from './AuthNavigation';
import ParentNetworkComponent from '../components/ParentNetworkComponent';

type PropType = { isLoggedIn: boolean };
const AuthBasedNavigation = ({ isLoggedIn }: PropType) => {
  return isLoggedIn ? (
    <ParentNetworkComponent>
      <HomeStackNavigation />
    </ParentNetworkComponent>
  ) : (
    <AuthNavigationStack />
  );
};

export default AuthBasedNavigation;
