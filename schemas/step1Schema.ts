import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

export const step1Schema = z
  .object({
    name: z.string().min(1, "Nome obrigatório"),
    lastName: z.string().min(1, "Sobrenome obrigatório"),
    cpf: z
      .string({
        required_error: "CPF é obrigatório.",
      })
      .transform((val) => val.replace(/\D/g, ""))
      .refine((doc) => {
        const replacedDoc = doc.replace(/\D/g, "");
        return replacedDoc.length >= 11;
      }, "CPF deve conter no mínimo 11 caracteres.")
      .refine((doc) => {
        const replacedDoc = doc.replace(/\D/g, "");
        return !!Number(replacedDoc);
      }, "CPF deve conter apenas números."),
    email: z.string().email("Email inválido"),
    confirmEmail: z.string().email("Confirmação de email inválida"),
    password: z.string().regex(passwordRegex, "Senha fraca"),
    confirmPassword: z.string().min(8, "Confirmação obrigatória"),
    username: z.string().min(2, "Obrigatório"),
    instagram: z.string().optional(),
    tiktok: z.string().optional(),
    agreeTerms: z.boolean().refine((val) => val === true, {
      message: "Você deve aceitar os termos de uso",
    }),
  })
  .refine((data) => data.email === data.confirmEmail, {
    path: ["confirmEmail"],
    message: "Emails não coincidem",
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Senhas não coincidem",
  });

export type Step1Data = z.infer<typeof step1Schema>;
