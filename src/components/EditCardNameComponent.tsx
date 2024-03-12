import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import colors from '../utils/colorPallete';

type ColorTypes = 'red' | '#8080';

type InputProps = {
  placeholder: string;
  value: string;
  setter: (value: string) => void;
  textColor: ColorTypes;
  readonly?: boolean;
};
//Card Name Component with-editable or non editable property
const EditCardNameComponent = ({
  placeholder,
  value,
  setter,
  textColor = 'red',
  readonly = true,
}: InputProps) => {
  const placeholderColor = value.trim() === '' ? 'red' : 'grey';
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder={placeholder}
        style={[
          styles.input,
          { color: textColor, placeholderTextColor: placeholderColor },
        ]}
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
    fontSize: 35,
    paddingVertical: 0,
    fontWeight: '700',
    width: '100%',
    color: colors['primary-text'],
  },
});

export default EditCardNameComponent;
