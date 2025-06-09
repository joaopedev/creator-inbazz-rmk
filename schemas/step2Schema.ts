import { z } from "zod";

export const step2Schema = z.object({
  phoneDDD: z.string(),
  phoneNumber: z.string(),
  birthDate: z.string(),
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
