import api from './api';

type Card = {
  card_id: string;
  card_name: string;
  email: string;
  phone: string;
  job_title: string;
  company_name: string;
  company_website: string;
};

//Add To Existing Contact Hook
export async function addToExistingContact(
  user_id: string,
  jwtToken: string,
  parent_card_id: string,
  cardDetails: Card,
) {
  let addToExistingContactData = null;
  let statusCode: number;
  const addToContactPayload = {
    user_id,
    parent_card_id,
    ...cardDetails,
  };

  try {
    const addToExistingContactResponse = await api.post(
      '/api/v1/addToExistingContact',
      addToContactPayload,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      },
    );

    addToExistingContactData = addToExistingContactResponse.data;
    statusCode = addToExistingContactResponse.status;

    return { addToExistingContactData, statusCode };
  } catch (error) {
    statusCode = 400;
    console.log('Error while logging in:', error);
    return { addToExistingContactData, statusCode };
  }
}
