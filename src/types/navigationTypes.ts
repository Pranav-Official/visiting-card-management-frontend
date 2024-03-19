import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { Card, CardDetails, ContactCard } from './objectTypes';

type RootStackParamList = {
  EditCardScreen: { cardDetails: CardDetails; card_id: string };
  CardDetailsScreen: { card_id: string };
  CardOverwriteScreen: {
    similarCardList: ContactCard[];
    cardDetails: Card;
    sharing: boolean;
  };
  AddToContactScreen: {
    similarCardList: ContactCard[];
    cardDetails: Card;
    sharing: boolean;
  };
  SetContactNameScreen: {
    cardDetails: Card;
    sharing: boolean;
  };
  CardListScreen: {
    card_id: string;
    name: string;
  };
};
type TabParamList = {
  CardStack: NavigatorScreenParams<RootStackParamList>;
  CardDetailsScreen: { card_id: string };
  CardListScreen: {
    card_id: string;
    name: string;
  };
};

type CardDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'CardDetailsScreen'
>;
export type { RootStackParamList, TabParamList, CardDetailScreenRouteProp };
