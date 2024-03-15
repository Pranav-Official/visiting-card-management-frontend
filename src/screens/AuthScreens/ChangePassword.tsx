import React, { useEffect, useState } from 'react';
import {
    ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import MainLogoComponent from '../../components/MainLogoComponent';
import InputComponent from '../../components/InputComponent';
import MainButtonComponent from '../../components/MainButtoncomponent';
import {
  changePassword,
  changePasswordProp,
} from '../../hooks/changePasswordHook';
import { RouteProp, useNavigation } from '@react-navigation/native';
import TopBackButton from '../../components/BackButton';
import { isValidPassword } from '../../utils/regexCheck';
import colors from '../../utils/colorPallete';

type ChangePasswordRouteProps = {
  ChangePassword: {
    email: string;
    jwtToken: string;
  };
};

type BorderTypes = 'Danger' | 'Auth' | 'Normal';
type Props = {
  route: RouteProp<ChangePasswordRouteProps, 'ChangePassword'>;
};

const ChangePassword: React.FC<Props> = ({ route }) => {
  const { email, jwtToken } = route.params;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordBorder, setPasswordBorder] = useState<BorderTypes>('Normal');
  const navigation = useNavigation();

  const handlePasswordChange = (value: string) => {
    setNewPassword(value);
    // Check if new password and confirm password match
    setPasswordMatch(value === confirmPassword);
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    // Check if new password and confirm password match
    setPasswordMatch(value === newPassword);
  };

//   const passwordBorder: BorderTypes = passwordMatch ? 'Normal' : 'Danger';

  const handleChangePassword = async () => {
    
    if (!passwordMatch) {
      ToastAndroid.show('Passwords do not match!', ToastAndroid.SHORT);
      setPasswordBorder('Danger');
      return;
    }
    if(!isValidPassword(newPassword)){
        ToastAndroid.showWithGravity(
            'Password must be at least 8 characters with uppercase, lowercase, digit, and special character.',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          setPasswordBorder('Danger');
          return;
    }
    // if(passwordMatch && isValidPassword(newPassword)){
    //     setPasswordBorder('Danger');
    // }

    // Call your changePassword hook here
    const changePasswordProps: changePasswordProp = {
      email, // Provide the email here
      new_password: newPassword,
      jwt_token: jwtToken, // Provide the JWT token here
    };

    try {
      const response = await changePassword(changePasswordProps);
      console.log('changepassword response',response);
      ToastAndroid.show('Password changed successfully!', ToastAndroid.SHORT);
      // Clear the password fields after successful change
      setNewPassword('');
      setConfirmPassword('');
      if(response.statusCode == '200'){
        navigation.goBack();
      }
    //   if(!passwordMatch && !isValidPassword(newPassword)){
    //     setPasswordBorder('Danger');
    // }
      
    } catch (error) {
      console.error('Error changing password:', error);
      // Display an error message
      ToastAndroid.show('Error changing password!', ToastAndroid.SHORT);
    }
  };

  return (
    <ScrollView style={styles.main_container}>
      <View style={styles.back_button_container}>
        <TopBackButton color="black"></TopBackButton>
      </View>
      <View style={styles.logo_container}>
        <MainLogoComponent />
      </View>
      <View style={styles.change_password_container}>
        <InputComponent
          hidden={true}
          header="New Password"
          value={newPassword}
          setter={handlePasswordChange}
          borderType={passwordBorder}
          placeholder="Enter New Password"
        />
      </View>

      <View style={styles.confirm_password_container}>
        <InputComponent
          hidden={true}
          header="Confirm New Password"
          value={confirmPassword}
          setter={handleConfirmPasswordChange}
          borderType={passwordBorder}
          placeholder="Confirm New Password"
        />
      </View>
      <View style={styles.button_container}>
        <MainButtonComponent
          title={'Change Password'}
          onPressing={handleChangePassword}
        ></MainButtonComponent>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main_container: {
    width: '100%',
    height: 1500,
    backgroundColor:colors['secondary-light']
  },
  logo_container: {
    alignItems: 'center',
    marginTop: 70,
  },
  change_password_container: {
    marginTop: 120,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  confirm_password_container: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button_container: {
    paddingHorizontal: 20,
    height: 100,
  },
  back_button_container:{
    alignItems:'flex-start',
    paddingTop:5,
  }
});

export default ChangePassword;
