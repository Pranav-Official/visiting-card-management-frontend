import { RouteProp } from '@react-navigation/native';
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
};
type CardDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'CardDetailsScreen'
>;
export type { RootStackParamList, CardDetailScreenRouteProp };
