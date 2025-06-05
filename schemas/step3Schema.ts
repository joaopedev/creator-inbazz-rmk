import { z } from "zod";

export const step3Schema = z.object({
  country: z.string(),
  state: z.string(),
  city: z.string(),
  cep: z.string(),
  neighborhood: z.string(),
  street: z.string(),
  number: z.string(),
  complement: z.string().optional(),
});


export type Step3Data = z.infer<typeof step3Schema>;