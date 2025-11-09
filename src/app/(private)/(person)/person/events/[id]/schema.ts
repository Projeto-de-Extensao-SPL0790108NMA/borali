import { z } from "zod";

export const commentSchema = z.object({
  description: z
    .string()
    .min(1, "Comentário é obrigatório")
    .min(3, "Comentário deve ter pelo menos 3 caracteres"),
});

export type CommentFormData = z.infer<typeof commentSchema>;
