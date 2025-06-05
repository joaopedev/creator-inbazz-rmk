import { create } from "zustand";
import { SignUpStore, SignUpType } from "../types/auth-data";

interface InfluencerPayload {
  name: string;
  last_name: string;
  doc: string;
  username: string;
  email: string;
  ig_id: string;
  ttk_user?: string;
  ddd: string;
  phone_number: string;
  birthday: string;
  gender: string;
  description: string;
  additional_info: {
    haveAgent: string;
  };
  address_state: string;
  address_city: string;
  cep: string;
  address_neighborhood: string;
  address_street: string;
  address_number: string;
  address_complement?: string;
}

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "";

export async function signUp(data: SignUpType) {
  try {
    // 1. Criar o usuário no Supabase Auth
    const signUpResponse = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        email: data.step1.email,
        password: data.step1.password, // tem que ter senha no data
      }),
    });

    const signUpData = await signUpResponse.json();

    if (!signUpResponse.ok) {
      throw new Error(signUpData.error?.message || "Erro ao criar usuário");
    }
    const payload: InfluencerPayload = {
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
    };

    const insertResponse = await fetch(`${SUPABASE_URL}/rest/v1/influencers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY as string,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify(payload),
    });

    if (!insertResponse.ok) {
      const insertError = await insertResponse.json();
      throw new Error(
        insertError.message || "Erro ao salvar dados do influencer"
      );
    }

    return await insertResponse.json();
  } catch (error: any) {
    console.error("Erro ao criar conta:", error.message);
    throw new Error(error.message || "Erro inesperado ao criar conta.");
  }
}

export const useSignUpStore = create<SignUpStore>((set) => ({
  step1: null,
  step2: null,
  step3: null,
  setStep1: (data) => set({ step1: data }),
  setStep2: (data) => set({ step2: data }),
  setStep3: (data) => set({ step3: data })
}));
