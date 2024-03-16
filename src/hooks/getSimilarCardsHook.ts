import api from './api';

type Card = {
  card_id: string;
  card_name: string;
  email: string;
  phone: string;
  job_title: string;
  company_name: string;
  company_website: string;
};
type ContactCards = {
  contact_name: string;
  cards: Card[];
};
type GSCReturnType = {
  statusCode: string;
  similarCardList?: ContactCards[];
};
type GSCBodyType = {
  status: boolean;
  message: string;
  data: {
    contact_name: string;
    cards: Card[];
  }[];
};
type GSCInputProp = {
  user_id: string;
  card_name: string;
  phone: string;
  email: string;
  jwtToken: string;
};
export async function getSimilarCards({
  user_id,
  card_name,
  phone,
  email,
  jwtToken,
}: GSCInputProp): Promise<GSCReturnType> {
  let statusCode = '';
  let responseBody: GSCBodyType;
  let similarCardList: ContactCards[];

  try {
    const getSimilarCardsResponse = await api.get(`api/v1/getSimilarCards`, {
      params: {
        user_id,
        card_name,
        phone,
        email,
      },
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    statusCode = getSimilarCardsResponse.status.toString();
    responseBody = getSimilarCardsResponse.data;
    similarCardList = responseBody.data;
    return { similarCardList, statusCode };
  } catch (error: unknown) {
    console.log('From GSC Hook: Error fetching SimilarCards :', error);
    return { statusCode };
  }
}
