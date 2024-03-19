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
      console.log('\nError Getting Profile Details (getProfileDetailsHook)');
      throw new Error('Failed to fetch profile details');
    }
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch profile details');
  }
}
