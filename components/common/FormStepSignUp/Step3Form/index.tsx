import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { step3Schema } from "../../../../schemas/signup";
import { Step3Data } from "../../../../schemas/step3Schema";
import { useSignUpStore } from "../../../../store/singUpStore";
import { FormInput } from "../../../FormInput";

interface Step3Props {
  onSignUp: () => void;
  onBack?: () => void;
}

export const Step3Form = ({ onSignUp }: Step3Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<Step3Data>({
    mode: "onChange",
    resolver: zodResolver(step3Schema),
    defaultValues: {
      country: "",
      state: "",
      city: "",
      cep: "",
      neighborhood: "",
      street: "",
      number: "",
      complement: "",
    },
  });
  const { setStep3 } = useSignUpStore();
  const onSubmit = (data: Step3Data) => {
    setStep3(data);
    onSignUp();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Endereço</Text>

      <FormInput
        label="País"
        name="country"
        placeholder="Escolha uma opção"
        control={control}
        error={errors.country?.message}
        required
      />
      <FormInput
        label="Estado"
        name="state"
        placeholder="Escolha uma opção"
        control={control}
        error={errors.state?.message}
        required
      />
      <FormInput
        label="CEP"
        name="cep"
        placeholder="00000-00"
        control={control}
        error={errors.cep?.message}
        required
        keyboardType="numeric"
      />
      <FormInput
        label="Cidade"
        name="city"
        control={control}
        error={errors.number?.message}
        required
      />
      <FormInput
        label="Bairro"
        name="neighborhood"
        control={control}
        error={errors.state?.message}
        required
      />
      <FormInput
        label="Número"
        name="number"
        placeholder="Insira o nº residencial"
        control={control}
        error={errors.street?.message}
        required
      />
      <FormInput
        label="Complemento"
        name="complement"
        control={control}
        error={errors.complement?.message}
        required
      />

      {/* <FormInput label="Tiktok" name="tiktok" placeholder="Insira seu tiktok" control={control} error={errors.tiktok?.message} />

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

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setStep3(null)}
      >
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "left",
    marginBottom: 20,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
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
