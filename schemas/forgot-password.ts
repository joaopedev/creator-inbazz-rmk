import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().email("Insira um email válido"),
});

export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;