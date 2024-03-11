import api from './api';

//Add To Existing Contact Hook
export async function addToExistingContact(
  user_id: string,
  jwtToken: string,
  parent_card_id: string,
  cardDetails: any,
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
