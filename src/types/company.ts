import { ptBR } from "date-fns/locale/pt-BR";

export interface Event {
  id: string | number;
  title: string;
  description: string;
  date: Date | string;
  address: string;
  image: string;
}

export interface EventStats {
  totalEvents: number;
  upcomingEvents: number;
  pastEvents: number;
}

export interface CompanyProfile {
  name: string;
  email: string;
  cnpj?: string;
  phone?: string;
  address?: string;
  description?: string;
  avatar?: string;
}

export interface EventFormData {
  title: string;
  description: string;
  date: string;
  address: string;
  image?: File | string | null;
}

const monthAbbreviations = [
  ptBR.localize.month(0, { width: "abbreviated" }).toUpperCase(),
  ptBR.localize.month(1, { width: "abbreviated" }).toUpperCase(),
  ptBR.localize.month(2, { width: "abbreviated" }).toUpperCase(),
  ptBR.localize.month(3, { width: "abbreviated" }).toUpperCase(),
  ptBR.localize.month(4, { width: "abbreviated" }).toUpperCase(),
  ptBR.localize.month(5, { width: "abbreviated" }).toUpperCase(),
  ptBR.localize.month(6, { width: "abbreviated" }).toUpperCase(),
  ptBR.localize.month(7, { width: "abbreviated" }).toUpperCase(),
  ptBR.localize.month(8, { width: "abbreviated" }).toUpperCase(),
  ptBR.localize.month(9, { width: "abbreviated" }).toUpperCase(),
  ptBR.localize.month(10, { width: "abbreviated" }).toUpperCase(),
  ptBR.localize.month(11, { width: "abbreviated" }).toUpperCase(),
] as const;

export type MonthAbbreviation = (typeof monthAbbreviations)[number];
