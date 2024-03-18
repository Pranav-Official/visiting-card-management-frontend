import React from 'react';
import { render, fireEvent, RenderAPI } from '@testing-library/react-native';
import CardComponent from '../src/components/CardComponent'; 

describe('CardComponent', () => {
  let component: RenderAPI; // Declare the component variable

  beforeEach(() => {
    const mockClickFunc = jest.fn();
    component = render(
      <CardComponent
        name='John Doe'
        job_position="Developer"
        email="johndoe@example.com"
        phone_number="123-456-7890"
        company_name="ABC Inc."
        alignToSides={true}
        clickFunc={mockClickFunc}
      />,
    );
  });

  test('renders correctly with provided props', () => {
    // Your existing test case
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
    // Your existing test case
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

  test('align to sides does not apply style when false', () => {
    component.unmount(); // Clean up the component
    const mockClickFunc = jest.fn();
    component = render(
      <CardComponent
        name="John Doe"
        job_position="Developer"
        email="johndoe@example.com"
        phone_number="123-456-7890"
        company_name="ABC Inc."
        alignToSides={false}
        clickFunc={mockClickFunc}
      />,
    );
    const cardContainer = component.getByTestId('card');
    const viewStyle = (cardContainer.children[1] as any).props.style; // Use type assertion

    expect(viewStyle.justifyContent).toEqual('center');
  });

  afterEach(() => {
    component.unmount(); // Clean up the component after each test
  });
});

