/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeStackNavigation from './navigation/AppNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from './context/userSlice';
import Constants from './utils/Constants';
import { getLocalItem } from './utils/Utils';
import AuthNavigationStack from './navigation/AuthNavigation';

const Main = () => {
  const isLoggedIn = useSelector((state: any) => state.userReducer.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const isLogin = await getLocalItem(Constants.IS_LOGGED_IN);
      // console.log('isLogin', isLogin);

      if (isLogin === 'true') {
        dispatch(userLogin(true));
      } else {
        dispatch(userLogin(false));
      }
    })();
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? <HomeStackNavigation /> : <AuthNavigationStack />}
    </NavigationContainer>
  );
};

export default Main;
