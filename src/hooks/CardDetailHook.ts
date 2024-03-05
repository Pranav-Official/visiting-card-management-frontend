import api from './api';

interface CardDetailsProp {
  user_id: string;
  jwtToken: string;
  card_id: string;
}

type CardReturn = {
  card_name: string;
  img_front_link: string;
  img_back_link: string;
  job_title: string;
  email: string;
  phone: string;
  company_name: string;
  company_website: string;
  // description;
};

interface CardDetailsResponse {
  statusCode: string;
  cardDetailsResp: CardReturn[];
}

export async function listCardDetails({
  user_id,
  jwtToken,
  card_id,
}: CardDetailsProp): Promise<CardDetailsResponse> {
  let statusCode = '';
  let cardDetailsResp: CardReturn[] = [];

  const CardDetailPayload = {
    user_id: user_id,
    card_id: card_id,
  };
  console.log(CardDetailPayload);
  try {
    const CardDetailsResponse = await api.get('api/v1/getCardDetails', {
      params: CardDetailPayload,
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
    statusCode = CardDetailsResponse.status.toString();

    cardDetailsResp = CardDetailsResponse.data;
    console.log(cardDetailsResp);
  } catch (error) {
    console.log('Error while logging in:', error);
  }

  return { statusCode, cardDetailsResp };
}