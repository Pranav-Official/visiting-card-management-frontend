import React from 'react';
import { render } from '@testing-library/react-native';
import EditCardNameComponent from '../src/components/EditCardNameComponent';

describe('EditCardNameComponent', () => {
  test('applies readonly mode if readonly prop is true', () => {
    const { getByTestId } = render(
      <EditCardNameComponent
        value=""
        setter={(val) => {
          val;
        }}
        readonly={true}
      />,
    );
    const input = getByTestId('cardNameInput');
    expect(input.props.readOnly).toBe(true);
  });
});
