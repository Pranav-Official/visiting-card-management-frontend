import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CardComponent from '../src/components/CardComponent';

describe('CardComponent', () => {
  test('renders correctly with provided props', () => {
    const mockClickFunc = jest.fn();
    const { getByText } = render(
      <CardComponent
        name="John Doe"
        job_position="Developer"
        email="johndoe@example.com"
        phone_number="123-456-7890"
        company_name="ABC Inc."
        clickFunc={mockClickFunc}
      ></CardComponent>,
    );

    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('Developer')).toBeTruthy();
    expect(getByText('johndoe@example.com')).toBeTruthy();
    expect(getByText('123-456-7890')).toBeTruthy();
    expect(getByText('ABC Inc.')).toBeTruthy();
  });

  test('calls clickFunc when card is pressed', () => {
    const mockClickFunc = jest.fn();
    const { getByTestId } = render(
      <CardComponent
        name="John Doe"
        job_position="Developer"
        email="johndoe@example.com"
        phone_number="123-456-7890"
        company_name="ABC Inc."
        clickFunc={mockClickFunc}
      />,
    );

    const card = getByTestId('card');
    fireEvent.press(card);

    expect(mockClickFunc).toHaveBeenCalledTimes(1);
  });
});
