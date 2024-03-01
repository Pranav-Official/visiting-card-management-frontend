import React from 'react';
import colors from '../../utils/colorPallete';
import { StyleSheet, Text, View } from 'react-native';
import CardComponent from '../../componets/cardComponent';

const HomeScreen = () => {
  return (
    <View>
      {/* <Text style={styles.text}>Home Screen</Text> */}
      <CardComponent alignToSides = {true}></CardComponent>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: colors['secondary-light'],
//     color: colors['primary-text'],
//     flex: 1,
//   },
//   text: {
//     color: colors['primary-text'],
//     fontSize: 40,
//   },
// });

export default HomeScreen;