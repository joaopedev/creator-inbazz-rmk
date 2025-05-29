import { create } from "zustand";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  userId: number | null;
  setSession: (token: string, userId: number) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const authStore = create<AuthState>((set) => ({
  token: null,
  userId: null,
  isAuthenticated: false,

  setSession: async (token, userId) => {
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("userId", String(userId));
    set({ token, userId, isAuthenticated: true });
  },

  logout: async() => {
    await AsyncStorage.multiRemove(["token", "userId"]);
    set({ token: null, isAuthenticated: false, userId: null });
    router.replace("/(not-authenticated)/signin/page");
  },

  checkAuth: async () => {
    const [token, userIdStr] = await AsyncStorage.multiGet(["token", "userId"]);
    const tokenValue = token[1];
    const userIdValue = userIdStr[1] ? Number(userIdStr[1]) : null;

    set({
      token: tokenValue,
      userId: userIdValue,
      isAuthenticated: !!tokenValue,
    });
  },
}));
