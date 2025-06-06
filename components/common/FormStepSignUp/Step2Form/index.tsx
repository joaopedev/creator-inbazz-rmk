import Ionicons from "@expo/vector-icons/Ionicons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Step2Data, step2Schema } from "../../../../schemas/step2Schema";
import { useSignUpStore } from "../../../../store/singUpStore";
import { FormInput } from "../../../FormInput";

interface Step2Props {
  onNext: (data: Step2Data) => void;
  onBack: () => void;
}

export const Step2Form = ({ onNext }: Step2Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<Step2Data>({
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
  const router = useRouter();
  const pickerSelectStyles = {
    inputIOS: {
      fontSize: 14,
      paddingVertical: 14,
      paddingHorizontal: 12,
      borderWidth: 0,
      borderColor: "#ccc",
      borderRadius: 8,
      color: "#000",
      paddingRight: 40,
      marginBottom: 0,
      backgroundColor: "#fff",
    },
    inputAndroid: {
      fontSize: 14,
      paddingVertical: 12,
      paddingHorizontal: 12,
      borderWidth: 0,
      borderColor: "#ccc",
      borderRadius: 8,
      color: "#000",
      paddingRight: 40,
      marginBottom: 0,
      backgroundColor: "#fff",
    },
    placeholder: {
      color: "#999",
    },
    IconContainer: {
      position: "absolute",
      right: 10,
      top: "50%",
      transform: [{ translateY: -10 }],
    },
  };

  const handleCancel = () => {
    router.push("/(not-authenticated)/signin/page");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agora, alguns dados pessoais</Text>
      <FormInput
        paddingTopLabel={20}
        label="DDD"
        name="phoneDDD"
        placeholder="DDD ex: '027'"
        control={control}
        error={errors.phoneDDD?.message}
        required
      />
      <FormInput
        paddingTopLabel={20}
        label="Telefone"
        name="phoneNumber"
        placeholder="(99955-0088)"
        control={control}
        error={errors.phoneNumber?.message}
        required
      />
      <FormInput
        paddingTopLabel={20}
        label="Data de nascimento"
        name="birthDate"
        placeholder="01/02/1993"
        control={control}
        error={errors.birthDate?.message}
        required
        keyboardType="numeric"
      />
      {/* <FormInput
        paddingTopLabel={20}
        label="Gênero"
        name="gender"
        placeholder="Defina seu genero"
        control={control}
        error={errors.gender?.message}
        required
      /> */}
      <Text style={[styles.label, { marginTop: 20 }]}>Gênero *</Text>
      <View style={styles.pickerWrapper}>
        <Controller
          control={control}
          name="gender"
          render={({ field: { onChange, value } }) => (
            <RNPickerSelect
              onValueChange={onChange}
              value={value}
              items={[
                { label: "Feminino", value: "Feminino" },
                { label: "Masculino", value: "Masculino" },
                { label: "Não binário", value: "Não binário" },
                { label: "Outro", value: "Outro" },
                { label: "Prefiro não dizer", value: "Prefiro não dizer" },
              ]}
              placeholder={{ label: "Selecione seu gênero", value: null }}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false} // para que use nosso style
              Icon={() => (
                <Ionicons name="chevron-down" size={20} color="#999" />
              )}
            />
          )}
        />
      </View>
      {errors.gender && (
        <Text style={styles.error}>{errors.gender.message}</Text>
      )}
      <FormInput
        paddingTopLabel={20}
        label="Sobre você"
        name="aboutYou"
        placeholder="Fale sobre você"
        control={control}
        error={errors.aboutYou?.message}
        required
        multiline
        textArea
      />
      <Text style={[styles.label, { marginTop: 20 }]}>É agenciado? *</Text>
      <View style={styles.pickerWrapper}>
        <Controller
          control={control}
          name="haveAgent"
          render={({ field: { onChange, value } }) => (
            <RNPickerSelect
              onValueChange={onChange}
              value={value}
              items={[
                { label: "Sim", value: "Sim" },
                { label: "Não", value: "Não" },
              ]}
              placeholder={{
                label: "Selecione se você é agenciado",
                value: null,
              }}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
            />
          )}
        />
      </View>
      {errors.haveAgent && (
        <Text style={styles.error}>{errors.haveAgent.message}</Text>
      )}
      <TouchableOpacity
        style={[styles.submitButton, !isValid && styles.disabledButton]}
        disabled={!isValid}
        onPress={handleSubmit(onNext)}
      >
        <Text style={styles.submitText}>Avançar</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setStep2(null)}
        >
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
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
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkboxText: { marginLeft: 10, fontSize: 14 },
  link: { color: "#25399E", textDecorationLine: "underline" },
  error: { color: "red", fontSize: 12, marginTop: -4, marginBottom: 8 },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
    marginHorizontal: 0,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
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
    flex: 1,
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
  label: {
    fontSize: 14,
    color: "#000",
    marginBottom: 6,
    marginLeft: 4,
    fontFamily: "Unbounded",
  },
  cancelButton: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#e53935",
    borderRadius: 8,
    paddingVertical: 14,
    flex: 1,
    marginLeft: 8,
    backgroundColor: "#e53935",
  },
  cancelButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 20,
  },
});
