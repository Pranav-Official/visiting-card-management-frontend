import React from 'react';
import { View } from 'react-native';
import Selected from '../assets/images/selected.svg';
import colors from '../utils/colorPallete';

type PropTypes = {
  selected: boolean;
};
const RadioButton = (props: PropTypes) => {
  return (
    <View
      style={[
        {
          height: 24,
          width: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: colors['primary-text'],
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}
    >
      {props.selected ? (
        <Selected width={10} height={10} stroke={colors['primary-text']} />
      ) : null}
    </View>
  );
};

export default RadioButton;
