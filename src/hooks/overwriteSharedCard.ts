import axios from 'axios';
import api from './api';

//OWC refers to OverWriteCard
type OWCBodyType = {
  status: boolean;
  message: string;
  data: Record<string, never>; //Empty object
};

type Card = {
  card_name?: string;
  email?: string;
  phone?: string;
  job_title?: string;
  company_name?: string;
  company_website?: string;
  card_id: string;
};

export async function overwriteSharedCard(
  user_id: string,
  jwtToken: string,
  card_id: string,
  cardDetails: Card,
) {
  console.log(
    '\n\nCard Details from overwriteSharedCard: ',
    cardDetails,
    card_id,
  );
  const overWriteCardPayload = {
    shared_card_id: cardDetails.card_id,
    card_to_overWrite: card_id,
    user_id,
  };
  let statusCode = '';
  let responseBody: OWCBodyType;
  try {
    console.log('\n\nREACHED OWC', card_id);
    console.log('\n\noverWriteCardPayload: ', overWriteCardPayload);
    const overwriteResponse = await api.patch(
      '/api/v1/overwriteExistingCard',
      overWriteCardPayload,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      },
    );
    statusCode = overwriteResponse.status.toString();
    responseBody = overwriteResponse.data;
    console.log('\nOverWriteHookResp :', overwriteResponse.data);
    return { statusCode, responseBody };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('Axios Error while signing in:', error.response?.data);
    } else {
      console.log('Error while signing in', error);
    }
  }
}
