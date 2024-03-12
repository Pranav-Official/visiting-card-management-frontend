import api from './api';

interface CardDetailsProp {
  user_id: string;
  jwtToken: string;
  parent_card_id: string;
  newData: CardDataType;
}

type CardDataType = {
    card_name:string,
    img_front_link:string,
    img_back_link:string,
    job_title:string,
    email:string,
    phone:string,
    company_name:string,
    company_website:string,
};

interface CardDetailsResponse {
  statusCode: string;
  addToExistingContactResp?: string;
}

export async function addToExistingContact({
  user_id,
  jwtToken,
  parent_card_id,
  newData,
}: CardDetailsProp): Promise<CardDetailsResponse> {
  let statusCode = '';
  let addToExistingContactResp: string | undefined;

  console.log('Request Payload:', {
    user_id,
    parent_card_id,
    newData,
  });

  console.log('newData--->', newData);

  try {
    const CardDetailsResponse = await api.post(
      'api/v1/addToExistingContact',
      {
        user_id: user_id,
        parent_card_id: parent_card_id,
        ...newData,
      },
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );

    statusCode = CardDetailsResponse.status.toString();
    //console.log('add to existing contact response---->',CardDetailsResponse);
    addToExistingContactResp = CardDetailsResponse.data;
    
  } catch (error) {
    console.log('Error while logging in:', error);
  }

  return { statusCode, addToExistingContactResp };
}
