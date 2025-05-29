import axios from 'axios';
import { useState } from 'react';

const SUPABASE_URL = 'https://pyleyiwcydiznmrilviu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5bGV5aXdjeWRpem5tcmlsdml1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2NzkwOTAsImV4cCI6MjA1MzI1NTA5MH0.kticiXfXaBYbZ4gLTuw-7WWBmMxEWuPRKsJ6-PQu2zU'; // substitua pelo seu

const API_URL = `${SUPABASE_URL}/rest/v1/`

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

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<LoginResponse>(
        API_URL,
        { email, password },
        {
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setUser(response.data);
      console.log('Login successful:', response.data, user);
      return response.data;
    } catch (err: any) {
      console.error('Login error:', err.response?.data || err.message);
      setError(err.response?.data?.error_description || 'Erro ao fazer login');
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