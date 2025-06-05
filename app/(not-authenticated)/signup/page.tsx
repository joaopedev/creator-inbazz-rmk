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

export default function SignUpScreen() {
  const [step, setStep] = useState(1);

  const goToNext = () => setStep((prev) => prev + 1);
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
          {step === 1 && <Step1Form onNext={goToNext} />}
          {step === 2 && <Step2Form onNext={goToNext} onBack={goToBack} />}
          {step === 3 && <Step3Form onSignUp={goToBack} />}
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