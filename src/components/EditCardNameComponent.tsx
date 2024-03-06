import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import colors from '../utils/colorPallete';

type InputProps = {
  placeholder: string;
  value: string;
  setter: (value: string) => void;
};

const EditCardNameComponent = ({ placeholder, value, setter }: InputProps) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        value={value}
        onChangeText={(val) => setter(val)}
        underlineColorAndroid="transparent"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomColor: colors['primary-text'],
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  input: {
    textAlign: 'center',
    color: colors['primary-text'],
    fontSize: 35,
    paddingVertical: 0,
    fontWeight: '700',
    width: '100%',
  },
});

export default EditCardNameComponent;
