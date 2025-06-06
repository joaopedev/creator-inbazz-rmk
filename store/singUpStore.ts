import axios from "axios";
import { create } from "zustand";
import { SignUpStore } from "../types/auth-data";

export const api = axios.create({
  baseURL: "http://192.168.15.2:3000",
});

export async function signUpToBackend(data: any) {
  try {
    const response = await api.post("/supabase", {
      email: data.step1.email,
      password: data.step1.password,
      metadata: {
        name: data.step1.name,
        last_name: data.step1.lastName,
        doc: data.step1.cpf,
        username: data.step1.username,
        email: data.step1.email,
        ig_id: data.step1.instagram,
        ttk_user: data.step1.tiktok,
        ddd: data.step2.phoneDDD,
        phone_number: data.step2.phoneNumber,
        birthday: data.step2.birthDate,
        gender: data.step2.gender,
        description: data.step2.aboutYou,
        additional_info: {
          haveAgent: data.step2.haveAgent,
        },
        address_state: data.step3.state,
        address_city: data.step3.city,
        cep: data.step3.cep,
        address_neighborhood: data.step3.neighborhood,
        address_street: data.step3.street,
        address_number: data.step3.number,
        address_complement: data.step3.complement,
      },
    });

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

    return response.data; // Aqui você pode armazenar token, user info, etc.
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

export async function signUp(data: any) {
  try {
    const response = await api.post("/supabase", {
      email: data.step1.email,
      password: data.step1.password,
      metadata: {
        name: data.step1.name,
        last_name: data.step1.lastName,
        doc: data.step1.cpf,
        username: data.step1.username,
        instagram: data.step1.instagram,
        tiktok: data.step1.tiktok,
        phoneDDD: data.step2.phoneDDD,
        phoneNumber: data.step2.phoneNumber,
        birthDate: data.step2.birthDate,
        gender: data.step2.gender,
        aboutYou: data.step2.aboutYou,
        haveAgent: data.step2.haveAgent,
        state: data.step3.state,
        city: data.step3.city,
        cep: data.step3.cep,
        neighborhood: data.step3.neighborhood,
        street: data.step3.street,
        number: data.step3.number,
        complement: data.step3.complement,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(
      "Erro no cadastro:",
      error.response?.data?.message || error.message
    );
    throw new Error(
      error.response?.data?.message || "Erro inesperado ao criar conta."
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
  signUp: (data) => set({})
}));
