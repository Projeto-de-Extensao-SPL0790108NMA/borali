import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  date: z.string().min(1, "Data é obrigatória"),
  time: z.string().min(1, "Hora é obrigatória"),
  address: z.string().min(1, "Endereço é obrigatório"),
  latitude: z
    .string()
    .refine(
      (val) => {
        const num = parseFloat(val);
        return !isNaN(num) && num >= -90 && num <= 90;
      },
      { message: "Latitude deve ser um número entre -90 e 90" }
    )
    .min(1, "Latitude é obrigatória. Verifique se o endereço foi encontrado."),
  longitude: z
    .string()
    .refine(
      (val) => {
        const num = parseFloat(val);
        return !isNaN(num) && num >= -180 && num <= 180;
      },
      { message: "Longitude deve ser um número entre -180 e 180" }
    )
    .min(1, "Longitude é obrigatória. Verifique se o endereço foi encontrado."),
  image: z.instanceof(File).optional().or(z.string().optional()),
  images: z.array(z.instanceof(File)).optional(),
});

export type CreateEventFormData = z.infer<typeof createEventSchema>;
