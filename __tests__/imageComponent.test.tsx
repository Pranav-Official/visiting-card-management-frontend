import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CommonImageComponent from '../src/components/CommonImageComponent';

describe('CommonImageComponent', () => {
  it('renders correctly with both front and back images', () => {
    const { getAllByTestId } = render(
      <CommonImageComponent
        frontImageUri="frontImageUri"
        backImageUri="backImageUri"
      />,
    );
    const images = getAllByTestId('Image');
    expect(images.length).toBe(2);
  });

  it('renders correctly with only one image', () => {
    const { getAllByTestId } = render(
      <CommonImageComponent frontImageUri="frontImageUri" />,
    );
    const images = getAllByTestId('Image');
    expect(images.length).toBe(1);
  });

  it('renders default image when no images are provided', () => {
    const { getAllByTestId } = render(
      <CommonImageComponent />,
    );
    const images = getAllByTestId('defaultImage');
    expect(images.length).toBe(1);
  });

  it('handles image view correctly', () => {
    const { getAllByTestId } = render(
      <CommonImageComponent
        frontImageUri="frontImageUri"
        backImageUri="backImageUri"
      />,
    );
    const images = getAllByTestId('Image');
    expect(images.length).toBe(2);
    fireEvent.press(images[0]);
    expect(getAllByTestId('imageView')).toBeDefined();
  });
});
