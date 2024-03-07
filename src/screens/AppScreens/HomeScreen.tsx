import React from 'react';
import colors from '../../utils/colorPallete';
import { StyleSheet, Text, View } from 'react-native';
import MainButtonComponent from '../../components/MainButtoncomponent';
import { setLocalItem } from '../../utils/Utils';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../context/userSlice';
import Constants from '../../utils/Constants';
import ShareCardScreen from './ShareCardPage';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const Logout = () => {
    setLocalItem(Constants.IS_LOGGED_IN, 'false');
    setLocalItem(Constants.USER_JWT, '');
    setLocalItem(Constants.USER_ID, '');
    dispatch(userLogin(false));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <MainButtonComponent title="Logout" onPressing={Logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors['secondary-light'],
    color: colors['primary-text'],
    flex: 1,
  },
  text: {
    color: colors['primary-text'],
    fontSize: 40,
  },
});

export default HomeScreen;
