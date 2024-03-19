import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ViewSharedButton from '../src/components/ViewSharedButton';

describe('ViewSharedButton Component', () => {
  const mockTitle = 'Test Title';
  const mockNumber = '5';
  const mockOnPressing = jest.fn();

  it('renders title correctly', () => {
    const { getByText } = render(
      <ViewSharedButton
        title={mockTitle}
        number={mockNumber}
        onPressing={mockOnPressing}
      />,
    );
    expect(getByText(mockTitle)).toBeTruthy();
  });

  it('renders number correctly', () => {
    const { getByText } = render(
      <ViewSharedButton
        title={mockTitle}
        number={mockNumber}
        onPressing={mockOnPressing}
      />,
    );
    expect(getByText(`${mockNumber} contacts`)).toBeTruthy();
  });

  it('calls onPressing prop when pressed', () => {
    const { getByTestId } = render(
      <ViewSharedButton
        title={mockTitle}
        number={mockNumber}
        onPressing={mockOnPressing}
      />,
    );
    const button = getByTestId('sharedBtntest');
    fireEvent.press(button);
    expect(mockOnPressing).toHaveBeenCalled();
  });

  
});
