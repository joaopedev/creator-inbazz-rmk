import { z } from "zod";
import {calculationAdministeredSchema} from "../schemas/index";

export type TypeCalculationAdministered = {
  selectSpecies: string;
  selectLineage: string;
  selectPhaseLife: string;
  numberAnimals: number;
};

export type CalculationAdministeredForm = z.infer<
  typeof calculationAdministeredSchema
>;