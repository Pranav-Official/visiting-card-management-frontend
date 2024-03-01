import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ClosedEyeIcon from '../assets/images/eye-closed.svg';
import OpenEyeIcon from '../assets/images/eye-open.svg';
import colors from '../utils/colorPallete';

type InputProps = {
  placeholder: string;
  hidden: boolean;
  header: string;
  value: string;
  setter: (value: string) => void;
};
const InputComponent = ({
  placeholder,
  hidden,
  header,
  value,
  setter,
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  const toggleShowHide = () => {
    setShowSecret(!showSecret);
  };
  return (
    <View>
      <View>
        <Text style={styles.label}>{header}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          secureTextEntry={hidden ? !showSecret : false}
          caretHidden={!isFocused}
          onChangeText={(val) => setter(val)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        ></TextInput>
        {isFocused && hidden == false ? (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setter('')}
          >
            <MaterialIcons name="close" size={25} />
          </TouchableOpacity>
        ) : null}
        {hidden && isFocused ? (
          showSecret ? (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={toggleShowHide}
            >
              <OpenEyeIcon width={24} height={24} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={toggleShowHide}
            >
              <ClosedEyeIcon width={24} height={24} />
            </TouchableOpacity>
          )
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors['primary-text'],
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 2,
    paddingStart: 10,
    marginTop: -10,
    zIndex: -1,
  },
  input: {
    flex: 8,
    color: colors['primary-text'],
    fontSize: 18,
  },
  label: {
    backgroundColor: colors['secondary-light'],
    alignSelf: 'flex-start',
    marginLeft: 15,
    color: '#7A7A7A',
    paddingHorizontal: 5,
    fontWeight: '500',
  },
  iconContainer: {
    paddingLeft: 8,
    flex: 1,
  },
  hiddenIcon: {
    pointerEvents: 'none',
  },
});

export default InputComponent;
