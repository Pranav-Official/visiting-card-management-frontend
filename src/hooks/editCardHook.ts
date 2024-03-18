import axios from 'axios';
import api from './api';

interface EditCardProp {
  user_id: string;
  token: string;
  card_id: string;
  updatedData: any;
}

interface EditCardResponse {
  statusCode: string;
  editCardResp: any;
}

export async function editCardDetails({
  user_id,
  token,
  card_id,
  updatedData,
}: EditCardProp): Promise<EditCardResponse> {
  let statusCode = '';
  let editCardResp: any = '';

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
    }
  }

  return { statusCode, editCardResp };
}
