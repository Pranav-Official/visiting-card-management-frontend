import { RouteProp } from '@react-navigation/native';
import { CardDetails } from './objectTypes';

type RootStackParamList = {
  EditCardScreen: { cardDetails: CardDetails; card_id: string };
  CardDetailsScreen: { card_id: string };
};
type CardDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'CardDetailsScreen'
>;
export type { RootStackParamList, CardDetailScreenRouteProp };
