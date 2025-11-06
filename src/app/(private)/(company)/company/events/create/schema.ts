import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  date: z.string().min(1, "Data é obrigatória"),
  address: z.string().min(1, "Endereço é obrigatório"),
  image: z.instanceof(File).optional().or(z.string().optional()),
});

export type CreateEventFormData = z.infer<typeof createEventSchema>;


