import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

// Defining the type for the navigation object
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
