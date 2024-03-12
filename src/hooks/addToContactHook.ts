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
  let addToContactData: any;
  let statusCode: number;
  const addToContactPayload = {
    user_id,
    parent_card_id,
    ...cardDetails,
  };

  console.log('\n\nAdd to Contact API HOOK CardDetails: ', cardDetails);
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

    console.log(
      '\n\nAdd To Contact Response: ',
      addToExistingContactResponse.data,
    );

    addToContactData = addToExistingContactResponse.data;
    statusCode = addToExistingContactResponse.status;

    return { addToContactData, statusCode };
  } catch (error) {
    console.log(error.response.data);
  }
}
