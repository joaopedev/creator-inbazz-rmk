/**
 * Hook simplificado para acessar os dados de lojas do Zustand store
 */

import { UseStoreReturn } from "@/types/auth-data";
import { useStoreStore } from "./store";

export function useStore(): UseStoreReturn {
  const {
    stores,
    selectedStore,
    isLoading,
    error,
    setStores,
    selectStore,
    setLoading,
    setError,
  } = useStoreStore();

  // Encontrar a loja selecionada nos stores
  const selectedStoreData = stores.find(
    (store) => store.store_id === selectedStore?.id
  );

  return {
    stores,
    selectedStore,
    isLoading,
    error,
    couponCode: selectedStoreData?.coupon_code || null,
    utm: selectedStoreData?.utm || null,
    setStores,
    selectStore,
    setLoading,
    setError,
  };
} 