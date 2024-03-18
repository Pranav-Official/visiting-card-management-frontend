import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ContactListComponent from '../src/components/ContactListComponent';

describe('ContactListComponent', () => {
  const contactName = 'John Doe';
  const onPressMock = jest.fn();

  it('displays contact name correctly', () => {
    const { getByText } = render(
      <ContactListComponent contactName={contactName} />,
    );
    const nameText = getByText(contactName);
    expect(nameText).toBeTruthy();
  });

  it('calls onPress function when pressed', () => {
    const { getByText } = render(
      <ContactListComponent contactName={contactName} onPress={onPressMock} />,
    );
    const component = getByText(contactName);
    fireEvent.press(component);
    expect(onPressMock).toHaveBeenCalled();
  });

  it('truncates long contact names correctly', () => {
    const longContactName =
      'This is a very long contact name that needs to be truncated';
    const truncatedName = longContactName.substring(0, 22) + '..';

    const { getByText } = render(
      <ContactListComponent contactName={longContactName} />,
    );
    const nameText = getByText(truncatedName);
    expect(nameText).toBeTruthy();
  });
});
