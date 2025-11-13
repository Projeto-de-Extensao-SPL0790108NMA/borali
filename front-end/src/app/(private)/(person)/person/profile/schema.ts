import { z } from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

