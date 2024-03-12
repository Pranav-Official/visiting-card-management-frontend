import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import colors from '../utils/colorPallete';

type InputProps = {
  placeholder: string;
  value: string;
  setter: (value: string) => void;
  readonly?: boolean;
};

const EditCardNameComponent = ({
  placeholder,
  value,
  setter,
  readonly = true,
}: InputProps) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        value={value}
        onChangeText={(val) => setter(val)}
        readOnly={readonly}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    textDecorationLine: 'underline',
  },
  input: {
    textAlign: 'center',
    color: colors['primary-text'],
    textDecorationLine: 'underline',
    fontSize: 35,
    paddingVertical: 0,
    fontWeight: '700',
    width: '100%',
    color: colors['primary-text'],
  },
});

export default EditCardNameComponent;
