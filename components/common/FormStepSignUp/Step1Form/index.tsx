import Ionicons from "@expo/vector-icons/Ionicons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Step1Data, step1Schema } from "../../../../schemas/step1Schema";
import { api } from "../../../../store/singUpStore";
import { FormInput } from "../../../FormInput";
import Spinner from "../../Spinner";

export interface Step1Props {
  onNext: (data: Step1Data) => void;
}

export const Step1Form = ({ onNext }: Step1Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    clearErrors,
    setValue,
  } = useForm<Step1Data>({
    mode: "onChange",
    resolver: zodResolver(step1Schema),
    defaultValues: {
      name: "",
      lastName: "",
      cpf: "",
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: "",
      username: "",
      tiktok: "",
      agreeTerms: false,
    },
  });

  const emailValue = useWatch({ control, name: "email" });
  const cpfValue = useWatch({ control, name: "cpf" });
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isCheckingCpf, setIsCheckingCpf] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const instagramUsername = useWatch({ control, name: "username" });
  const [isInstagramValid, setIsInstagramValid] = useState(false);
  const [instagramData, setInstagramData] = useState<{
    avatar: string;
    username: string;
  } | null>(null);
  const [loadingInstagram, setLoadingInstagram] = useState(false);

  const formatCpf = (input: string) => {
    // Remove tudo que não for número
    let digits = input.replace(/\D/g, "").slice(0, 11);

    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
    if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
  };

  const handleChangeCpf = (text: string) => {
    const formatted = formatCpf(text);
    setValue("cpf", formatted);
  };

  const validateInstagram = async () => {
    if (!instagramUsername) return;
    setLoadingInstagram(true);
    try {
      const formData = new FormData();
      formData.append("user", instagramUsername);

      const response = await fetch(
        process.env.EXPO_PUBLIC_INSTAGRAM_VALIDATE!,
        { method: "POST", body: formData }
      );
      if (!response.ok) throw new Error("Erro na resposta da API");

      const data = await response.json();
      if (data && data.pfp_url && data.userdoIG) {
        setInstagramData({
          avatar: data.pfp_url,
          username: data.userdoIG,
        });
        setIsInstagramValid(true);
      } else {
        setInstagramData(null);
        setIsInstagramValid(false);
      }
    } catch (error) {
      console.error("Erro ao validar Instagram", error);
      setInstagramData(null);
      setIsInstagramValid(false);
    } finally {
      setLoadingInstagram(false);
    }
  };

  // useEffect de verificação do CPF
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const rawCpfDigits = cpfValue.replace(/\D/g, "");
      if (rawCpfDigits.length === 11) {
        setIsCheckingCpf(true);
        api
          .get(`/supabase/cpf/${rawCpfDigits}`)
          .then((response) => {
            const data = response.data;
            if (Array.isArray(data) && data.length > 0) {
              setError("cpf", {
                type: "manual",
                message: "CPF já cadastrado",
              });
            } else {
              clearErrors("cpf");
            }
          })
          .catch((err) => {
            console.error("Erro ao verificar CPF no backend:", err);
            setError("cpf", {
              type: "manual",
              message: "Erro ao verificar CPF. Tente novamente.",
            });
          })
          .finally(() => {
            setIsCheckingCpf(false);
          });
      } else {
        clearErrors("cpf");
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [cpfValue, setError, clearErrors]);

  // useEffect de verificação de E‐mail
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (emailValue && emailValue.includes("@") && emailValue.includes(".")) {
        setIsCheckingEmail(true);
        api
          .get(`/supabase/email/${emailValue}`)
          .then((response) => {
            const data = response.data;
            if (Array.isArray(data) && data.length > 0) {
              setError("email", {
                type: "manual",
                message: "E-mail já cadastrado",
              });
            } else {
              clearErrors("email");
            }
          })
          .catch((err) => {
            console.error("Erro ao verificar e-mail no backend:", err);
            setError("email", {
              type: "manual",
              message: "Erro ao verificar e-mail. Tente novamente.",
            });
          })
          .finally(() => {
            setIsCheckingEmail(false);
          });
      } else {
        clearErrors("email");
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [emailValue, setError, clearErrors]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vamos começar!</Text>
      <Text style={styles.subtitle}>
        Preencha o formulário abaixo para criar sua conta
      </Text>
      <FormInput
        label="Nome"
        name="name"
        placeholder="Insira seu nome"
        control={control}
        error={errors.name?.message}
        required
      />
      <FormInput
        paddingTopLabel={20}
        label="Sobrenome"
        name="lastName"
        placeholder="Insira seu sobrenome"
        control={control}
        error={errors.lastName?.message}
        required
      />
      <FormInput
        paddingTopLabel={20}
        label="CPF"
        name="cpf"
        placeholder="00000000000"
        control={control}
        error={errors.cpf?.message}
        required
        keyboardType="numeric"
        onChangeText={handleChangeCpf}
      />
      {isCheckingCpf && (
        <Text style={styles.info}>Verificando CPF no servidor...</Text>
      )}
      <FormInput
        paddingTopLabel={20}
        label="E-mail"
        name="email"
        placeholder="exemplo@dominio.com"
        control={control}
        error={errors.email?.message}
        required
        keyboardType="email-address"
      />
      {isCheckingEmail && (
        <Text style={styles.info}>Verificando e-mail no servidor...</Text>
      )}
      <FormInput
        paddingTopLabel={20}
        label="Confirme seu e-mail"
        name="confirmEmail"
        placeholder="Repita seu e-mail"
        control={control}
        error={errors.confirmEmail?.message}
        required
        keyboardType="email-address"
      />
      <FormInput
        paddingTopLabel={20}
        label="Crie sua senha"
        name="password"
        placeholder="Pelo menos 6 caracteres"
        control={control}
        secureTextEntry={!showPassword}
        error={errors.password?.message}
        iconRight={
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={20}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        required
      />
      <FormInput
        paddingTopLabel={20}
        label="Confirme sua senha"
        name="confirmPassword"
        placeholder="Repita sua senha"
        control={control}
        secureTextEntry={!showConfirmPassword}
        error={errors.confirmPassword?.message}
        iconRight={
          <Ionicons
            name={showConfirmPassword ? "eye" : "eye-off"}
            size={20}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        }
        required
      />
      <View style={styles.inlineRow}>
        <View style={styles.instagramInputContainer}>
          <FormInput
            paddingTopLabel={20}
            label="Instagram"
            name="username"
            placeholder="Seu usuário (ex: fulano)"
            control={control}
            error={errors.username?.message}
            required
            iconRight={
              loadingInstagram ? (
                <Spinner />
              ) : isInstagramValid && instagramData ? (
                <View style={styles.instagramValidContainer}>
                  <Image
                    source={{ uri: instagramData.avatar }}
                    style={styles.instagramAvatar}
                  />
                  <Text style={styles.instagramUsername}>
                    @{instagramData.username}
                  </Text>
                  <Ionicons name="checkmark" size={18} color="green" />
                </View>
              ) : (
                <TouchableOpacity onPress={validateInstagram}>
                  <Ionicons name="search" size={20} color="#25399E" />
                </TouchableOpacity>
              )
            }
          />
        </View>
        <TouchableOpacity
          style={styles.validateButton}
          onPress={validateInstagram}
        >
          <Text style={styles.validateButtonText}>Validar</Text>
        </TouchableOpacity>
      </View>
      <FormInput
        paddingTopLabel={20}
        label="Tiktok"
        name="tiktok"
        placeholder="Seu usuário (ex: @fulano)"
        control={control}
        error={errors.tiktok?.message}
      />

      <Controller
        name="agreeTerms"
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => (
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => onChange(!value)}
          >
            <Ionicons
              name={value ? "checkbox" : "square-outline"}
              size={20}
              color="#25399E"
            />
            <Text style={styles.checkboxText}>
              Declaro que li e concordo com os{" "}
              <Text style={styles.link}>Termos de Uso</Text>
            </Text>
          </TouchableOpacity>
        )}
      />
      {errors.agreeTerms && (
        <Text style={styles.error}>{errors.agreeTerms?.message}</Text>
      )}
      <TouchableOpacity
        style={[styles.submitButton, !isValid && styles.disabledButton]}
        disabled={!isValid}
        onPress={handleSubmit(onNext)}
      >
        <Text style={styles.submitText}>Avançar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("/(not-authenticated)/signin/page")}
      >
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginRow}
        onPress={() => router.push("/(not-authenticated)/signin/page")}
      >
        <Text style={styles.loginText}>
          Já tem uma conta? <Text style={styles.link}>Acesse</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "white", flex: 1 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 10,
    marginLeft: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "left",
    marginBottom: 20,
    marginLeft: 4,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkboxText: { marginLeft: 10, fontSize: 14 },
  link: { color: "#25399E", textDecorationLine: "underline" },
  error: { color: "red", fontSize: 12, marginTop: -8, marginBottom: 8 },
  info: { color: "#666", fontSize: 12, marginTop: 4, marginBottom: 4 },
  submitButton: {
    backgroundColor: "#25399E",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
  },
  submitText: { color: "white", textAlign: "center", fontWeight: "bold" },
  disabledButton: { backgroundColor: "#A8B1D0" },
  backButton: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#25399E",
    borderRadius: 8,
    paddingVertical: 14,
  },
  backButtonText: {
    color: "#25399E",
    textAlign: "center",
    fontWeight: "bold",
  },
  loginRow: {
    marginTop: 24,
    alignItems: "center",
  },
  loginText: {
    color: "#000",
    fontSize: 14,
  },
  inlineRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 8,
  },
  instagramInputContainer: {
    flexBasis: "65%",
  },
  instagramValidContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  instagramAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  instagramUsername: {
    fontSize: 12,
    color: "#000",
  },
  validateButton: {
    flexBasis: "30%",
    backgroundColor: "#25399E",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    height: 48,
  },
  validateButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
