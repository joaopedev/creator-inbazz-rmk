import { api } from "@/lib/api";
import { SignUpType } from "@/types/auth-data";

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
    isPregnant: string;
  };
  address_state: string;
  address_city: string;
  cep: string;
  address_neighborhood: string;
  address_street: string;
  address_number: string;
  address_complement?: string;
}

export async function signUp(data: SignUpType) {
  const payload: InfluencerPayload = {
    name: data.name,
    last_name: data.lastName,
    doc: data.cpf,
    username: data.username,
    email: data.email,
    ig_id: data.instagram,
    ttk_user: data.tiktok,
    ddd: data.phoneDDD,
    phone_number: data.phoneNumber,
    birthday: data.birthDate,
    gender: data.gender,
    description: data.aboutYou,
    additional_info: {
      isPregnant: data.isPregnant,
    },
    address_state: data.state,
    address_city: data.city,
    cep: data.cep,
    address_neighborhood: data.neighborhood,
    address_street: data.street,
    address_number: data.number,
    address_complement: data.complement,
  };

  try {
    const response = await api.post("rest/v1/influencers", payload);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao criar conta:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Erro inesperado ao criar conta."
    );
  }
}
