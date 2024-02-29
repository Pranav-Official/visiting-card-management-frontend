//Common Button Component-
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../utils/colorPallete';

const MainButtonComponent = (props: any) => {
  const onPress = () => {
    props.function();
  };
  return (
    <TouchableOpacity style={styles.mainButton} onPress={onPress}>
      <Text style={styles.mainButtonTitle}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainButton: {
    alignItems: 'center',
    backgroundColor: colors['primary-accent'],
    height: '6%',
    padding: 10,
    borderRadius: 5,
    fontWeight: 'bold',
  },
  mainButtonTitle: {
    fontWeight: 'bold',
  },
});

export default MainButtonComponent;
