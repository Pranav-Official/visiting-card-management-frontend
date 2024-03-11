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
};

export async function overwriteExistingCard(
  user_id: string,
  jwtToken: string,
  card_id: string,
  cardDetails: Card,
) {
  const overWriteCardPayload = {
    user_id,
    card_id,
    ...cardDetails,
  };
  let statusCode = '';
  let responseBody: OWCBodyType;
  try {
    console.log('\n\nREACHED OWC');
    console.log('\n\noverWriteCardPayload: ', overWriteCardPayload);
    const overwriteResponse = await api.patch(
      '/api/v1/editCard',
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
