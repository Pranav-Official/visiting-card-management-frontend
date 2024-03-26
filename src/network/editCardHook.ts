import axios from 'axios';
import api from './api';

interface EditCardProp {
  user_id: string;
  token: string;
  card_id: string;
  updatedData: object;
}
type responseType = {
  status: boolean;
  message: string;
  data: object;
};

interface EditCardResponse {
  statusCode: string;
  editCardResp: responseType;
}

export async function editCardDetails({
  user_id,
  token,
  card_id,
  updatedData,
}: EditCardProp): Promise<EditCardResponse> {
  let statusCode = '';
  let editCardResp: responseType = { status: false, message: '', data: {} };

  try {
    const response = await api.patch(
      'api/v1/editCard',
      {
        user_id,
        card_id,
        ...updatedData,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    statusCode = response.status.toString();
    editCardResp = response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('Axios Error while editing:', error.response?.data);
    } else {
      console.log('Error while editing:', error);
      editCardResp = {
        status: false,
        message: 'Error while editing',
        data: {},
      };
    }
  }

  return { statusCode, editCardResp };
}