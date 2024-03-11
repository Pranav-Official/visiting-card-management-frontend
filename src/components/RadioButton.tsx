import React from 'react';
import { View } from 'react-native';
import Selected from '../assets/images/selected.svg';

const RadioButton = (props: any) => {
  return (
    <View
      style={[
        {
          height: 24,
          width: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: '#000',
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}
    >
      {props.selected ? (
        <Selected width={10} height={10} stroke={'black'} />
      ) : null}
    </View>
  );
};

export default RadioButton;
