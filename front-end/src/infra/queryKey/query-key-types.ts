import { CompanyListPayload } from "@/domain/company/company-types";

export type CompanyListQueryKey = CompanyListPayload;

export type EventListQueryKey = {
  companyId: string;
  page?: number;
  per_page?: number;
};
<<<<<<< HEAD

export type EventFavoritesQueryKey = {
  page?: number;
  per_page?: number;
};

export type EventCommentsQueryKey = {
  eventId: string;
  page?: number;
  per_page?: number;
};
=======
>>>>>>> de231323b82dbdb51496d66d63e896fd6cc1efb6
