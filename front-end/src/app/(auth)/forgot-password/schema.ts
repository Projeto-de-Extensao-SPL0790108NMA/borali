import { z } from "zod";

// Step 1: Email
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Email inválido"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// Step 2: Código de verificação
export const verifyCodeSchema = z.object({
  code: z
    .string()
    .min(6, "Código deve ter 6 dígitos")
    .max(6, "Código deve ter 6 dígitos")
    .regex(/^\d{6}$/, "Código deve conter apenas números"),
});

export type VerifyCodeFormData = z.infer<typeof verifyCodeSchema>;

// Step 3: Nova senha
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Senha é obrigatória")
      .min(6, "Senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z
      .string()
      .min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

