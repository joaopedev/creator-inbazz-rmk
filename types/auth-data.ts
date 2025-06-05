import { z } from "zod";
import signupSchema from "../schemas/signup";
import { Step1Data } from "../schemas/step1Schema";
import tokenResetPasswordSchema from "../schemas/token-reset-password";

export type LoginPayload = {
  email: string;
  password: string;
};

export type Store = {
  id: string;
  name: string;
  username?: string;
  logo?: string;
};

export type signUpType = {
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
  gender:
    | "Feminino"
    | "Masculino"
    | "Não binário"
    | "Outro"
    | "Prefiro não dizer";
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

export interface Influencer {
  id: string;
  name: string;
  profilePicture: string | null;
  username: string;
}

export interface InfluencerState {
  influencer: Influencer | null;
  isLoading: boolean;
  error: string | null;
}

export interface InfluencerStore {
  store_id: string;
  store: Store;
  coupon_code?: string;
  utm?: string;
}

export interface StoreState {
  stores: InfluencerStore[];
  selectedStore: Store | null;
  isLoading: boolean;
  error: string | null;
}

export interface UseStoreReturn extends StoreState {
  couponCode: string | null;
  utm: string | null;
  setStores: (stores: InfluencerStore[]) => void;
  selectStore: (store: Store | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export type TokenResetPasswordType = z.infer<typeof tokenResetPasswordSchema>;
export type SignUpType = z.infer<typeof signupSchema>;

export type SignUpStore = {
  step1: Step1Data | null;
  setStep1: (data: Step1Data) => void;
};
