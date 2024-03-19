import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../utils/colorPallete';

type PropTypes = {
  navigateTo: string;
  label: string;
  mainText: string;
};
// Define the type for the navigation object
const BottomDialougeTouchable = (props: PropTypes) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate(props.navigateTo as never);
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
