import axios from "axios";
import { useState } from "react";

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL; // substitua pelo seu
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    "SUPABASE_URL and SUPABASE_ANON_KEY must be defined in environment variables"
  );
}
interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    [key: string]: any;
  };
}

export function useSupabaseAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<LoginResponse | null>(null);
  const API_AUTH_URL = `${SUPABASE_URL}/auth/v1/token?grant_type=password`;

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<LoginResponse>(
        API_AUTH_URL,
        { email, password },
        {
          headers: {
            apikey: SUPABASE_ANON_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      setUser(response.data);
      console.log("Login successful:", response.data);

      return response.data;
    } catch (err: any) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.error_description || "Erro ao fazer login");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    error,
    user,
  };
}
