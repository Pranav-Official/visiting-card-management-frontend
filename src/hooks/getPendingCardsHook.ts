import api from './api';

type Card = {
  card_id: string;
  card_name: string;
  img_front_link: string;
  img_back_link: string;
  job_title: string;
  email: string;
  phone: string;
  company_name: string;
  company_website: string;
  contact_name: string;
  user_id: string;
};

type UserData = {
  user_id: string;
  user_fullname: string;
  user_email: string;
  cards: Card[];
};

type GPCReturnType = {
  statusCode: string;
  pendingCardList?: UserData[];
};

type GPCBodyType = {
  status: boolean;
  message: string;
  data: UserData[];
};

type GPCInputProp = {
  user_id: string;
  jwtToken: string;
};

export async function getPendingCards({
  user_id,
  jwtToken,
}: GPCInputProp): Promise<GPCReturnType> {
  let statusCode = '';
  let responseBody: GPCBodyType;
  let pendingCardList: UserData[] | undefined;

  try {
    const getPendingCardsResponse = await api.get('api/v1/getPendingCardList', {
      params: {
        user_id,
      },
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    statusCode = getPendingCardsResponse.status.toString();
    responseBody = getPendingCardsResponse.data;

    if (responseBody.status) {
      pendingCardList = responseBody.data.map((userData) => {
        const cards = userData.cards.map((card) => {
          return {
            card_id: card.card_id,
            card_name: card.card_name,
            img_front_link: card.img_front_link,
            img_back_link: card.img_back_link,
            job_title: card.job_title,
            email: card.email,
            phone: card.phone,
            company_name: card.company_name,
            company_website: card.company_website,
            contact_name: card.contact_name,
            user_id: card.user_id,
          };
        });

        return {
          user_id: userData.user_id,
          user_fullname: userData.user_fullname,
          user_email: userData.user_email,
          cards: cards,
        };
      });
    }

    return { statusCode, pendingCardList };
  } catch (error: unknown) {
    console.error('From GSC Hook: Error fetching SimilarCards:', error);
    return { statusCode };
  }
}
