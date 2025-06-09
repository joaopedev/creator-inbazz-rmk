import { z } from "zod";

export const step2Schema = z.object({
  ddd: z.string(),
  phone_number: z.string(),
  birthday: z.string(),
  gender: z
    .enum([
      "Feminino",
      "Masculino",
      "Não binário",
      "Outro",
      "Prefiro não dizer",
    ])
    .default("Masculino"),
  description: z.string(),
  haveAgent: z.enum(["Sim", "Não", ""]),
});

export type Step2Data = z.infer<typeof step2Schema>;
