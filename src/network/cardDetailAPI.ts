import { CardDetails } from '../types/objectTypes';
import api from './api';

interface CardDetailsProp {
  user_id: string;
  card_id: string;
}
interface CardDetailsResponse {
  statusCode: string;
  cardDetailsResp: CardDetails;
}

export async function listCardDetails({
  user_id,
  card_id,
}: CardDetailsProp): Promise<CardDetailsResponse> {
  let statusCode = '';
  let cardDetailsResp: CardDetails = { card_name: '' };

  const CardDetailPayload = {
    user_id: user_id,
    card_id: card_id,
  };

  try {
    const CardDetailsResponse = await api.get('api/v1/getCardDetails', {
      params: CardDetailPayload,
    });
    statusCode = CardDetailsResponse.status.toString();
    cardDetailsResp = CardDetailsResponse.data.data;
  } catch (error) {
    console.log('Error while logging in:', error);
  }

  return { statusCode, cardDetailsResp };
}
