import { z } from "zod";

export const step3Schema = z.object({
  state: z.string(),
  city: z.string(),
  cep: z.string(),
  neighborhood: z.string(),
  street: z.string(),
  number: z.string(),
  complement: z.string().optional(),
  country: z.string(),
});

export type Step3Data = z.infer<typeof step3Schema>;
