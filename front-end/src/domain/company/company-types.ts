import { Pagination } from "@/api/api-types";

export interface CompanyListPayload extends Partial<Pagination> {
  companyName?: string;
  isActive?: boolean;
}

export interface UpdateCompanyPayload {
  name: string;
  email: string;
  phone: string;
  address: string;
  description?: string | undefined;
}
