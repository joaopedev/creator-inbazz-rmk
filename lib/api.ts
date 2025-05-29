import axios from "axios";

const SUPABASE_URL = 'https://pyleyiwcydiznmrilviu.supabase.co'; // substitua pelo seu
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5bGV5aXdjeWRpem5tcmlsdml1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2NzkwOTAsImV4cCI6MjA1MzI1NTA5MH0.kticiXfXaBYbZ4gLTuw-7WWBmMxEWuPRKsJ6-PQu2zU';

export const api = axios.create({
  baseURL: `${SUPABASE_URL}/rest/v1`,
  headers: {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  },
});


