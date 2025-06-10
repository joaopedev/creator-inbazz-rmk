import {
  Manrope_400Regular,
  Manrope_700Bold,
  useFonts,
} from "@expo-google-fonts/manrope";
import Ionicons from "@expo/vector-icons/Ionicons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
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
import { signinSchema } from "../../../schemas";
import { useSupabaseAuth } from "../../../store/loginStore";
import { LoginPayload } from "../../../types";

SplashScreen.preventAutoHideAsync();

export default function SigninScreen() {
  const { login, loading } = useSupabaseAuth(); // 'error' da store não será usado diretamente aqui
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Estado para a mensagem de erro geral

  const {
    control,
    handleSubmit,
    setError, // Importar setError para definir erros de forma manual
    formState: { errors },
  } = useForm<LoginPayload>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signinSchema as z.ZodType<LoginPayload>),
  });

  let [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const handleLogin = async (data: LoginPayload) => {
    setErrorMessage(null); // Limpa mensagens de erro anteriores
    try {
      // A função login da sua store deve lançar um erro em caso de falha
      await login(data.email, data.password);
      // Se o login for bem-sucedido, o `router.push` ou lógica de navegação deve ser acionada na sua store.
      // Ou, se o login aqui significa apenas autenticação, você pode navegar:
      // router.push("/(authenticated)/home"); // Exemplo de navegação pós-login
    } catch (err: any) {
      // Mudado para 'any' para capturar qualquer tipo de erro de login
      console.error("Login error:", err);

      // Verificação para erros específicos da API ou do Supabase
      const message = err.message || "Erro desconhecido ao fazer login.";

      // Exemplo de mapeamento de erros (ajuste conforme a resposta real do seu backend/Supabase)
      if (err.message.includes("Invalid login credentials")) {
        setError("email", {
          type: "manual",
          message: "E-mail ou senha inválidos.",
        });
        setError("password", { type: "manual", message: "" }); // Limpa o erro da senha, se o erro for combinado
        setErrorMessage("Credenciais inválidas. Verifique seu e-mail e senha.");
      } else if (err.message.includes("User not found")) {
        setError("email", {
          type: "manual",
          message: "E-mail não encontrado.",
        });
        setErrorMessage("E-mail não encontrado. Por favor, cadastre-se.");
      } else if (err.response?.data?.message) {
        // Se o erro vier do Axios/Backend
        setErrorMessage(err.response.data.message);
        // Se o backend enviar erros específicos por campo, você pode mapeá-los:
        // if (err.response.data.errors && err.response.data.errors.email) {
        //   setError("email", { type: "manual", message: err.response.data.errors.email });
        // }
        // if (err.response.data.errors && err.response.data.errors.password) {
        //   setError("password", { type: "manual", message: err.response.data.errors.password });
        // }
      } else {
        setErrorMessage("Erro inesperado ao fazer login. Tente novamente.");
      }
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
            style={styles.logoImage}
            source={require("../../../assets/images/logoapp.png")}
          />
        </View>
        <Text style={styles.textHeader}>Email</Text>
        <FormInput
          label=""
          name="email"
          placeholder="Insira seu email"
          required={true}
          control={control}
          error={errors.email?.message} // Passando a mensagem de erro específica do campo
        />
        <Text style={[styles.textHeader, { marginTop: 20 }]}>Senha</Text>
        <FormInput
          label=""
          name="password"
          placeholder="Insira sua senha"
          required={true}
          control={control}
          error={errors.password?.message} // Passando a mensagem de erro específica do campo
          iconRight={
            <Ionicons
              name={showPassword ? "eye" : "eye-off"}
              size={20}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
          secureTextEntry={!showPassword}
        />
        {/* Exibir a mensagem de erro geral, se houver */}
        {errorMessage && (
          <Text style={styles.generalErrorMessage}>{errorMessage}</Text>
        )}

        <TouchableOpacity
          onPress={() =>
            router.push("/(not-authenticated)/forgot-password/page")
          }
        >
          <Text style={[styles.forgotText, { fontFamily: "Manrope_700Bold" }]}>
            Esqueceu sua senha?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.loginButton]}
          onPress={handleSubmit(handleLogin)} // Ajustado para chamar handleLogin diretamente
        >
          <Text style={styles.loginButtonText}>
            {" "}
            {loading ? <ActivityIndicator color="white" /> : "ENTRAR"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => router.push("/(not-authenticated)/signup/page")}
        >
          <Text
            style={[styles.signupButtonText, { fontFamily: "Manrope_700Bold" }]}
          >
            Entrar via email
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(not-authenticated)/signup/page")}
        >
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text
              style={[
                styles.signinTextFirst,
                { fontFamily: "Manrope_700Bold" },
              ]}
            >
              Não tem uma conta?
            </Text>
            <Text
              style={[
                styles.signinTextSecond,
                { fontFamily: "Manrope_700Bold" },
              ]}
            >
              {" "}
              Cadastre-se
            </Text>
          </View>
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
    width: "90%",
    backgroundColor: "white",
    marginTop: 140,
  },
  containerLogo: {
    alignItems: "center",
    width: "100%",
    height: 100,
    marginBottom: 60,
  },
  logoImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  loginButton: {
    backgroundColor: "#25399E",
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 12,
    fontFamily: "Manrope_700Bold",
  },
  forgotText: {
    color: "#546ADA",
    marginTop: 25,
    textAlign: "right",
    fontSize: 12,
    fontWeight: "bold",
  },
  signinTextFirst: {
    color: "#4E4E4E",
    marginTop: 25,
    textAlign: "right",
    fontSize: 12,
    fontWeight: "bold",
  },
  signinTextSecond: {
    color: "#546ADA",
    marginTop: 25,
    textAlign: "right",
    fontSize: 12,
    fontWeight: "bold",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
    marginVertical: 20,
    opacity: 0.6,
  },
  signupButton: {
    borderWidth: 1.5,
    borderColor: "#DBE1FF",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 20
  },
  signupButtonText: {
    fontWeight: "bold",
    color: "#25399E",
    fontSize: 12,
  },
  textHeader: {
    color: "#4E4E4E",
    fontSize: 13,
    fontFamily: "Manrope_700Bold",
    marginBottom: 8,
    textAlign: "left",
  },
  textSubheader: {
    color: "#4E4E4E",
    fontSize: 14,
    fontFamily: "Manrope_400Regular",
    textAlign: "left",
    marginBottom: 20,
  },
  // Estilo para a mensagem de erro geral
  generalErrorMessage: {
    color: "red",
    fontSize: 12,
    marginTop: 10,
    textAlign: "center",
  },
});
