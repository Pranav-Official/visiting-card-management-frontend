/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';

import ButtonComponent from '../../components/MainButtoncomponent';
import InputComponent from '../../components/InputComponent';
import MainLogoComponent from '../../components/MainLogoComponent';
import BottomDialougeTouchable from '../../components/BottomDialougeTouchable';

import api from '../../hooks/API';
import { loginUser } from '../../hooks/AuthenticationApi';
import { useNavigation } from '@react-navigation/native';
import { getLocalItem, setLocalItem } from '../../utils/Utils';
import Constants from '../../utils/Constants';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../context/userSlice';
import { userDetails } from '../../context/userDetailsSlice';
import colors from '../../utils/colorPallete';
import { validateEmail } from '../../utils/regexCheck';

type response = {
  status: boolean;
  message: string;
  data: {
    token: string;
    user_id: string;
  };
};

const Login = () => {
  const dispatch = useDispatch();

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const LoginMain = async () => {
    if (email === '' || password === '') {
      ToastAndroid.showWithGravity(
        'Please enter email and password',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return;
    } else if (validateEmail(email) === false) {
      ToastAndroid.showWithGravity(
        'Please enter valid email',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return;
    }

    setLoading(true);
    const response = await loginUser({
      loginUsername: email,
      loginPassword: password,
    });
    // console.log('LoginMain', response);
    if (response.hasOwnProperty('status') === false) {
      setLoading(false);
      const message = 'Error while logging in: ' + response.message;
      ToastAndroid.showWithGravity(
        message,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
    if (response.status) {
      setLocalItem(Constants.IS_LOGGED_IN, 'true');
      dispatch(
        userDetails({
          token: response.data.token,
          user_id: response.data.user_id,
        }),
      );
      setLocalItem(Constants.USER_JWT, response.data.token);
      setLocalItem(Constants.USER_ID, response.data.user_id);
      dispatch(userLogin(true));
      dispatch(
        userDetails({
          token: response.data.token,
          user_id: response.data.user_id,
        }),
      );
    } else if (response.status === false) {
      const message = response.message;
      ToastAndroid.showWithGravity(
        message,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      setLoading(false);
    }
  };

  useEffect(() => {});

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <MainLogoComponent />
      <View style={styles.midSection}>
        <InputComponent
          hidden={false}
          header="Email"
          value={email}
          setter={setEmail}
          placeholder="Enter Email"
        />
        <InputComponent
          header="Password"
          hidden={true}
          value={password}
          setter={setPassword}
          placeholder="Enter Password"
        />
        {!loading ? (
          <View style={styles.buttonContainer}>
            <ButtonComponent onPressing={() => LoginMain()} title="Log In" />
          </View>
        ) : (
          <ActivityIndicator
            style={styles.loading}
            size="large"
            color={colors['secondary-light']}
          />
        )}

        <TouchableOpacity style={styles.forgotPassword}>
          <Text>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <BottomDialougeTouchable
        label="Don't have an account?"
        mainText="Sign Up"
        navigateTo="SignUp"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    padding: 24,
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: colors['secondary-light'],
    gap: 10,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  midSection: {
    width: '100%',
    gap: 15,
    flexDirection: 'column',
  },
  buttonContainer: {
    marginTop: 12,
    height: 50,
    flexDirection: 'column',
  },
  forgotPassword: {
    marginTop: 10,
    alignSelf: 'center',
  },
  loading: {
    backgroundColor: colors['primary-accent'],
    width: '100%',
    height: 50,
    borderRadius: 5,
    marginTop: 15,
  },
});

export default Login;