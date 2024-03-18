import api from './api';

interface CardListProp {
  user_id: string;
  card_id: string;
  jwt_token: string;
}

type CardReturn = {
  card_id: string;
  card_name: string;
  email: string;
  phone: string;
  job_title: string;
  company_name: string;
};

interface CardListResponse {
  statusCode: string;
  cardResp: { data: CardReturn[] };
}

export async function listCards({
  user_id,
  card_id,
  jwt_token,
}: CardListProp): Promise<CardListResponse> {
  let statusCode = '';
  let cardResp: { data: CardReturn[] } = { data: [] };

  const contactParams = {
    user_id: user_id,
    card_id: card_id,
  };

  try {
    const cardListResponse = await api.get('api/v1/getCardList', {
      params: contactParams,
      headers: { Authorization: `Bearer ${jwt_token}` },
    });
    statusCode = cardListResponse.status.toString();
    cardResp = cardListResponse.data;
    return { statusCode, cardResp };
  } catch (error) {
    console.log('error while fetching card list', error);
    return { statusCode, cardResp };
  }
}
