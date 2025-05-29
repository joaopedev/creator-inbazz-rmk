import { signupSchema, tokenResetPasswordSchema } from "@/schemas/index";

import { z } from "zod";

export type LoginPayload  = {
  email: string;
  password: string;
}

export type signUpType =  {
  // Step 1
  name: string;
  username: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  instagram: string;
  tiktok?: string;
  agreeTerms: boolean;
  cpf: string;
  lastName: string;

  // Step 2
  phoneDDD: string;
  phoneNumber: string;
  birthDate: string;
  gender: "Feminino" | "Masculino" | "Não binário" | "Outro" | "Prefiro não dizer";
  aboutYou: string;
  isPregnant: "Sim" | "Não" | "";

  // Step 3
  state: string;
  city: string;
  cep: string;
  neighborhood: string;
  street: string;
  number: string;
  complement: string;
};

export type SignInType = {
  email: string;
  password: string;
};

export type TokenType = {
  token: string;
};

export type ResetType = {
  newPassword: string;
  confirmNewPassword: string;
};

export type PasswordEmail = {
  email: string;
  password: string;
};

export type ForgotPasswordType = {
  email: string;
};

export type UserDataType = {
  token: string;
  message: string;
};

export type TokenResetPasswordType = z.infer<typeof tokenResetPasswordSchema>;
export type SignUpType = z.infer<typeof signupSchema>;
