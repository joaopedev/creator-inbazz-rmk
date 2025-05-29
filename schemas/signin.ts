import { z } from "zod";

const signinSchema = z.object({
  email: z.string().email("Insira um email válido"),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres').max(32, "A senha deve ter no máximo 32 caracteres"),
});

export default signinSchema;