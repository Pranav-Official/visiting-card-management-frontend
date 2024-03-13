/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeStackNavigation from './navigation/AppNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from './context/userSlice';
import Constants from './utils/Constants';
import { getLocalItem, setLocalItem } from './utils/Utils';
import AuthNavigationStack from './navigation/AuthNavigation';
import { RootSiblingParent } from 'react-native-root-siblings';

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

      await setLocalItem(Constants.SAVE_SHARES_LATER, 'false');
    })();
  }, []);

  return (
    <NavigationContainer>
      <RootSiblingParent>
        {isLoggedIn ? <HomeStackNavigation /> : <AuthNavigationStack />}
      </RootSiblingParent>
    </NavigationContainer>
  );
};

export default Main;
