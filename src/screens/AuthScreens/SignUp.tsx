import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';

import ButtonComponent from '../../components/MainButtoncomponent';
import InputComponent from '../../components/InputComponent';
import MainLogoComponent from '../../components/MainLogoComponent';
import BottomDialougeTouchable from '../../components/BottomDialougeTouchable';
import { SignUpUser } from '../../hooks/AuthenticationApi';
import { setLocalItem } from '../../utils/Utils';
import Constants from '../../utils/Constants';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../context/userSlice';
import { userDetails } from '../../context/userDetailsSlice';
import colors from '../../utils/colorPallete';
import { validateEmail } from '../../utils/regexCheck';

// type response = {
//   status: boolean;
//   message: string;
//   data: {
//     token: string;
//     user_id: string;
//   };
// };

type BorderTypes = 'Danger' | 'Auth' | 'Normal';

const SignUp = () => {
  const dispatch = useDispatch();
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailBorder, setEmailBorder] = useState<BorderTypes>('Normal');
  const [fullnameBorder, setNameBorder] = useState<BorderTypes>('Normal');
  const [passwordBorder, setPasswordBorder] = useState<BorderTypes>('Normal');
  const [inputChanged, setInputChanged] = useState(false);
  const [loading, setLoading] = useState(false);

  const SignUpMain = async () => {
    if (email === '' || password === '' || fullname === '') {
      ToastAndroid.showWithGravity(
        'Please enter fullname,email and password',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      setEmailBorder('Danger');
      setPasswordBorder('Danger');
      setNameBorder('Danger');
      return;
    } else if (validateEmail(email) === false) {
      ToastAndroid.showWithGravity(
        'Please enter valid email',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      setEmailBorder('Danger');
      return;
    }

    setLoading(true);
    const response = await SignUpUser({
      signUpUsername: fullname,
      signUpPassword: password,
      signUpEmail: email,
    });
    // console.log('LoginMain', response);
    if (Object.prototype.hasOwnProperty.call(response, 'status') === false) {
      setLoading(false);
      const message = 'Error while signing in: ' + response.message;
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
          token: response.data?.token ?? '',
          user_id: response.data?.user_id ?? '',
        }),
      );
      setLocalItem(Constants.USER_JWT, response.data?.token ?? '');
      setLocalItem(Constants.USER_ID, response.data?.user_id ?? '');
      dispatch(userLogin(true));
      dispatch(
        userDetails({
          token: response.data?.token ?? '',
          user_id: response.data?.user_id ?? '',
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
    setInputChanged(false);
  };

  useEffect(() => {
    if (inputChanged) {
      setEmailBorder('Normal');
      setPasswordBorder('Normal');
      setNameBorder('Normal');
    }
  }, [email, password, fullname]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <MainLogoComponent />
      <View style={styles.midSection}>
        <InputComponent
          hidden={false}
          header="Fullname"
          value={fullname}
          setter={(val) => {
            setInputChanged(true);
            setFullname(val);
          }}
          borderType={fullnameBorder}
          placeholder="Enter full Name"
        />
        <InputComponent
          hidden={false}
          header="Email"
          value={email}
          setter={(val) => {
            setInputChanged(true);
            setEmail(val);
          }}
          borderType={emailBorder}
          placeholder="Enter Email"
        />
        <InputComponent
          header="Password"
          hidden={true}
          value={password}
          setter={(val) => {
            setInputChanged(true);
            setPassword(val);
          }}
          borderType={passwordBorder}
          placeholder="Enter Password"
        />
        {!loading ? (
          <View style={styles.buttonContainer}>
            <ButtonComponent onPressing={() => SignUpMain()} title="Sign Up" />
          </View>
        ) : (
          <ActivityIndicator
            style={styles.loading}
            size="large"
            color={colors['secondary-light']}
          />
        )}
      </View>
      <BottomDialougeTouchable
        label="Already have an account?"
        mainText="Login!"
        navigateTo="Login"
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
    marginBottom: 50,
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

export default SignUp;
