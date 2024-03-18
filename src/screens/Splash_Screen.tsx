import { Image, StyleSheet, View } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.main_container}>
      <Image
        source={require('../assets/images/experion-logo.png')}
        style={{ width: 200, height: 110, resizeMode: 'contain' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main_container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 70,
  },
});

export default SplashScreen;
