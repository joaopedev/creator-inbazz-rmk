import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    ActivityIndicator,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import * as z from "zod"; // Importe o zod
import { resetUserPassword } from "../../../store/singUpStore";

// Schema Zod para a nova senha e confirmação
const ResetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmNewPassword"],
  });

type ResetPasswordData = z.infer<typeof ResetPasswordSchema>;

export default function ResetPasswordScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ResetPasswordData>({
    mode: "onChange",
    resolver: zodResolver(ResetPasswordSchema),
  });

  const { access_token } = useLocalSearchParams(); // Pega o token da URL
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [tokenLoaded, setTokenLoaded] = useState(false); // Para controlar o carregamento do token

  useEffect(() => {
    // Verifica se o access_token está presente na URL
    if (access_token) {
      console.log("Access Token from URL:", access_token);
      setTokenLoaded(true);
    } else {
      setMessage("Link de redefinição de senha inválido ou expirado.");
      setIsSuccess(false);
      setTokenLoaded(true); // Indica que a verificação do token foi concluída, mesmo que não tenha sido encontrado
    }
  }, [access_token]);

  const onSubmit = async (data: ResetPasswordData) => {
    if (!access_token) {
      setMessage("Token de redefinição de senha ausente.");
      setIsSuccess(false);
      return;
    }

    setLoading(true);
    setMessage(null);
    setIsSuccess(false);
    try {
      // Chama a função do frontend que irá interagir com o backend
      await resetUserPassword(access_token as string, data.newPassword);
      setMessage("Senha redefinida com sucesso! Você pode fazer login agora.");
      setIsSuccess(true);
      reset(); // Limpa os campos de senha
      // Opcional: redirecionar para a tela de login após um pequeno atraso
      setTimeout(() => {
        router.push("/(not-authenticated)/signin/page");
      }, 3000);
    } catch (error: unknown) {
      console.error("Erro ao redefinir a senha:", error);
      const err = error as Error; // Asserção genérica para erros de JS/rede
      setMessage(err.message || "Erro ao redefinir a senha.");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  if (!tokenLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#25399E" />
        <Text style={styles.loadingText}>Verificando link...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.containerLogo}>
          <Image
            style={{ maxHeight: "85%", width: 176 }}
            source={require("../../../assets/images/Logo-App-Nova.png")} // Ajuste o caminho da imagem se necessário
          />
        </View>

        <Text style={styles.textHeader}>Redefinir Senha</Text>
        <Text style={styles.textSubheader}>Digite sua nova senha abaixo.</Text>

        <Controller
          control={control}
          name="newPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.newPassword && styles.inputError]}
              placeholder="Nova Senha"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
          )}
        />
        {errors.newPassword && (
          <Text style={styles.errorText}>{errors.newPassword.message}</Text>
        )}

        <Controller
          control={control}
          name="confirmNewPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                errors.confirmNewPassword && styles.inputError,
              ]}
              placeholder="Confirme a Nova Senha"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
          )}
        />
        {errors.confirmNewPassword && (
          <Text style={styles.errorText}>
            {errors.confirmNewPassword.message}
          </Text>
        )}

        {message && (
          <Text style={isSuccess ? styles.successMessage : styles.errorMessage}>
            {message}
          </Text>
        )}

        <TouchableOpacity
          style={[
            styles.buttonSubmit,
            (!isValid || loading || !access_token) && styles.buttonDisabled,
          ]}
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || loading || !access_token}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.loginButtonText}>Redefinir Senha</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signupButtonReturn}
          onPress={() => router.push("/(not-authenticated)/signin/page")}
        >
          <Text style={styles.buttonReturnText}>Voltar ao Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white", // Cor de fundo consistente
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "87%",
    backgroundColor: "white",
    marginTop: 0, // Removido o marginTop fixo para centralizar melhor
    alignItems: "center", // Centralizar conteúdo do formulário
  },
  containerLogo: {
    alignItems: "center",
    width: "100%",
    marginBottom: 40, // Ajustado para não ficar muito espaçado
  },
  textHeader: {
    color: "#4E4E4E",
    fontSize: 24, // Aumentado para título principal
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center", // Centralizado
  },
  textSubheader: {
    color: "#4E4E4E",
    fontSize: 16, // Ajustado para subtítulo
    textAlign: "center",
    marginBottom: 30, // Espaçamento maior antes dos inputs
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    alignSelf: "flex-start", // Alinha o erro à esquerda
  },
  buttonSubmit: {
    backgroundColor: "#25399E",
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    width: "100%", // Botão ocupa toda a largura
  },
  loginButtonText: {
    color: "white",
    fontSize: 16, // Aumentado para legibilidade
    fontWeight: "bold",
  },
  buttonDisabled: {
    backgroundColor: "#A8B1D0",
  },
  signupButtonReturn: {
    borderWidth: 1.5,
    borderColor: "#DBE1FF",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 17,
    width: "100%", // Botão ocupa toda a largura
  },
  buttonReturnText: {
    fontWeight: "bold",
    color: "#25399E",
    fontSize: 12,
  },
  successMessage: {
    color: "green",
    marginTop: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  errorMessage: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
});
