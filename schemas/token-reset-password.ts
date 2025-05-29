import { z } from "zod";

const tokenResetPasswordSchema = z.object({
  token: z
    .string()
    .length(8, "O valor deve ter 8 dígitos")
    .regex(/^\d+$/, "O valor deve ser um número válido"), // Garante apenas números
});

export default tokenResetPasswordSchema;