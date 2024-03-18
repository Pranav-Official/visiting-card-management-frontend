import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from './context/userSlice';
import Constants from './utils/Constants';
import { getLocalItem, setLocalItem } from './utils/Utils';
import { RootSiblingParent } from 'react-native-root-siblings';
import SplashScreen from './screens/Splash_Screen';
import AuthBasedNavigation from './navigation';
import { RootState } from './context/store';

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isLoggedIn = useSelector(
    (state: RootState) => state.userReducer.isLoggedIn,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

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
        {isLoading ? (
          <SplashScreen />
        ) : (
          <AuthBasedNavigation isLoggedIn={isLoggedIn} />
        )}
      </RootSiblingParent>
    </NavigationContainer>
  );
};

export default Main;
