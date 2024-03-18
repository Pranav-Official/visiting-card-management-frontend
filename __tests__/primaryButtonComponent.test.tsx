import React from 'react';
import { render, fireEvent, userEvent } from '@testing-library/react-native';
import PrimaryButtonComponent from '../src/components/PrimaryButtonComponent';
import { Text } from 'react-native';

describe('PrimaryButtonComponent', () => {
  const user = userEvent.setup();
  test('renders correctly with default props', () => {
    const { getByText } = render(<PrimaryButtonComponent title="Button" />);
    expect(getByText('Button')).toBeTruthy();
  });

  test('renders with children and title', () => {
    const { getByText } = render(
      <PrimaryButtonComponent title="Button">
        <Text>Child</Text>
      </PrimaryButtonComponent>,
    );
    expect(getByText('Button')).toBeTruthy();
    expect(getByText('Child')).toBeTruthy();
  });

  test('calls onPress function when pressed', () => {
    const mockFn = jest.fn();
    const { getByText } = render(
      <PrimaryButtonComponent title="Button" onPressing={mockFn} />,
    );
    fireEvent.press(getByText('Button'));
    expect(mockFn).toHaveBeenCalled();
  });
  test('applies custom text color', () => {
    const { getByText } = render(
      <PrimaryButtonComponent title="Button" textColor="black" />,
    );
    const button = getByText('Button');
    const buttonStyle = button.props.style;

    expect(buttonStyle).toMatchObject({ color: 'black' });
  });
  test('applies default background color', () => {
    const { getByTestId } = render(<PrimaryButtonComponent title="Button" />);
    const button = getByTestId('ButtonContainer');
    const buttonStyle = button.props.style;

    expect(buttonStyle).toMatchObject({ backgroundColor: '#A1D5E3' });
  });

  test('applies highlighted style if isHighlighted is true', () => {
    const { getByTestId } = render(
      <PrimaryButtonComponent title="Button" isHighlighted={true} />,
    );
    const button = getByTestId('ButtonContainer');
    const buttonStyle = button.props.style;

    expect(buttonStyle).toMatchObject({ borderWidth: 1 });
  });
});
