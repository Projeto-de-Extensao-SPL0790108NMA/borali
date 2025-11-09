import { CompanyListPayload } from "@/domain/company/company-types";

export type CompanyListQueryKey = CompanyListPayload;

export type EventListQueryKey = {
  companyId: string;
  page?: number;
  per_page?: number;
};
