import { z } from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .min(1, "Nome da empresa é obrigatório")
    .min(3, "Nome da empresa deve ter pelo menos 3 caracteres"),
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  phone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .min(10, "Telefone deve ter pelo menos 10 dígitos"),
  address: z
    .string()
    .min(1, "Endereço é obrigatório")
    .min(5, "Endereço deve ter pelo menos 5 caracteres"),
  description: z.string().optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
