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

  test('hides visibility of password when hidden prop is true', () => {
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

  test('clicking close icon clears the input field', () => {
    const setterMock = jest.fn();
    const { getByPlaceholderText, getByTestId } = render(
      <InputComponent
        header="Email"
        placeholder="Email"
        value="Initial value"
        setter={setterMock}
      />,
    );
    // Fill input Field with a value
    const passwordInput = getByPlaceholderText('Email');
    fireEvent.changeText(passwordInput, 'john.doe@gmail.com');
    expect(setterMock).toHaveBeenCalledWith('john.doe@gmail.com');

    //check if closeButton Appear on focus
    fireEvent(passwordInput, 'focus');
    const closeIcon = getByTestId('close-icon');
    expect(closeIcon).toBeTruthy();

    //check field clearing on pressing closeButton
    fireEvent(closeIcon, 'press');
    expect(setterMock).toHaveBeenCalledWith('');
  });

  test('clicking eye icons toggles the secureText property of textInput', () => {
    const setterMock = jest.fn();
    const { getByPlaceholderText, getByTestId } = render(
      <InputComponent
        header="Password"
        placeholder="Password"
        value="12345678"
        hidden={true}
        setter={setterMock}
      />,
    );
    const passwordInput = getByPlaceholderText('Password');

    // onFocus, closedeye icon Appears and password is hidden
    fireEvent(passwordInput, 'focus');
    const closedEye = getByTestId('closedEye');
    expect(closedEye).toBeTruthy();
    expect(passwordInput.props.secureTextEntry).toBe(true);

    // Click closedEye, it changes to openEye and password is visible
    fireEvent(closedEye, 'press');
    const openEye = getByTestId('openEye');
    expect(openEye).toBeTruthy();
    expect(passwordInput.props.secureTextEntry).toBe(false);
  });
});
