import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SearchBarComponent from '../src/components/SearchBarComponent';

describe('SearchBarComponent', () => {
  test('renders correctly', () => {
    const { getByPlaceholderText } = render(<SearchBarComponent />);
    const searchBar = getByPlaceholderText('Search Contact');
    expect(searchBar).toBeTruthy();
  });

  test('handles text change correctly', () => {
    const mockSetter = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBarComponent setter={mockSetter} />
    );
    const searchBar = getByPlaceholderText('Search Contact');
    fireEvent.changeText(searchBar, 'test');
    expect(mockSetter).toHaveBeenCalledWith('test');
  });

  test('renders with provided value', () => {
    const { getByPlaceholderText } = render(
      <SearchBarComponent value="test value" />
    );
    const searchBar = getByPlaceholderText('Search Contact');
    expect(searchBar.props.value).toBe('test value');
  });

  test('renders with provided editable prop', () => {
    const { getByPlaceholderText } = render(
      <SearchBarComponent editable={false} />
    );
    const searchBar = getByPlaceholderText('Search Contact');
    expect(searchBar.props.editable).toBe(false);
  });
});
