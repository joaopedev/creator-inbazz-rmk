import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

export const step1Schema = z
    .object({
        name: z.string().min(1, "Nome obrigatório"),
        lastName: z.string().min(1, "Sobrenome obrigatório"),
        cpf: z.string().regex(/^\d{11}$/, "CPF inválido"),
        email: z.string().email("Email inválido"),
        confirmEmail: z.string().email("Confirmação de email inválida"),
        password: z.string().regex(passwordRegex, "Senha fraca"),
        confirmPassword: z.string().min(8, "Confirmação obrigatória"),
        instagram: z.string().min(2, "Obrigatório"),
        tiktok: z.string().optional(),
        agreeTerms: z.boolean().refine(val => val === true, {
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