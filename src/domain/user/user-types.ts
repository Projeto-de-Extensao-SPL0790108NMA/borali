export interface CompanyData {
  id: string;
  phone: string;
  address: string;
  description: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface UserMeDTO {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  company: CompanyData;
}
