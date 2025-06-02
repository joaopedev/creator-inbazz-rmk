import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

export const step1Schema = z
  .object({
    name: z.string().min(1),
    lastName: z.string().min(1),
    cpf: z.string().regex(/^\d{11}$/),
    username: z.string().min(2),
    email: z.string().email(),
    confirmEmail: z.string().email(),
    password: z.string().regex(passwordRegex),
    confirmPassword: z.string().min(8),
    instagram: z.string().min(2),
    tiktok: z.string().optional(),
    agreeTerms: z.boolean().refine(val => val === true, { message: "Aceite obrigatório" }),
  })
  .refine(data => data.email === data.confirmEmail, {
    path: ["confirmEmail"],
    message: "Emails não coincidem",
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Senhas não coincidem",
  });

export const step2Schema = z.object({
  phoneDDD: z.string(),
  phoneNumber: z.string(),
  birthDate: z.string(),
  gender: z.enum(["Feminino", "Masculino", "Não binário", "Outro", "Prefiro não dizer"]),
  aboutYou: z.string(),
  isPregnant: z.enum(["Sim", "Não", ""]),
});

export const step3Schema = z.object({
  state: z.string(),
  city: z.string(),
  cep: z.string(),
  neighborhood: z.string(),
  street: z.string(),
  number: z.string(),
  complement: z.string().optional(),
});

export const signupSchema = z.object({
  step1: step1Schema,
  step2: step2Schema,
  step3: step3Schema,
});

export type SignupType = z.infer<typeof signupSchema>;
export default signupSchema;