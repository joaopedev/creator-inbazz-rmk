import {
  Manrope_400Regular,
  Manrope_700Bold,
  useFonts,
} from "@expo-google-fonts/manrope";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react"; // Importando useEffect
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { StepIndicator } from "../../../components/StepIndicator";
import { Step1Form } from "../../../components/common/FormStepSignUp/Step1Form";
import { Step2Form } from "../../../components/common/FormStepSignUp/Step2Form";
import { Step3Form } from "../../../components/common/FormStepSignUp/Step3Form";
import { Step3Data } from "../../../schemas/step3Schema";
import { signUpToBackend } from "../../../store/singUpStore";
import { FinalSignUpData } from "../../../types/FinalSignUpData";

// Mantém a splash screen visível enquanto as fontes são carregadas
SplashScreen.preventAutoHideAsync();

export default function SignUpScreen() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({} as any);
  const router = useRouter();

 
  let [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const nextStep = (data: any) => {
    const stepKey = `step${step}`;
    setFormData({ ...formData, [stepKey]: data });
    setStep(step + 1);
  };

  const finish = async (step3Data: Step3Data) => {
    const finalData: FinalSignUpData = {
      ...formData.step1,
      ...formData.step2,
      ...step3Data,
    };

    try {
      console.log("Enviando dados:", finalData);
      await signUpToBackend(finalData);
      console.log("Cadastro finalizado com sucesso");
      router.push("/(authenticated)/home/page");
    } catch (err) {
      console.log("Erro ao criar conta:", err);
      // Você pode adicionar um Alert ou Toast aqui para exibir o erro ao usuário
      // Alert.alert("Erro no cadastro", err.message || "Ocorreu um erro ao finalizar o cadastro.");
    }
  };

  const goToBack = () => setStep((prev) => prev - 1);

  // Se as fontes ainda não foram carregadas, retorne nulo para não renderizar nada
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={100}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.containerLogo}>
            {/* Ajustes no estilo da imagem */}
            <Image
              style={styles.logoImage} // Usando estilo definido abaixo
              source={require("../../../assets/images/logoapp.png")}
            />
          </View>

          <StepIndicator step={step} />
          {step === 1 && <Step1Form onNext={nextStep} />}
          {step === 2 && (
            <Step2Form
              step={step}
              setStep={setStep}
              onNext={nextStep}
              onBack={goToBack}
            />
          )}
          {step === 3 && <Step3Form onSignUp={finish} onBack={goToBack} />}
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
    height: 120, // Altura fixa para o contêiner do logo
    marginBottom: 20, // Manter o marginBottom original
    paddingTop: 80, // Manter o paddingTop original para empurrar o logo para baixo
  },
  logoImage: {
    width: "100%", // Ocupa a largura total do containerLogo
    height: "100%", // Ocupa a altura total do containerLogo
    resizeMode: "contain", // Redimensiona a imagem para caber, mantendo o aspect ratio
  },
});
