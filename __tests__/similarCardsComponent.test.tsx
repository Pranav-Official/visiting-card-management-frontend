import React from 'react';
import { render } from '@testing-library/react-native';
import SimilarCardsComponent from '../src/components/SimilarCardsComponent';

// Mock NavigationContainer
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('SimilarCardsComponent', () => {
  const cardDetails = {
    card_id: '1',
    card_name: 'John Doe',
    job_title: 'Software Engineer',
    phone: '1234567890',
    email: 'john.doe@example.com',
    company_name: 'Example Inc.',
  };
  const similarCardList = [
    {
      contact_name: 'Jane Smith',
      cards: [
        {
          card_id: '2',
          card_name: 'Jane Smith',
          job_title: 'Product Manager',
          phone: '9876543210',
          email: 'jane.smith@example.com',
          company_name: 'Example Corp.',
        },
      ],
    },
  ];
  const sharing = false;
  const modalVisibilitySetter = jest.fn();

  it('renders correctly', () => {
    // Mock the useNavigation hook
    const navigateMock = jest.fn();
    require('@react-navigation/native').useNavigation.mockReturnValue({
      navigate: navigateMock,
    });

    const { getByText } = render(
      <SimilarCardsComponent
        cardDetails={cardDetails}
        similarCardList={similarCardList}
        sharing={sharing}
        modalVisibilitySetter={modalVisibilitySetter}
      />,
    );
    const similarCardsText = getByText('Similar Cards Already Exists!');
    expect(similarCardsText).toBeTruthy();
  });

  // Add more test cases as needed...
});
