import axios from 'axios';
import api from './api';

type UserData = {
  email: string;
  fullName: string;
  phone: string;
  job_title: string;
  company_name: string;
  totalAcceptedCards: number;
  totalContacts: number;
  totalPendingCards: number;
};

type ResponseType = {
  userData: UserData;
  status: boolean;
};

export async function getProfile(
  user_id: string,
  jwtToken: string,
): Promise<ResponseType> {
  try {
    const getProfileDetails = await api.get('api/v1/getProfile', {
      params: { user_id },
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (getProfileDetails.status === 200) {
      const userData = getProfileDetails.data.data;
      const status = getProfileDetails.data.status;
      return { userData, status };
    } else {
      throw new Error('Failed to fetch profile details');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('Axios Error fetching profile details:', error);
    } else {
      console.log('Error while fetching profile details', error);
    }
    return {
      userData: {
        email: '',
        fullName: '',
        phone: '',
        job_title: '',
        company_name: '',
        totalAcceptedCards: 0,
        totalContacts: 0,
        totalPendingCards: 0,
      },
      status: false,
    };
  }
}
