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
  } catch (error: any) {
    console.log('Error while editing:', error.response);
  }

  return { statusCode, editCardResp };
}
