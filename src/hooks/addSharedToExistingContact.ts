import Constants from '../utils/Constants';
import { getLocalItem } from '../utils/Utils';
import api from './api';

type CardDataType = {
  card_id: string;
  card_name: string;
  img_front_link: string;
  img_back_link: string;
  job_title: string;
  email: string;
  phone: string;
  company_name: string;
  company_website: string;
  user_id: string;
};

export async function addSharedCardToExistingContact(
  user_id: string,
  jwtToken: string,
  parent_card_id: string,
  newData: CardDataType,
) {
  let statusCode: number;
  let addToExistingContactData = null;
  console.log(
    '\n\nReached Add Shared Card to existing',
    user_id,
    jwtToken,
    parent_card_id,
    newData,
  );
  const current_user_id = (await getLocalItem(Constants.USER_ID)) || '';
  newData.user_id = current_user_id;
  const shared_card_id = newData.card_id;
  console.log('\n\nRequest Payload:', {
    user_id,
    shared_card_id,
    parent_card_id,
  });

  console.log('newData--->', newData);

  try {
    const CardDetailsResponse = await api.post(
      'api/v1/addSharedCardToExistingContact',
      {
        user_id: user_id,
        shared_card_id: shared_card_id,
        parent_card_id: parent_card_id,
      },
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );

    statusCode = CardDetailsResponse.status;
    //console.log('add to existing contact response---->',CardDetailsResponse);
    addToExistingContactData = CardDetailsResponse.data;

    return { addToExistingContactData, statusCode };
  } catch (error) {
    statusCode = 400;
    console.log('Error while logging in:', error);
    return { addToExistingContactData, statusCode };
  }
}