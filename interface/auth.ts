import { ReactNode } from "react";
import { PasswordEmail } from "@/types/auth-data";
import { ForgotPasswordType } from "@/types/auth-data";
import { UserDataType } from "@/types/auth-data";

export interface IAuthProvider {
  children: ReactNode;
}

export interface IAuthContext {
  isAuthenticated: boolean | null;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
  signIn: (data: PasswordEmail) => Promise<void>;
  forgotPassword: (data: ForgotPasswordType) => Promise<void>;
  signOut: () => Promise<void>;
  onRegister: (data: PasswordEmail) => Promise<void>;
  user: UserDataType | null;
  setUser: React.Dispatch<React.SetStateAction<UserDataType | null>>;
  email: ForgotPasswordType | null | undefined;
  setEmail: React.Dispatch<React.SetStateAction<ForgotPasswordType | null>>;
  getToken: () => Promise<void>;
  isAuthenticatedUser: boolean;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ErrorResponse {
  message: string;
}
