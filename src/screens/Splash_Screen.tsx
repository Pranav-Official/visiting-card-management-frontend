import { Image, StyleSheet, View } from 'react-native';
import colors from '../utils/colorPallete';
import MainLogoComponent from '../components/MainLogoComponent';

const SplashScreen = () => {
  return (
    <View style={styles.main_container}>
      <MainLogoComponent />
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
    backgroundColor: colors['secondary-light'],
  },
});

export default SplashScreen;
