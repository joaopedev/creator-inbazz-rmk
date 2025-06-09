import { z } from "zod";

export const step3Schema = z.object({
  address_state: z.string(),
  address_city: z.string(),
  cep: z.string(),
  address_neighborhood: z.string(),
  address_street: z.string(),
  address_number: z.string(),
  address_complement: z.string().optional(),
  country: z.string(), // pode ser usado apenas no frontend, se não for persistido
});

export type Step3Data = z.infer<typeof step3Schema>;
