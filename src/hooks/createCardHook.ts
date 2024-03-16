import api from './api';

interface CardDetailsProp {
  user_id: string;
  jwtToken: string;
  card_id: string;
  newData: CardDataType[];
}

type CardDataType = {
  card_name: string;
  img_front_link: string;
  img_back_link: string;
  job_title: string;
  email: string;
  phone: string;
  company_name: string;
  company_website: string;
  contact_name: string;
};

interface CardDetailsResponse {
  statusCode: string;
  newCardResp?: string;
}

export async function newCardDetails({
  user_id,
  jwtToken,
  card_id,
  newData,
}: CardDetailsProp): Promise<CardDetailsResponse> {
  let statusCode = '';
  let newCardResp: string | undefined;

  console.log('newData--->', newData);

  try {
    const CardDetailsResponse = await api.post(
      'api/v1/createNewCard',
      {
        user_id: user_id,
        card_id: card_id,
        ...newData,
      },
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );

    statusCode = CardDetailsResponse.status.toString();

    newCardResp = CardDetailsResponse.data;
  } catch (error) {
    console.log('Error while logging in:', error);
  }

  return { statusCode, newCardResp };
}
