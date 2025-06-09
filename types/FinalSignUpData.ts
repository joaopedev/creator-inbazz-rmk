import { Step1Data } from "../schemas/step1Schema";
import { Step2Data } from "../schemas/step2Schema";
import { Step3Data } from "../schemas/step3Schema";

export type FinalSignUpData = Step1Data & Step2Data & Step3Data;