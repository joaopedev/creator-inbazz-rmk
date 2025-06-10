import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { router } from "expo-router";
import React, { useState } from "react";
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

  const onSubmit = async (data: ForgotPasswordType) => {
    try {
      setLoading(true);
      await requestPasswordReset(data.email);
      setLoading(false);
      router.push("/(not-authenticated)/signin/page");
      reset();
    } catch (error: unknown) {
      // Tipo 'unknown' é mais seguro para blocos catch
      console.log("erro ao enviar link:", error);
      setLoading(false);
      const err = error as AxiosError; // Asserção de tipo para AxiosError
      // Você pode exibir uma mensagem de erro mais amigável ao usuário aqui
      // Alert.alert("Erro", err.response?.data?.message || "Ocorreu um erro inesperado.");
      return err;
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

        <Text style={styles.textHeader}>Esqueceu sua senha?</Text>
        <Text style={styles.textSubheader}>
          Insira seu email e vamos te enviar um link para redefinir sua senha
        </Text>

        <FormInput
          label="Email"
          name="email"
          placeholder="Insira seu email"
          required={true}
          control={control}
          error={errors.email?.message}
          colorLabel="#4E4E4E"
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
          <Text style={styles.buttonReturnText}>Voltar</Text>
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
    width: "87%",
    backgroundColor: "white",
    marginTop: 140,
  },
  containerLogo: {
    alignItems: "center",
    width: "100%",
    marginBottom: 80,
  },
  textHeader: {
    color: "#4E4E4E",
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "left",
  },
  textSubheader: {
    color: "#4E4E4E",
    fontSize: 14,
    textAlign: "left",
    marginBottom: 20,
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
    fontWeight: "bold",
  },

  returnButtonText: {
    color: "#25399E",
    fontSize: 12,
    fontWeight: "bold",
    borderColor: "#E2E8F0",
    backgroundColor: "white",
  },
  containerCreateAccout: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
  signinTextFirst: {
    color: "#4E4E4E",
    fontSize: 12,
    fontWeight: "bold",
  },
  signinTextSecond: {
    color: "#546ADA",
    fontSize: 12,
    fontWeight: "bold",
  },

  signupButtonReturn: {
    borderWidth: 1.5,
    borderColor: "#DBE1FF",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 17,
  },
  buttonReturnText: {
    fontWeight: "bold",
    color: "#25399E",
    fontSize: 12,
  },
});
