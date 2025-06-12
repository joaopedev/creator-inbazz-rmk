import { z } from "zod";

export const ResetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmNewPassword"],
  });

export type ResetPasswordData = z.infer<typeof ResetPasswordSchema>;
