import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../utils/colorPallete';

// Define the type for the navigation object
const BottomDialougeTouchable = (props: any) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate(props.navigateTo, {});
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.bottomDialog}>
      <Text>{props.label}</Text>
      <Text style={styles.MainText}>{props.mainText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bottomDialog: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    flexDirection: 'row',
    gap: 5,
  },
  MainText: {
    color: colors['primary-danger'],
  },
});

export default BottomDialougeTouchable;