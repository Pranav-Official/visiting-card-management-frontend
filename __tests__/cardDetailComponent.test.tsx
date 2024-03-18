import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CardDetailComponent from '../src/components/CardDetailComponent';

describe('CardDetailComponent', () => {
  const onPressMock = jest.fn();
  const onLongPressMock = jest.fn();
  it('renders correctly with card detail', () => {
    const { getByText } = render(
      <CardDetailComponent
        card_detail="Card Detail"
        isLoading={false}
        children={undefined}
      />,
    );
    const cardDetailText = getByText('Card Detail');
    expect(cardDetailText).toBeTruthy();
  });

  it('calls onPress handler when pressed', () => {
    const { getByTestId } = render(
      <CardDetailComponent
        card_detail="Card Detail"
        onPress={onPressMock}
        isLoading={false}
        children={undefined}
      />,
    );
    const cardDetailComponent = getByTestId('CardDetailComponent');
    fireEvent.press(cardDetailComponent);
    expect(onPressMock).toHaveBeenCalled();
  });

  it('calls onLongPress handler when long pressed', () => {
    const { getByTestId } = render(
      <CardDetailComponent
        card_detail="Card Detail"
        onLongPress={onLongPressMock}
        isLoading={false}
        children={undefined}
      />,
    );
    const cardDetailComponent = getByTestId('CardDetailComponent');
    fireEvent(cardDetailComponent, 'longPress');
    expect(onLongPressMock).toHaveBeenCalled();
  });
});
