import { api } from "@/lib/api";
import { SignUpType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { Alert } from "react-native";

export const useSignUp = () => {
    return useMutation({
        mutationFn: async (data: SignUpType) => {
            let base64Image = null;

            // if (data.image && data.image[0]) {
            //     const uri = data.image[0].uri;
            //     const fileContent = await fetch(uri).then(res => res.blob());
            //     base64Image = await new Promise<string>((resolve, reject) => {
            //         const reader = new FileReader();
            //         reader.onloadend = () => resolve(reader.result?.toString().split(",")[1] || "");
            //         reader.onerror = reject;
            //         reader.readAsDataURL(fileContent);
            //     });
            // }

            const payload = {
                ...data,
                image: base64Image,
            };

            return api.post("/users", payload);
        },
        onSuccess: () => {
            Alert.alert("Sucesso", "Conta criada com sucesso!");
            router.navigate("/(not-authenticated)/signin/page");
        },
        onError: (error: any) => {
            const msg = error?.response?.data?.message || "Erro ao criar conta";
            Alert.alert("Erro", msg);
        },
    });
};
