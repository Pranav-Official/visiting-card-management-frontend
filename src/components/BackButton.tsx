import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../utils/colorPallete';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {
  color?: string;
};
// Define the type for the navigation object
const TopBackButton = (props: Props) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.goBack();
  };

  const styles = StyleSheet.create({
    icon: {
      color: props.color ? props.color : colors['secondary-light'],
      alignSelf: 'center',
      marginLeft: 10,
    },
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialIcons
        name="arrow-back"
        color={'black'}
        size={34}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

export default TopBackButton;
