import { z } from "zod";

export const registerCompanySchema = z.object({
  nomeEmpresa: z
    .string()
    .min(1, "Nome da empresa é obrigatório")
    .min(3, "Nome da empresa deve ter pelo menos 3 caracteres"),
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Email inválido"),
  telefone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .min(10, "Telefone deve ter pelo menos 10 dígitos"),
  endereco: z
    .string()
    .min(1, "Endereço é obrigatório")
    .min(5, "Endereço deve ter pelo menos 5 caracteres"),
  descricao: z
    .string()
    .optional(),
  nomeResponsavel: z
    .string()
    .optional(),
  senha: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export type RegisterCompanyFormData = z.infer<typeof registerCompanySchema>;

