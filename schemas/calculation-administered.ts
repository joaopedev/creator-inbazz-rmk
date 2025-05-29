import { z } from "zod";

const calculationAdministeredSchema = z.object({
  selectSpecies: z.string().nonempty("Campo obrigatório"),
  selectLineage: z.string().nonempty("Campo obrigatório"),
  selectPhaseLife: z.string().nonempty("Campo obrigatório"),
  numberAnimals: z
    .string()
    .nonempty("Campo obrigatório")
    .regex(/^[1-9]\d*$/, "O valor não pode começar com 0")
});

export default calculationAdministeredSchema;
