/**
 * Store para o módulo de lojas usando Zustand
 */

import { InfluencerStore, Store, StoreState } from '@/types/auth-data';
import { create } from 'zustand';


// Estado inicial
const initialState: StoreState = {
  stores: [],
  selectedStore: null,
  isLoading: false,
  error: null,
};

type StoreActions = {
  setStores: (stores: InfluencerStore[]) => void;
  selectStore: (store: Store | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
};

// Utilizando any para contornar problemas de tipagem com o middleware persist
export const useStoreStore = create<
  StoreState & StoreActions
>((set) => ({
  ...initialState,

  setStores: (stores) => {
    set({ stores });
  },
  
  selectStore: (store) => {
    set({ selectedStore: store });
  },
  
  setLoading: (isLoading) => {
    set({ isLoading });
  },
  
  setError: (error) => {
    set({ error });
  },

  reset: () => {
    set({ stores: [], selectedStore: null, isLoading: false, error: null });
  },
})); 