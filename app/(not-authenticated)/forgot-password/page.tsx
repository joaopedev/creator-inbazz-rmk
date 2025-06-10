import {
  Manrope_400Regular, // Importe as variantes da fonte que você vai usar
  Manrope_700Bold,
  useFonts, // Importe useFonts
} from "@expo-google-fonts/manrope";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { router } from "expo-router";
import * as SplashScreen from "expo-splash-screen"; // Importe SplashScreen
import React, { useEffect, useState } from "react"; // Adicionado useEffect
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { z } from "zod";
import { FormInput } from "../../../components/FormInput";
import { forgotPasswordSchema } from "../../../schemas";
import { requestPasswordReset } from "../../../store/singUpStore";
import { ForgotPasswordType } from "../../../types";

SplashScreen.preventAutoHideAsync();

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof forgotPasswordSchema>>({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordSchema),
  });

  // Carregamento da fonte Manrope
  let [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_700Bold,
  });

  useEffect(() => {
    // Esconde a splash screen assim que as fontes estiverem carregadas
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const onSubmit = async (data: ForgotPasswordType) => {
    try {
      setLoading(true);
      await requestPasswordReset(data.email);
      console.log(data.email);
      setLoading(false);
      router.push("/(not-authenticated)/signin/page"); // Redireciona para a tela de login
      reset();
    } catch (error: unknown) {
      console.log("erro ao enviar link:", error);
      setLoading(false);
      const err = error as AxiosError;
      // Exibir mensagem de erro para o usuário
      // Alert.alert("Erro", err.response?.data?.message || "Ocorreu um erro inesperado.");
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.containerLogo}>
          <Image
            style={styles.logoImage} // Usando estilo definido abaixo
            source={require("../../../assets/images/logoapp.png")}
          />
        </View>
        <Text style={styles.headerTitle}>Esqueceu sua senha?</Text>
        <Text style={styles.headerSubtitle}>
          Insira seu email e vamos te enviar um link para redefinir sua senha
        </Text>

        <FormInput
          label="Email" // Label visível diretamente pelo FormInput
          name="email"
          placeholder="Insira seu email"
          required={true}
          control={control}
          error={errors.email?.message}
          colorLabel="#4E4E4E" // Mantendo a cor no FormInput
        />
        <TouchableOpacity
          style={styles.buttonSubmit}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.loginButtonText}>
            {loading ? <ActivityIndicator color="white" /> : "Enviar link"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signupButtonReturn}
          onPress={() => router.push("/(not-authenticated)/signin/page")}
        >
          {/* Corrigido o nome do estilo aqui: de styles.buttonReturnText para styles.returnButtonText */}
          <Text style={styles.returnButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  formContainer: {
    width: "87%", // Largura do formulário
    backgroundColor: "white",
    marginTop: 160, // Ajustado para puxar o conteúdo mais para cima
  },
  containerLogo: {
    alignItems: "center",
    width: "100%",
    height: 60, // Altura ajustada para o logo
    marginBottom: 90, // Reduzido o marginBottom para dar mais espaço acima dos textos
  },
  logoImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  headerTitle: {
    color: "#4E4E4E",
    fontSize: 24, // Aumentado para título principal
    fontFamily: "Manrope_700Bold", // Aplicando a fonte negrito
    marginBottom: 10,
    textAlign: "left", // Alinhado à esquerda
  },
  headerSubtitle: {
    color: "#4E4E4E",
    fontSize: 14,
    fontFamily: "Manrope_400Regular", // Aplicando a fonte regular
    textAlign: "left",
    marginBottom: 30, // Espaçamento maior antes dos inputs
  },
  buttonSubmit: {
    backgroundColor: "#25399E",
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold", // Mantido se a fonte Manrope_700Bold não for suficiente ou para fallback
    fontFamily: "Manrope_700Bold", // Aplicando a fonte negrito
  },

  returnButtonText: {
    // Este é o estilo correto para o texto do botão "Voltar"
    color: "#25399E",
    fontSize: 12,
    fontWeight: "bold",
    borderColor: "#E2E8F0", // Este estilo de borda/fundo provavelmente pertence ao `signupButtonReturn`
    backgroundColor: "white", // Este estilo de borda/fundo provavelmente pertence ao `signupButtonReturn`
    fontFamily: "Manrope_700Bold", // Aplicando a fonte negrito
  },
  containerCreateAccout: {
    // Este estilo parece não estar sendo usado, mas mantido para referência
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
  signinTextFirst: {
    // Este estilo parece não estar sendo usado
    color: "#4E4E4E",
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Manrope_700Bold",
  },
  signinTextSecond: {
    // Este estilo parece não estar sendo usado
    color: "#546ADA",
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Manrope_700Bold",
  },

  signupButtonReturn: {
    borderWidth: 1.5,
    borderColor: "#DBE1FF",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 17,
  },
});
