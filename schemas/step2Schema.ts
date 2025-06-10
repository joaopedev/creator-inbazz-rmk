import { z } from "zod";

export const step2Schema = z.object({
  phoneDDD: z
    .string()
    .min(2, "DDD é obrigatório")
    .max(2, "DDD deve ter 2 dígitos")
    .regex(/^\d{2}$/, "DDD deve conter apenas números"),
  phoneNumber: z
    .string()
    .min(9, "Telefone deve ter pelo menos 9 dígitos") // Adjusted min length
    .max(10, "Telefone não pode ter mais de 10 dígitos") // Adjusted max length
    .regex(/^\d{4,5}-\d{4}$/, "Telefone inválido. Use o formato XXXXX-XXXX ou XXXX-XXXX"), // Updated regex
  birthDate: z
    .string()
    .transform((val) => val.replace(/\D/g, "")) // Remove máscara antes de validar
    .refine(
      (val) => val.length === 8,
      "Data de nascimento inválida (DDMMAAAA)."
    )
    .refine((val) => {
      const day = parseInt(val.substring(0, 2), 10);
      const month = parseInt(val.substring(2, 4), 10);
      const year = parseInt(val.substring(4, 8), 10);
      const date = new Date(year, month - 1, day);
      return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
      );
    }),
  gender: z
    .enum([
      "Feminino",
      "Masculino",
      "Não binário",
      "Outro",
      "Prefiro não dizer",
    ])
    .default("Masculino"),
  aboutYou: z.string(),
  haveAgent: z.enum(["Sim", "Não", ""]),
});

export type Step2Data = z.infer<typeof step2Schema>;