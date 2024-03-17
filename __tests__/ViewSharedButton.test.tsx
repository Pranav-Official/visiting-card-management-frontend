import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ViewSharedButton from "../src/components/ViewSharedButton.tsx";

describe('ViewSharedButton Component', () => {
  const mockTitle = 'Test Title';
  const mockNumber = '5';
  const mockOnPressing = jest.fn();

  it('renders title correctly', () => {
    const { getByText } = render(<ViewSharedButton title={mockTitle} number={mockNumber} onPressing={mockOnPressing} />);
    const titleText = getByText(mockTitle);
    expect(titleText).toBeTruthy();
  });

  it('renders number correctly', () => {
    const { getByText } = render(<ViewSharedButton title={mockTitle} number={mockNumber} onPressing={mockOnPressing} />);
    const numberText = getByText(`${mockNumber} contacts`);
    expect(numberText).toBeTruthy();
  });

  it('calls onPressing prop when pressed', () => {
    const { getByTestId } = render(<ViewSharedButton title={mockTitle} number={mockNumber} onPressing={mockOnPressing} />);
    const button = getByTestId('sharedButton');
    fireEvent.press(button);
    expect(mockOnPressing).toHaveBeenCalled();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(<ViewSharedButton title={mockTitle} number={mockNumber} onPressing={mockOnPressing} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
