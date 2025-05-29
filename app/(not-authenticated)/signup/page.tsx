import { FormInput } from "@/components/FormInput";
import { step1Schema, step2Schema, step3Schema } from "@/schemas/signup";
import { signUp } from "@/store/singUpStore";
import { SignUpType } from "@/types/auth-data";
import Ionicons from "@expo/vector-icons/Ionicons";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ProgressStep, ProgressSteps } from "react-native-progress-steps";
import { ZodType } from "zod";

export default function SignUpScreen() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isInstagramValid, setIsInstagramValid] = useState(false);
  const [instagramData, setInstagramData] = useState<{
    avatar: string;
    username: string;
  } | null>(null);

  const currentSchema =
    step === 1
      ? (step1Schema as ZodType<Partial<SignUpType>>)
      : step === 2
      ? (step2Schema as ZodType<Partial<SignUpType>>)
      : (step3Schema as ZodType<Partial<SignUpType>>);

  const FORM_STORAGE_KEY = "@signup_form_data";

  const handleCreateAccount = async (formData: Partial<SignUpType>) => {
    try {
      await signUp(formData as SignUpType);
      alert("Conta criada com sucesso!");
      reset();
      AsyncStorage.removeItem(FORM_STORAGE_KEY); 
      router.push("/(not-authenticated)/signin/page");
    } catch (error: any) {
      alert(error.message || "Erro ao criar conta.");
    }
  };

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors, touchedFields },
    setFocus,
    watch,
    reset,
    getValues,
    setValue,
  } = useForm<Partial<SignUpType>>({
    mode: "onChange",
    resolver: zodResolver(currentSchema),
    defaultValues: {
      name: "",
      lastName: "",
      cpf: "",
      username: "",
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: "",
      instagram: "",
      tiktok: "",
      agreeTerms: false,
      phoneDDD: "",
      phoneNumber: "",
      birthDate: "",
      gender: "Prefiro não dizer",
      aboutYou: "",
      isPregnant: "",
      state: "",
      city: "",
      cep: "",
      neighborhood: "",
      street: "",
      number: "",
      complement: "",
    },
  });

  const instagramUsername = useWatch({ control, name: "instagram" });

  useEffect(() => {
    const loadFormData = async () => {
      const stored = await AsyncStorage.getItem(FORM_STORAGE_KEY);
      if (stored) reset(JSON.parse(stored));
    };
    loadFormData();
  }, []);

  useEffect(() => {
    const subscription = watch(
      (
        value: Partial<SignUpType>,
        context: { name?: string; type?: string }
      ) => {
        AsyncStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(value));
      }
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  const validateInstagram = async () => {
    if (!instagramUsername) return;

    try {
      const formData = new FormData();
      formData.append("user", instagramUsername);

      const instagramValidateUrl = process.env.EXPO_PUBLIC_INSTAGRAM_VALIDATE;
      if (!instagramValidateUrl) {
        throw new Error(
          "Instagram validation URL is not defined in environment variables."
        );
      }
      const response = await fetch(instagramValidateUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erro na resposta da API");
      }

      const data = await response.json();

      if (data && data.pfp_url && data.userdoIG) {
        setInstagramData({
          avatar: data.pfp_url,
          username: data.userdoIG,
        });
        setIsInstagramValid(true);
      } else {
        setIsInstagramValid(false);
        setInstagramData(null);
      }
    } catch (error) {
      console.error("Erro ao validar Instagram", error);
      setIsInstagramValid(false);
      setInstagramData(null);
    }
  };

  const getStepFields = (stepNum: number): (keyof SignUpType)[] => {
    if (stepNum === 1) {
      return [
        "name",
        "lastName",
        "cpf",
        "username",
        "email",
        "confirmEmail",
        "password",
        "confirmPassword",
        "instagram",
        "tiktok",
        "agreeTerms",
      ];
    } else if (stepNum === 2) {
      return [
        "phoneDDD",
        "phoneNumber",
        "birthDate",
        "aboutYou",
        "gender",
        "isPregnant",
      ];
    } else if (stepNum === 3) {
      return [
        "state",
        "city",
        "cep",
        "neighborhood",
        "street",
        "number",
        "complement",
      ];
    }
    return [];
  };

  const markStepFieldsTouched = () => {
    const fields = getStepFields(step);
    fields.forEach((field) => {
      const currentValue = getValues(field);
      setValue(field, currentValue, { shouldTouch: true });
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={100}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.containerLogo}>
            <Image
              style={{ maxHeight: "90%", width: 176 }}
              source={require("../../../assets/images/Logo-App-Nova.png")}
            />
          </View>

          <ProgressSteps activeStep={step - 1}>
            {/* Step 1 */}
            <ProgressStep
              label="Dados de conta"
              buttonNextText="Avançar"
              buttonNextTextColor="#fff"
            >
              <View style={styles.formContainer}>
                <Text style={styles.title}>Vamos começar!</Text>
                <Text style={styles.subtitle}>
                  Preencha o formulário abaixo para criar sua conta
                </Text>

                <FormInput
                  label="Nome"
                  name="name"
                  placeholder="Digite seu nome"
                  error={touchedFields.name ? errors.name?.message : ""}
                  required
                  control={control}
                />
                <FormInput
                  label="Sobrenome"
                  name="lastName"
                  placeholder="Digite seu sobrenome"
                  error={touchedFields.lastName ? errors.lastName?.message : ""}
                  required
                  control={control}
                  paddingTopLabel={20}
                />
                <FormInput
                  label="CPF"
                  name="cpf"
                  placeholder="Digite seu CPF"
                  error={touchedFields.cpf ? errors.cpf?.message : ""}
                  required
                  control={control}
                  paddingTopLabel={20}
                  keyboardType="numeric"
                />
                <FormInput
                  label="Nome do usuário"
                  name="username"
                  placeholder="Digite o nome do usuário"
                  error={touchedFields.username ? errors.username?.message : ""}
                  required
                  control={control}
                  paddingTopLabel={20}
                />
                <FormInput
                  label="Email"
                  name="email"
                  placeholder="Digite seu email"
                  error={touchedFields.email ? errors.email?.message : ""}
                  required
                  control={control}
                  paddingTopLabel={20}
                />
                <FormInput
                  label="Confirme seu email"
                  name="confirmEmail"
                  placeholder="Confirme seu email"
                  error={
                    touchedFields.confirmEmail
                      ? errors.confirmEmail?.message
                      : ""
                  }
                  required
                  control={control}
                  paddingTopLabel={20}
                />
                <FormInput
                  label="Senha"
                  name="password"
                  placeholder="Mínimo de 8 caracteres, maiúsculas, minúsculas, números e símbolos"
                  error={touchedFields.password ? errors.password?.message : ""}
                  secureTextEntry={!showPassword}
                  required
                  control={control}
                  iconRight={
                    <Ionicons
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={24}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                  paddingTopLabel={20}
                />
                <FormInput
                  label="Instagram"
                  name="instagram"
                  placeholder="Insira seu Instagram"
                  required
                  control={control}
                  paddingTopLabel={20}
                  buttonRight={
                    isInstagramValid && instagramData ? (
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
                      <TouchableOpacity
                        onPress={validateInstagram}
                        style={styles.instagramValidateButton}
                      >
                        <Text style={styles.instagramValidateButtonText}>
                          Validar
                        </Text>
                      </TouchableOpacity>
                    )
                  }
                />
                <FormInput
                  label="TikTok"
                  name="tiktok"
                  placeholder="Digite seu TikTok"
                  error={touchedFields.tiktok ? errors.tiktok?.message : ""}
                  control={control}
                  paddingTopLabel={20}
                />

                {/* <View style={[styles.buttonsRow, { marginTop: 30 }]}>
                  <View style={{ flex: 1 }} />
                  <TouchableOpacity
                    onPress={validateAndNextStep}
                    style={[
                      styles.nextButton,
                      !isStepValid() && styles.disabledButton,
                    ]}
                    disabled={!isStepValid()}
                  >
                    <Text style={styles.nextButtonText}>Avançar</Text>
                  </TouchableOpacity>
                </View> */}
              </View>
            </ProgressStep>

            {/* Step 2 */}
            <ProgressStep
              label="Dados Pessoais"
              buttonNextText="Avançar"
              buttonPreviousText="Voltar"
            >
              <View style={styles.formContainer}>
                <Text style={styles.title}>Agora, alguns dados pessoais</Text>
                <FormInput
                  label="DDD"
                  name="phoneDDD"
                  placeholder="00"
                  error={touchedFields.phoneDDD ? errors.phoneDDD?.message : ""}
                  required
                  control={control}
                  keyboardType="numeric"
                />
                <FormInput
                  label="Telefone"
                  name="phoneNumber"
                  placeholder="00000-0000"
                  error={
                    touchedFields.phoneNumber ? errors.phoneNumber?.message : ""
                  }
                  required
                  control={control}
                  keyboardType="phone-pad"
                />
                <FormInput
                  label="Data de nascimento"
                  name="birthDate"
                  placeholder="DD/MM/AAAA"
                  error={
                    touchedFields.birthDate ? errors.birthDate?.message : ""
                  }
                  required
                  control={control}
                  paddingTopLabel={20}
                />

                <Text style={styles.label}>Gênero</Text>
                <Controller
                  control={control}
                  name="gender"
                  render={({ field: { value, onChange } }) => (
                    <Picker
                      selectedValue={value}
                      onValueChange={onChange}
                      style={styles.picker}
                    >
                      <Picker.Item
                        label="Prefiro não dizer"
                        value="Prefiro não dizer"
                      />
                      <Picker.Item label="Masculino" value="Masculino" />
                      <Picker.Item label="Feminino" value="Feminino" />
                      <Picker.Item label="Não binário" value="Não binário" />
                      <Picker.Item label="Outro" value="Outro" />
                    </Picker>
                  )}
                />

                <FormInput
                  label="Sobre você"
                  name="aboutYou"
                  placeholder="Fale sobre seus gostos, hobbies, rotina..."
                  error={touchedFields.aboutYou ? errors.aboutYou?.message : ""}
                  control={control}
                  paddingTopLabel={20}
                />

                <Text style={styles.label}>É agenciado</Text>
                <Controller
                  control={control}
                  name="isAgented"
                  render={({ field: { value, onChange } }) => (
                    <Picker
                      selectedValue={value}
                      onValueChange={onChange}
                      style={styles.picker}
                    >
                      <Picker.Item label="Não" value="Não" />
                      <Picker.Item label="Sim" value="Sim" />
                      <Picker.Item label="Prefiro não dizer" value="" />
                    </Picker>
                  )}
                />

                {/* <View style={styles.buttonsRow}>
                  <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Voltar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={validateAndNextStep}
                    style={[
                      styles.nextButton,
                      !isStepValid() && styles.disabledButton,
                    ]}
                    disabled={!isStepValid()}
                  >
                    <Text style={styles.nextButtonText}>Avançar</Text>
                  </TouchableOpacity>
                </View> */}
              </View>
            </ProgressStep>

            {/* Step 3 */}
            <ProgressStep
              label="Endereço"
              buttonNextText="Criar conta"
              buttonPreviousText="Voltar"
              onSubmit={handleSubmit(handleCreateAccount)} // chama o cadastro
            >
              <View style={styles.formContainer}>
                <Text style={styles.title}>Endereço</Text>

                <FormInput
                  label="Estado"
                  name="state"
                  placeholder="Ex: São Paulo"
                  error={touchedFields.state ? errors.state?.message : ""}
                  required
                  control={control}
                />
                <FormInput
                  label="Cidade"
                  name="city"
                  placeholder="Ex: São Paulo"
                  error={touchedFields.city ? errors.city?.message : ""}
                  required
                  control={control}
                  paddingTopLabel={20}
                />
                <FormInput
                  label="CEP"
                  name="cep"
                  placeholder="00000-000"
                  error={touchedFields.cep ? errors.cep?.message : ""}
                  required
                  control={control}
                  paddingTopLabel={20}
                  keyboardType="numeric"
                />
                <FormInput
                  label="Bairro"
                  name="neighborhood"
                  placeholder="Digite seu bairro"
                  error={
                    touchedFields.neighborhood
                      ? errors.neighborhood?.message
                      : ""
                  }
                  required
                  control={control}
                  paddingTopLabel={20}
                />
                <FormInput
                  label="Rua"
                  name="street"
                  placeholder="Digite sua rua"
                  error={touchedFields.street ? errors.street?.message : ""}
                  required
                  control={control}
                  paddingTopLabel={20}
                />
                <FormInput
                  label="Número"
                  name="number"
                  placeholder="Digite o número"
                  error={touchedFields.number ? errors.number?.message : ""}
                  required
                  control={control}
                  paddingTopLabel={20}
                  keyboardType="numeric"
                />
                <FormInput
                  label="Complemento"
                  name="complement"
                  placeholder="Complemento (opcional)"
                  error={
                    touchedFields.complement ? errors.complement?.message : ""
                  }
                  control={control}
                  paddingTopLabel={20}
                />

                {/* <View style={styles.buttonsRow}>
                  <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Voltar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    style={[
                      styles.nextButton,
                      !isStepValid() && styles.disabledButton,
                    ]}
                    disabled={!isStepValid()}
                  >
                    <Text style={styles.nextButtonText}>Criar conta</Text>
                  </TouchableOpacity>
                </View> */}
              </View>
            </ProgressStep>
          </ProgressSteps>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  scroll: { paddingBottom: 100, width: "100%" },
  containerLogo: {
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    paddingTop: 80,
  },
  formContainer: {
    width: "85%",
    backgroundColor: "white",
    marginTop: 20,
    alignSelf: "center",
    zIndex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#4E4E4E",
    marginBottom: 24,
    textAlign: "center",
  },
  nextButton: {
    backgroundColor: "#25399E",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
  },
  nextButtonText: { color: "white", fontWeight: "bold", textAlign: "center" },
  disabledButton: { backgroundColor: "#A8B1D0" },
  instagramValidContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingRight: 10,
  },

  instagramAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },

  instagramUsername: {
    fontSize: 14,
    color: "#4E4E4E",
  },

  instagramValidateButton: {
    backgroundColor: "#25399E",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 10,
  },

  instagramValidateButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  label: {
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 6,
    fontSize: 14,
  },
  picker: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
  },
  backButton: {
    borderColor: "#25399E",
    borderWidth: 1.5,
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  backButtonText: { color: "#25399E", fontWeight: "bold", textAlign: "center" },
  inlineRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
});
