import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React from "react";
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

export default function SigninScreen() {
  const { login, loading, error, user } = useSupabaseAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<LoginPayload>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signinSchema as z.ZodType<LoginPayload>),
  });

  const handleLogin = async (data: LoginPayload) => {
    await login(data.email, data.password);
    if (error) {
      console.error("Login error:", error);
      alert("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.containerLogo}>
          <Image
            style={{ maxHeight: "85%", width: 176 }}
            source={require("../../../assets/images/Logo-App-Nova.png")}
          />
        </View>
        <FormInput
          label="Email"
          name="email"
          placeholder="Insira seu email"
          required={true}
          control={control}
          error={errors.email?.message}
          colorLabel="#4E4E4E"
        />
        <FormInput
          label="Senha"
          name="password"
          placeholder="Insira sua senha"
          required={true}
          control={control}
          error={errors.password?.message}
          paddingTopLabel={20}
          colorLabel="#4E4E4E"
        />
        <TouchableOpacity
          onPress={() =>
            router.push("/(not-authenticated)/forgot-password/page")
          }
        >
          <Text style={styles.forgotText}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.loginButton]}
          onPress={handleSubmit((data) => handleLogin(data))}
        >
          <Text style={styles.loginButtonText}>
            {" "}
            {loading ? <ActivityIndicator color="white" /> : "ENTRAR"}
          </Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => router.push("/(not-authenticated)/signup/page")}
        >
          <Text style={styles.signupButtonText}>Entrar via email</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(not-authenticated)/signup/page")}
        >
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={styles.signinTextFirst}>Não tem uma conta?</Text>
            <Text style={styles.signinTextSecond}> Cadastre-se</Text>
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
    marginBottom: 120,
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
  },
  signupButtonText: {
    fontWeight: "bold",
    color: "#25399E",
    fontSize: 12,
  },
});
