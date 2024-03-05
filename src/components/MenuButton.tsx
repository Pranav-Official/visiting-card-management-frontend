import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../utils/colorPallete';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Define the type for the navigation object
const TopMenuButton = (props: any) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity>
      <MaterialIcons
        name="more-vert"
        color={'black'}
        size={34}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: colors['secondary-light'],
    alignSelf: 'center',
    marginRight: 10,
  },
});

export default TopMenuButton;
