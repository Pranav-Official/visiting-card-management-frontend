import axios from 'axios';
import api from './api';

type CardData = {
  card_id: string;
  contact_name: string;
  card_names: string[];
  email: string[];
  phone_number: string[];
  company_names: string[];
};

type ApiResponse = {
  statusCode: string;
  status?: boolean;
  message?: string;
  data?: CardData[];
};

export const fetchSearchableList = async (
  user_id: string,
  jwt_token: string,
): Promise<ApiResponse> => {
  let statusCode = '';
  try {
    const response = await api.get(`/api/v1/getSearchList?user_id=${user_id}`, {
      headers: { Authorization: `Bearer ${jwt_token}` },
    });
    statusCode = response.status.toString();
    return { statusCode, ...response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { statusCode, message: error.message };
    }
    console.log(error);
    return { statusCode, message: 'An unexpected error occurred' };
  }
};
