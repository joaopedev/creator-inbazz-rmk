import Ionicons from "@expo/vector-icons/Ionicons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { step1Schema } from "../../../../schemas/signup";
import { Step1Data } from "../../../../schemas/step1Schema";
import { useSignUpStore } from "../../../../store/singUpStore";
import { FormInput } from "../../../FormInput";
import Spinner from "../../Spinner";

interface Step1Props {
  onNext: () => void;
}

export const Step1Form = ({ onNext }: Step1Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
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
      instagram: "",
      tiktok: "",
      agreeTerms: false,
    },
  });
  const instagramUsername = useWatch({ control, name: "instagram" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { setStep1 } = useSignUpStore();
  const [isInstagramValid, setIsInstagramValid] = useState(false);
  const [instagramData, setInstagramData] = useState<{
    avatar: string;
    username: string;
  } | null>(null);
  const [loadingInstagram, setLoadingInstagram] = useState(false);

  const onSubmit = (data: Step1Data) => {
    setStep1(data);
    onNext();
  };

  const validateInstagram = async () => {
    if (!instagramUsername) return;
    setLoadingInstagram(true);

    try {
      const formData = new FormData();
      formData.append("user", instagramUsername);

      const response = await fetch(process.env.EXPO_PUBLIC_INSTAGRAM_VALIDATE, {
        method: "POST",
        body: formData,
      });

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
        placeholder="Insira seu CPF"
        control={control}
        error={errors.cpf?.message}
        required
        keyboardType="numeric"
      />
      <FormInput
        paddingTopLabel={20}
        label="Email"
        name="email"
        placeholder="Insira seu email"
        control={control}
        error={errors.email?.message}
        required
      />
      <FormInput
        paddingTopLabel={20}
        label="Confirme seu email"
        name="confirmEmail"
        placeholder="Confirme seu email"
        control={control}
        error={errors.confirmEmail?.message}
        required
      />
      <FormInput
        paddingTopLabel={20}
        label="Crie sua senha"
        name="password"
        placeholder="Sua senha deve ter, no mínimo, 6 caracteres"
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
        placeholder="Confirme sua senha"
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
            name="instagram"
            placeholder="Insira seu instagram"
            control={control}
            error={errors.instagram?.message}
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
        placeholder="Insira seu tiktok"
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
        <Text style={styles.error}>{errors.agreeTerms.message}</Text>
      )}
      <TouchableOpacity
        style={[styles.submitButton, !isValid && styles.disabledButton]}
        disabled={!isValid}
        onPress={handleSubmit(onSubmit)}
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
  checkboxText: { marginLeft: 10, fontSize: 14 },
  link: { color: "#25399E", textDecorationLine: "underline" },
  error: { color: "red", fontSize: 12, marginTop: -8, marginBottom: 8 },
  submitButton: {
    backgroundColor: "#25399E",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
  },
  submitText: { color: "white", textAlign: "center", fontWeight: "bold" },
  disabledButton: { backgroundColor: "#A8B1D0" },
  validateButtonText: {
    color: "white",
    fontWeight: "bold",
  },
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
  validateButton: {
    flexBasis: "30%",
    backgroundColor: "#25399E",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    height: 48,
  },
});
