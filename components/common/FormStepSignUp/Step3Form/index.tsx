import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Step3Data, step3Schema } from "../../../../schemas/step3Schema";
import { FormInput } from "../../../FormInput";

export interface Step3Props {
  onSignUp: (data: Step3Data) => void;
  onBack: () => void;
  setStep?: React.Dispatch<React.SetStateAction<number>>; // Adicionado para o botão "Voltar"
  step?: number; // Adicionado para o botão "Voltar"
}

export const Step3Form = ({ onSignUp, onBack, setStep, step }: Step3Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch, // 'watch' está sendo importado mas não utilizado diretamente no corpo do componente
  } = useForm<Step3Data>({
    mode: "onChange",
    resolver: zodResolver(step3Schema),
    defaultValues: {
      country: "Brasil", // Valor padrão para o país
      state: "",
      city: "",
      cep: "",
      neighborhood: "",
      street: "",
      number: "",
      complement: "",
    },
  });

  // O useSignUpStore não está sendo usado no componente, pode ser removido se não for necessário.
  // const { setStep3 } = useSignUpStore();
  const [loadingCep, setLoadingCep] = useState(false);

  // Função para formatar o CEP: remove não-dígitos e adiciona o hífen
  const formatCep = (input: string) => {
    let formatted = input.replace(/\D/g, "");
    if (formatted.length <= 5) {
      return formatted;
    }
    return `${formatted.slice(0, 5)}-${formatted.slice(5, 8)}`;
  };

  // Handler para mudanças no input de CEP, que dispara a chamada da API ViaCEP
  const handleCepChange = async (text: string) => {
    const formatted = formatCep(text);
    setValue("cep", formatted, { shouldValidate: true });

    const cleanedCep = formatted.replace(/\D/g, "");

    // Se o CEP limpo tiver 8 dígitos, busca os dados na ViaCEP
    if (cleanedCep.length === 8) {
      setLoadingCep(true); // Exibe o indicador de carregamento
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${cleanedCep}/json/`
        );
        const data = await response.json();

        // Verifica se os dados são válidos e se não houve erro da ViaCEP
        if (data && !data.erro) {
          setValue("street", data.logradouro || "", { shouldValidate: true });
          setValue("neighborhood", data.bairro || "", { shouldValidate: true });
          setValue("city", data.localidade || "", { shouldValidate: true });
          setValue("state", data.uf || "", { shouldValidate: true });
          setValue("country", "Brasil", { shouldValidate: true }); // Garante que o país seja Brasil
        } else {
          // Limpa os campos se o CEP não for encontrado ou for inválido
          setValue("street", "", { shouldValidate: true });
          setValue("neighborhood", "", { shouldValidate: true });
          setValue("city", "", { shouldValidate: true });
          setValue("state", "", { shouldValidate: true });
          console.warn("CEP não encontrado ou inválido.");
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        // Limpa os campos em caso de erro de rede ou outros
        setValue("street", "", { shouldValidate: true });
        setValue("neighborhood", "", { shouldValidate: true });
        setValue("city", "", { shouldValidate: true });
        setValue("state", "", { shouldValidate: true });
      } finally {
        setLoadingCep(false); // Esconde o indicador de carregamento
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Endereço</Text>
      <FormInput
        paddingTopLabel={20}
        label="País"
        name="country"
        placeholder="Escolha uma opção"
        control={control}
        error={errors.country?.message}
        required
        // Removido editable={false} para permitir edição
      />
      <FormInput
        paddingTopLabel={20}
        label="Estado"
        name="state"
        placeholder="Escolha uma opção"
        control={control}
        error={errors.state?.message}
        required
        // Removido editable={false} para permitir edição
      />
      <FormInput
        paddingTopLabel={20}
        label="CEP"
        name="cep"
        placeholder="00000-000"
        control={control}
        error={errors.cep?.message}
        required
        keyboardType="numeric"
        onChangeText={handleCepChange} // Mantém o handler para a busca do CEP
        // AQUI ESTÁ A MUDANÇA: Passa o ActivityIndicator para o buttonRight
        buttonRight={
          loadingCep ? <ActivityIndicator size="small" color="#25399E" /> : null
        }
      />
      {/* O ActivityIndicator NÃO ESTÁ MAIS AQUI */}
      <FormInput
        paddingTopLabel={20}
        label="Cidade"
        placeholder="Vitória"
        name="city"
        control={control}
        error={errors.city?.message}
        required
      />
      <FormInput
        paddingTopLabel={20}
        label="Bairro"
        name="neighborhood"
        control={control}
        error={errors.neighborhood?.message}
        required
      />
      <FormInput
        paddingTopLabel={20}
        label="Rua"
        name="street"
        placeholder="Nome da rua"
        control={control}
        error={errors.street?.message}
        required
      />
      <FormInput
        paddingTopLabel={20}
        label="Número"
        name="number"
        placeholder="Insira o nº residencial"
        control={control}
        error={errors.number?.message}
        required
        keyboardType="numeric"
      />
      <FormInput
        paddingTopLabel={20}
        label="Complemento"
        name="complement"
        control={control}
        error={errors.complement?.message}
        // Este campo continua como está, sendo opcional ou não conforme seu schema
      />

      <TouchableOpacity
        style={[
          styles.submitButton,
          (!isValid || loadingCep) && styles.disabledButton,
        ]}
        disabled={!isValid || loadingCep}
        onPress={handleSubmit(onSignUp)}
      >
        <Text style={styles.submitText}>Criar Conta</Text>
      </TouchableOpacity>

      {/* Botão "Voltar" usando a prop setStep */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setStep(step - 1)}
      >
        <Text style={styles.backButtonText}>Voltar</Text>
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
    marginLeft: 3,
  },
  subtitle: {
    // Não utilizado neste componente, mas mantido
    fontSize: 14,
    color: "#666",
    textAlign: "left",
    marginBottom: 20,
  },
  checkboxRow: {
    // Não utilizado neste componente, mas mantido
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkboxText: { marginLeft: 10, fontSize: 14 }, // Não utilizado neste componente, mas mantido
  link: { color: "#25399E", textDecorationLine: "underline" }, // Não utilizado neste componente, mas mantido
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
    // Não utilizado neste componente, mas mantido
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
    // Não utilizado neste componente, mas mantido
    marginTop: 24,
    alignItems: "center",
  },
  loginText: {
    // Não utilizado neste componente, mas mantido
    color: "#000",
    fontSize: 14,
  },
  inlineRow: {
    // Não utilizado neste componente, mas mantido
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 8,
  },
  instagramInputContainer: {
    // Não utilizado neste componente, mas mantido
    flexBasis: "65%",
  },
  validateButton: {
    // Não utilizado neste componente, mas mantido
    flexBasis: "30%",
    backgroundColor: "#25399E",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    height: 48,
  },
});
