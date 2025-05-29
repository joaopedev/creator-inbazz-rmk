import { z } from "zod";

const resetPasswordSchema = z.object({
  newPassword: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  confirmNewPassword: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Senhas diferentes",
  path: ['confirmNewPassword'],
});

export default resetPasswordSchema;
