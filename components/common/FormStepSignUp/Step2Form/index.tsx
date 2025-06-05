import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { step2Schema } from "../../../../schemas/signup";

import { Step2Data } from "../../../../schemas/step2Schema";
import { useSignUpStore } from "../../../../store/singUpStore";
import { FormInput } from "../../../FormInput";

interface Step2Props {
  onNext: () => void;
  onBack: () => void;
}

export const Step2Form = ({ onNext }: Step2Props) => {
  const { control, handleSubmit, formState: { errors, isValid }, watch } = useForm<Step2Data>({
    mode: "onChange",
    resolver: zodResolver(step2Schema),
    defaultValues: {
      phoneDDD: "",
      phoneNumber: "",
      birthDate: "",
      gender: "Masculino",
      aboutYou: "",
      haveAgent: "Sim",
    },
  });
  const { setStep2 } = useSignUpStore();

  const onSubmit = (data: Step2Data) => {
    setStep2(data);
    onNext();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agora, alguns dados pessoais</Text>

      <FormInput label="DDD" name="phoneDDD" placeholder="Insira seu nome" control={control} error={errors.phoneDDD?.message} required />
      <FormInput label="Telefone" name="phoneNumber" placeholder="Insira seu sobrenome" control={control} error={errors.phoneNumber?.message} required />
      <FormInput label="Data de nascimento" name="birthDate" placeholder="Insira seu CPF" control={control} error={errors.birthDate?.message} required keyboardType="numeric" />
      <FormInput label="Gênero" name="gender" placeholder="Insira seu email" control={control} error={errors.gender?.message} required />
      <FormInput label="Sobre você" name="aboutYou" placeholder="Confirme seu email" control={control} error={errors.aboutYou?.message} required />
      <FormInput label="É agenciado?" name="haveAgent" placeholder="Confirme seu email" control={control} error={errors.aboutYou?.message} required />
      {/* <FormInput
        label="Crie sua senha"
        name="password"
        placeholder="Sua senha deve ter, no mínimo, 6 caracteres"
        control={control}
        secureTextEntry={!showPassword}
        error={errors.password?.message}
        iconRight={<Ionicons name={showPassword ? "eye" : "eye-off"} size={20} onPress={() => setShowPassword(!showPassword)} />}
        required
      />
      <FormInput
        label="Confirme sua senha"
        name="confirmPassword"
        placeholder="Confirme sua senha"
        control={control}
        secureTextEntry={!showConfirmPassword}
        error={errors.confirmPassword?.message}
        iconRight={<Ionicons name={showConfirmPassword ? "eye" : "eye-off"} size={20} onPress={() => setShowConfirmPassword(!showConfirmPassword)} />}
        required
      />

      <View style={styles.inlineRow}>
        <View style={styles.instagramInputContainer}>
          <FormInput
            label="Instagram"
            name="instagram"
            placeholder="Insira seu instagram"
            control={control}
            error={errors.instagram?.message}
            required
          />
        </View>
        <TouchableOpacity style={styles.validateButton} onPress={validateInstagram}>
          <Text style={styles.validateButtonText}>Validar</Text>
        </TouchableOpacity>
      </View>

      <FormInput label="Tiktok" name="tiktok" placeholder="Insira seu tiktok" control={control} error={errors.tiktok?.message} />

      <Controller
        name="agreeTerms"
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => (
          <TouchableOpacity style={styles.checkboxRow} onPress={() => onChange(!value)}>
            <Ionicons name={value ? "checkbox" : "square-outline"} size={20} color="#25399E" />
            <Text style={styles.checkboxText}>Declaro que li e concordo com os <Text style={styles.link}>Termos de Uso</Text></Text>
          </TouchableOpacity>
        )}
      />
      {errors.agreeTerms && <Text style={styles.error}>{errors.agreeTerms.message}</Text>} */}

      <TouchableOpacity
        style={[styles.submitButton, !isValid && styles.disabledButton]}
        disabled={!isValid}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.submitText}>Avançar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => setStep2(null)}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.loginRow} onPress={() => router.push("/(not-authenticated)/signin/page")}>
        <Text style={styles.loginText}>
          Já tem uma conta? <Text style={styles.link}>Acesse</Text>
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "white", flex: 1 },
  title: { fontSize: 20, fontWeight: "bold", textAlign: "left", marginBottom: 10 },
  subtitle: { fontSize: 14, color: "#666", textAlign: "left", marginBottom: 20 },
  checkboxRow: { flexDirection: "row", alignItems: "center", marginVertical: 10 },
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