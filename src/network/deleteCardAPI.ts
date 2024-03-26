import axios from 'axios';
import api from './api';

interface DeleteCardProp {
  user_id: string;
  jwtToken: string;
  card_id: string;
}
type responseType = {
  status: boolean;
  message: string;
  data: object;
};
interface DeleteCardResponse {
  statusCode: string;
  deleteCardResp: responseType;
}

export async function deleteCard({
  user_id,
  jwtToken,
  card_id,
}: DeleteCardProp): Promise<DeleteCardResponse> {
  let statusCode = '';
  let deleteCardResp: responseType = {
    status: false,
    message: '',
    data: {},
  };
  try {
    const response = await api.patch(
      'api/v1//deleteCard',
      {
        user_id,
        card_id,
      },
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      },
    );

    statusCode = response.status.toString();
    deleteCardResp = response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('Axios Error while deleting:', error);
      deleteCardResp = error.response?.data;
    } else {
      console.log('Error while deleting', error);
      deleteCardResp = {
        status: false,
        message: 'Error while deleting',
        data: {},
      };
    }
  }
  return { statusCode, deleteCardResp };
}
