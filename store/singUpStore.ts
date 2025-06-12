import axios from "axios";
import { create } from "zustand";
import { SignUpStore } from "../types/auth-data";
import { FinalSignUpData } from "../types/FinalSignUpData";

export const api = axios.create({
  baseURL: "http://192.168.18.41:3000",
});

export async function signUpToBackend(data: FinalSignUpData) {
  try {
    const response = await api.post("/supabase", {
      email: data.email,
      password: data.password,
      name: data.name,
      lastName: data.lastName,
      cpf: data.cpf,
      username: data.username,
      instagram: data.username, // use outro campo se necessário
      tiktok: data.tiktok,
      phoneDDD: data.phoneDDD,
      phoneNumber: data.phoneNumber,
      birthDate: data.birthDate,
      gender: data.gender,
      aboutYou: data.aboutYou,
      haveAgent: data.haveAgent,
      state: data.state,
      city: data.city,
      cep: data.cep,
      neighborhood: data.neighborhood,
      street: data.street,
      number: data.number,
      complement: data.complement,
    });
    console.log(data);

    return response.data;
  } catch (error: any) {
    console.error(
      "Erro ao criar conta:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function signIn(email: string, password: string) {
  try {
    const response = await api.post("/supabase/login", {
      email,
      password,
    });

    return response.data;
  } catch (error: any) {
    console.error(
      "Erro no login:",
      error.response?.data?.message || error.message
    );
    throw new Error(
      error.response?.data?.message || "Erro inesperado ao fazer login."
    );
  }
}

export async function resetUserPassword(
  accessToken: string,
  newPassword: string
) {
  try {
    // Chame o endpoint no seu backend que irá acionar o SupabaseService.resetPassword
    const response = await api.post("/supabase/reset-password", {
      accessToken,
      newPassword,
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Erro ao redefinir a senha:",
      error.response?.data?.message || error.message
    );
    throw new Error(
      error.response?.data?.message || "Erro ao redefinir a senha."
    );
  }
}

export async function requestPasswordReset(email: string) {
  try {
    // Chame o endpoint no seu backend que irá acionar o SupabaseService.forgottPassword
    const response = await api.post("/supabase/forgot-password", { email });
    return response.data;
  } catch (error: any) {
    console.error(
      "Erro ao solicitar recuperação de senha:",
      error.response?.data?.message || error.message
    );
    throw new Error(
      error.response?.data?.message || "Erro ao solicitar recuperação de senha."
    );
  }
}

export const useSignUpStore = create<SignUpStore>((set) => ({
  step1: null,
  step2: null,
  step3: null,
  setStep1: (data) => set({ step1: data }),
  setStep2: (data) => set({ step2: data }),
  setStep3: (data) => set({ step3: data }),
  signUp: (data) => set({}),
}));
