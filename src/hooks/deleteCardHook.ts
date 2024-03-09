import api from './api';

interface DeleteCardProp {
  user_id: string;
  jwtToken: string;
  card_id: string;
}

interface DeleteCardResponse {
  statusCode: string;
  deleteCardResp: any;
}

export async function deleteCard({
  user_id,
  jwtToken,
  card_id,
}: DeleteCardProp): Promise<DeleteCardResponse> {
  let statusCode = '';
  let deleteCardResp: any = '';
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
  } catch (error: any) {
    console.log('Error while editing:', error.response);
  }

  return { statusCode, deleteCardResp };
}
