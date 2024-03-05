import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// Define the type for the navigation object
const MainLogoComponent = (props: any) => {
  return (
    <View style={styles.view}>
      <Image
        style={styles.image}
        source={require('../assets/images/experion-logo.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    marginTop: 100,
    width: 200,
    height: 80,
    objectFit: 'contain',
  },
  view: {},
});

export default MainLogoComponent;
