import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

// Defining the type for the navigation object
const MainLogoComponent = () => {
  return (
    <View>
      <Image
        style={styles.image}
        source={require('../assets/images/appLogo3.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    marginTop: 0,
    width: 250,
    height: 300,
    objectFit: 'contain',
  },
});

export default MainLogoComponent;
