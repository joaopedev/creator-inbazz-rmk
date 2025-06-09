import { useRouter } from "expo-router";
import React, { useState } from "react";
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

export default function SignUpScreen() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({} as any);
  const router = useRouter();

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
      await signUpToBackend(finalData);
      router.push("/(authenticated)/home/page");
      console.log("Usuário criado:", finalData);
    } catch (err) {
      console.log("Erro ao criar conta:", err);
    }
  };

  const goToBack = () => setStep((prev) => prev - 1);

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

          <StepIndicator step={step} />
          {step === 1 && <Step1Form onNext={nextStep} />}
          {step === 2 && <Step2Form onNext={nextStep} onBack={goToBack} />}
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
    marginBottom: 20,
    paddingTop: 80,
  },
});
