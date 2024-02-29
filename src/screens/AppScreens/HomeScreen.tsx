import React from 'react';
import colors from '../../utils/colorPallete';
import { StyleSheet, Text, View } from 'react-native';
import MainButtonComponent from '../../componets/MainButtoncomponent';
import ProfileButtonComponent from '../../componets/ProfileButtonComponent';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <MainButtonComponent />
      <ProfileButtonComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors['secondary-light'],
    color: colors['primary-text'],
    flex: 1,
    // paddingLeft: 30,
    // paddingRight: 30,
  },
  text: {
    color: colors['primary-text'],
    fontSize: 40,
  },
});

export default HomeScreen;
