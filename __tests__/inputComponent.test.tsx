import React from 'react';
import { render, fireEvent, userEvent } from '@testing-library/react-native';
import InputComponent from '../src/components/InputComponent';

describe('InputComponent', () => {
  const user = userEvent.setup();
  test('renders correctly with default props', () => {
    const { getByPlaceholderText, getByText } = render(
      <InputComponent header="Header" value="" setter={() => {}} />, 
    );

    expect(getByPlaceholderText('')).toBeTruthy();
    expect(getByText('Header')).toBeTruthy();
  });

  test('renders with provided placeholder', () => {
    const { getByPlaceholderText } = render(
      <InputComponent
        header="Header"
        placeholder="Enter text"
        value=""
        setter={() => {}}
      />,
    );

    expect(getByPlaceholderText('Enter text')).toBeTruthy();
  });

  test('toggles visibility of password when hidden prop is true', () => {
    const { getByPlaceholderText, getByTestId } = render(
      <InputComponent
        header="Password"
        placeholder="password"
        hidden={true}
        value="password"
        setter={() => {}}
      />,
    );

    const passwordInput = getByPlaceholderText('password');
    fireEvent.changeText(passwordInput, '12345678');
    expect(passwordInput.props.secureTextEntry).toBe(true);
  });

  test('calls setter function with correct value when input changes', () => {
    const setterMock = jest.fn();
    const { getByPlaceholderText } = render(
      <InputComponent header="Header" value="" setter={setterMock} />,
    );

    const input = getByPlaceholderText('');

    fireEvent.changeText(input, 'new value');

    expect(setterMock).toHaveBeenCalledWith('new value');
  });
});
