import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../utils/colorPallete';

const ProfileButtonComponent = (props: any) => {
  const onPress = () => {
    props.function();
  };
  return (
    <TouchableOpacity
      style={[
        styles.profileButton,
        { backgroundColor: props.proButtonBgColor },
      ]}
      onPress={onPress}
    >
      <Text
        style={[styles.profileButtonTitle, { color: props.proButtonTextColor }]}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  profileButton: {
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 10,
    borderBlockColor: colors['primary-text'],
    height: '8%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  profileButtonTitle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default ProfileButtonComponent;
