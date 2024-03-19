import axios from 'axios';
import api from './api';

export async function addProfileDetails(
  userId: string,
  jwtToken: string,
  phone: string,
  jobTitle: string,
  companyName: string,
) {
  let statusCode: number;
  const detailsPayload = {
    user_id: userId,
    phone: phone,
    job_title: jobTitle,
    company_name: companyName,
  };

  try {
    console.log(
      '\nReached the Profile Edit Hook',
      userId,
      jwtToken,
      phone,
      jobTitle,
      companyName,
    );
    const addDetailsResponse = await api.patch(
      'api/v1/addProfileDetails',
      detailsPayload,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      },
    );

    console.log('\nAdd Details Response: ', addDetailsResponse.data);
    statusCode = addDetailsResponse.status;
    return statusCode;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('Axios error:', error);
      return error.response?.status;
    } else {
      console.log('Error Occured:', error);
    }
  }
}