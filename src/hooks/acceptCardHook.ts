import Constants from '../utils/Constants';
import { getLocalItem } from '../utils/Utils';
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
  user_id: string;
  // description;
};

interface CardDetailsResponse {
  statusCode: string;
  newCardResp?: string;
}

export async function acceptNewCard({
  user_id,
  jwtToken,
  card_id,
  newData,
}: CardDetailsProp): Promise<CardDetailsResponse> {
  let statusCode = '';
  let newCardResp: string | undefined;

  console.log('newData--->', user_id, newData);
  try {
    console.log('\n\nReached ACCEPT HOOK');
    const current_user_id = (await getLocalItem(Constants.USER_ID)) || '';
    newData.user_id = current_user_id;
    console.log('\n\nReached ACCEPT HOOK', current_user_id, user_id, newData);

    const CardDetailsResponse = await api.post(
      'api/v1/acceptCard',
      {
        user_id: current_user_id,
        card_id: card_id,
        ...newData,
      },
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );

    statusCode = CardDetailsResponse.status.toString();
    // console.log('New card response------>', newCardResp);
  } catch (error) {
    statusCode = '400';
    console.log('Error while logging in:', error);
    return { statusCode };
  }

  return { statusCode };
}
