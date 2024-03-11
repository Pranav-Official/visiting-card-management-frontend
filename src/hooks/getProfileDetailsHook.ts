import api from './api';

type UserData = {
  email: string;
  fullName: string;
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
  console.log('\n\nReached Profile HOOK');

  const getProfileDetails = await api.get('api/v1/getProfile', {
    params: { user_id },
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });

  const userData = getProfileDetails.data.data;
  const status = getProfileDetails.data.status;

  console.log('\n\nGet Profile Response: ', userData, status);

  return { userData, status };
}
