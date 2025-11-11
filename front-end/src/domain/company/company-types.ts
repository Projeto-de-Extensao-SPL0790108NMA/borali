import { Pagination } from "@/api/api-types";

export interface CompanyListPayload extends Partial<Pagination> {
  companyName?: string;
  isActive?: boolean;
}
