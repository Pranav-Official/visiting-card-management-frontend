import api from './api';
 
interface rejectCardProps {
  user_id?: string;
  jwt_token?: string;
  card_ids: string[];
}
 
interface rejectCardResponse {
  statusCode: string;
  rejectCardResp: rejectCardIdsType;
}
 
interface rejectCardIdsType {
  cardIds: string[];
}
 
export async function rejectCard({
  user_id,
  jwt_token,
  card_ids,
}: rejectCardProps): Promise<rejectCardResponse> {
  let statusCode = '';
  let rejectCardResp: rejectCardIdsType = { cardIds: [] };
 
  const contactParams = {
    user_id: user_id,
    card_ids: card_ids,
  };
 
  try {
    const cardListResponse = await api.post<rejectCardResponse>('api/v1/rejectCards', contactParams,{
      headers: { Authorization: `Bearer ${jwt_token}` },
    });
 
    statusCode = cardListResponse.status.toString();
    rejectCardResp = cardListResponse.data.rejectCardResp;
 
    return { statusCode, rejectCardResp };
  } catch (error) {
    console.log('error while rejecting card', error);
    return { statusCode, rejectCardResp };
  }
}