import { create } from "zustand";

interface UIStore {
    toastMessage: string;
    showToast: boolean;
    showSpinner: boolean;
    showToastMessage: (message: string) => void;
    hideToast: () => void;
    setSpinner: (value: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
    toastMessage: "",
    showToast: false,
    showSpinner: false,

    showToastMessage: (message) => {
        set({ toastMessage: message, showToast: true });
        setTimeout(() => set({ showToast: false }), 5000);
    },

    hideToast: () => set({ showToast: false }),
    setSpinner: (value) => set({ showSpinner: value }),
}));
