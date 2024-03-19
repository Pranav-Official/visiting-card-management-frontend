import React from 'react';
import { render } from '@testing-library/react-native';
import RadioButton from '../src/components/RadioButton';

describe('RadioButton', () => {
  it('renders Selected component when selected is true', () => {
    const { getByTestId } = render(<RadioButton selected={true} />);
    const selectedComponent = getByTestId('selected-component');
    expect(selectedComponent).toBeTruthy();
  });

  it('does not render Selected component when selected is false', () => {
    const { queryByTestId } = render(<RadioButton selected={false} />);
    const selectedComponent = queryByTestId('selected-component');
    expect(selectedComponent).toBeNull();
  });
});
