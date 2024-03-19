type CardDetails = {
  card_name: string;
  img_front_link?: string;
  img_back_link?: string;
  job_title?: string;
  email?: string;
  phone?: string;
  company_name?: string;
  company_website?: string;
  description?: string | null;
};

type Card = CardDetails & {
  card_id: string;
  contact_name?: string;
  user_id?: string;
};

type ContactCard = {
  contact_name: string;
  cards: Card[];
};
export type { CardDetails, Card, ContactCard };
