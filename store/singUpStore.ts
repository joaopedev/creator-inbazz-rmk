import axios from "axios";
import { create } from "zustand";
import { SignUpStore } from "../types/auth-data";
import { FinalSignUpData } from "../types/FinalSignUpData";

export const api = axios.create({
  baseURL: "http://192.168.15.15:3000",
});

export async function signUpToBackend(data: FinalSignUpData) {
  try {
    const response = await api.post("/supabase", {
      email: data.email,
      password: data.password,
      metadata: {
        name: data.name,
        last_name: data.lastName,
        doc: data.cpf,
        username: data.username,
        email: data.email,
        ig_id: data.username, // use outro campo se necessário
        ttk_user: data.tiktok,
        ddd: data.phoneDDD,
        phone_number: data.phoneNumber,
        birthday: data.birthDate,
        gender: data.gender,
        description: data.aboutYou,
        additional_info: {
          haveAgent: data.haveAgent,
        },
        address_state: data.state,
        address_city: data.city,
        cep: data.cep,
        address_neighborhood: data.neighborhood,
        address_street: data.street,
        address_number: data.number,
        address_complement: data.complement,
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
  signUp: (data) => set({}),
}));
