import React from 'react';
import HomeStackNavigation from './AppNavigation';
import AuthNavigationStack from './AuthNavigation';

type PropType = { isLoggedIn: boolean };
const AuthBasedNavigation = ({ isLoggedIn }: PropType) => {
  return isLoggedIn ? <HomeStackNavigation /> : <AuthNavigationStack />;
};

export default AuthBasedNavigation;
