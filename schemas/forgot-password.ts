import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email("Insira um email válido"),
});

export default forgotPasswordSchema;
