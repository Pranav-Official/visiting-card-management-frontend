//Button component in Profile Screen
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../utils/colorPallete';

type ProfileButton = {
  title: string;
  children?: any;
  onPressing?: () => any;
  danger?: any;
};
const ProfileButtonComponent = (props: ProfileButton) => {
  const defaultStyles = StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: colors['secondary-light'],
      padding: 5,
      borderRadius: 8,
      maxHeight: 50,
      height: 50,
      flex: 1,
      borderWidth: 1,
      textAlign: 'center',
      textAlignVertical: 'center',
      justifyContent: 'center',
    },
    login: {
      fontFamily: 'Roboto',
      fontSize: 20,
      fontWeight: '700',
      color:
        props.danger === true
          ? colors['primary-danger']
          : colors['primary-text'],
    },
  });

  return (
    <TouchableOpacity style={defaultStyles.button} onPress={props.onPressing}>
      <Text style={defaultStyles.login}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default ProfileButtonComponent;
