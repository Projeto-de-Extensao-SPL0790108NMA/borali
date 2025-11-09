import { format } from "date-fns";
import { ptBR as ptBRLocale } from "date-fns/locale/pt-BR";

const formatDateTime = (date: Date | string) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return format(dateObj, "MM/dd/yyyy h:mm a");
};

const formatDateToMMDDYYYY = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return format(date, "MM/dd/yyyy");
  } catch {
    return dateString;
  }
};

const formatDateToBrazilianShort = (date?: Date | string): string => {
  const dateObj = date
    ? typeof date === "string"
      ? new Date(date)
      : date
    : new Date();

  // Extrai dias da semana do locale date-fns
  const days = [
    ptBRLocale.localize.day(0, { width: "abbreviated" }), // Dom
    ptBRLocale.localize.day(1, { width: "abbreviated" }), // Seg
    ptBRLocale.localize.day(2, { width: "abbreviated" }), // Ter
    ptBRLocale.localize.day(3, { width: "abbreviated" }), // Qua
    ptBRLocale.localize.day(4, { width: "abbreviated" }), // Qui
    ptBRLocale.localize.day(5, { width: "abbreviated" }), // Sex
    ptBRLocale.localize.day(6, { width: "abbreviated" }), // Sáb
  ];

  // Extrai meses do locale date-fns
  const months = [
    ptBRLocale.localize.month(0, { width: "abbreviated" }), // Jan
    ptBRLocale.localize.month(1, { width: "abbreviated" }), // Fev
    ptBRLocale.localize.month(2, { width: "abbreviated" }), // Mar
    ptBRLocale.localize.month(3, { width: "abbreviated" }), // Abr
    ptBRLocale.localize.month(4, { width: "abbreviated" }), // Mai
    ptBRLocale.localize.month(5, { width: "abbreviated" }), // Jun
    ptBRLocale.localize.month(6, { width: "abbreviated" }), // Jul
    ptBRLocale.localize.month(7, { width: "abbreviated" }), // Ago
    ptBRLocale.localize.month(8, { width: "abbreviated" }), // Set
    ptBRLocale.localize.month(9, { width: "abbreviated" }), // Out
    ptBRLocale.localize.month(10, { width: "abbreviated" }), // Nov
    ptBRLocale.localize.month(11, { width: "abbreviated" }), // Dez
  ];

  const dayName = days[dateObj.getDay()];
  const day = dateObj.getDate();
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  return `${dayName}, ${day} ${month} ${year}`;
};

const formatEventDate = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const day = dateObj.getDate();
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const month = monthNames[dateObj.getMonth()];
  return `${day} de ${month}`;
};

const formatEventTime = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");
  return `${hours}h${minutes}`;
};

const formatEventDayOfWeek = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const dayNames = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];
  return dayNames[dateObj.getDay()];
};

export const dateUtils = {
  formatDateTime,
  formatDateToMMDDYYYY,
  formatDateToBrazilianShort,
  formatEventDate,
  formatEventTime,
  formatEventDayOfWeek,
};
