import { ptBR } from "date-fns/locale/pt-BR";
import { MonthAbbreviation } from "@/types/company";

export const MONTHS_ABBREVIATED: readonly MonthAbbreviation[] = [
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

export function getMonthAbbreviation(month: number): MonthAbbreviation {
  if (month < 0 || month > 11) {
    throw new Error(
      `Invalid month number: ${month}. Must be between 0 and 11.`
    );
  }
  return MONTHS_ABBREVIATED[month] || "JAN";
}
