import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import colors from '../utils/colorPallete';
import Website from '../assets/images/noInternet.svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  bottomSheet: {
    width: '70%',
    backgroundColor: colors['accent-white'],
    borderRadius: 5,
    gap: 30,
    padding: 30,
    alignItems: 'center',
  },
  heading: {
    fontWeight: '500',
    fontSize: 25,
    color: colors['primary-text'],
  },
  paragraph: {
    textAlign: 'center',
  },
});

const NoInternet = () => {
  return (
    <Modal isVisible={true} animationIn={'slideInUp'} style={styles.view}>
      <View style={styles.bottomSheet}>
        <Text style={styles.heading}>No internet</Text>
        <MaterialIcons name="signal-wifi-off" size={60} />
        <Text style={styles.paragraph}>
          It seems like you are not connected to internet. Please check settings
          and try again later.
        </Text>
      </View>
    </Modal>
  );
};

export default NoInternet;
