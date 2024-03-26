import api from './api';

export const getContactList = async (user_id: string) => {
  try {
    const response = await api.get(`/api/v1/getContactList?user_id=${user_id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return { status: false, message: error };
  }
};
