
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";


export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  // const { forgotPassword } = useAuth();

  // const {
  //   control,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  // } = useForm<ForgotPasswordType>({
  //   mode: "onChange",
  //   defaultValues: {
  //     email: "",
  //   },
  //   resolver: zodResolver(forgotPasswordSchema),
  // });

  // const onSubmit = async (data: ForgotPasswordType) => {
  //   try {
  //     setLoading(true);
  //     await forgotPassword(data);
  //     setLoading(false);
  //     router.push("/(not-authenticated)/signin/page");
  //     reset();
  //   } catch (error) {
  //     console.log("error", error);
  //     setLoading(false);
  //     const err = error as AxiosError;
  //     return err;
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.containerLogo}>
          <Image
            style={{ maxHeight: "85%", width: 176 }}
            source={require("../../../assets/images/Logo-App-Nova.png")}
          />
        </View>

        <Text style={styles.textHeader}>Esqueceu sua senha?</Text>
        <Text style={styles.textSubheader}>
          Insira seu email e vamos te enviar um link para redefinir sua senha
        </Text>

        {/* <FormInput
          label="Email"
          name="email"
          placeholder="Insira seu email"
          required={true}
          control={control}
          error={errors.email?.message}
          colorLabel="#4E4E4E"
        />
        <TouchableOpacity
          style={styles.buttonSubmit}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.loginButtonText}>
            {loading ? <ActivityIndicator color="white" /> : "Enviar link"}
          </Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.signupButtonReturn}
          onPress={() => router.push("/(not-authenticated)/signup/page")}
        >
          <Text style={styles.buttonReturnText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  formContainer: {
    width: "87%",
    backgroundColor: "white",
    marginTop: 140,
  },
  containerLogo: {
    alignItems: "center",
    width: "100%",
    marginBottom: 80,
  },
  textHeader: {
    color: "#4E4E4E",
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "left"
  },
  textSubheader: {
    color: "#4E4E4E",
    fontSize: 14,
    textAlign: "left",
    marginBottom: 20,
  },
  buttonSubmit: {
    backgroundColor: "#25399E",
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },

  returnButtonText: {
    color: "#25399E",
    fontSize: 12,
    fontWeight: "bold",
    borderColor: "#E2E8F0",
    backgroundColor: "white",
  },
  containerCreateAccout: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
  signinTextFirst: {
    color: "#4E4E4E",
    fontSize: 12,
    fontWeight: "bold",
  },
  signinTextSecond: {
    color: "#546ADA",
    fontSize: 12,
    fontWeight: "bold",
  },

  signupButtonReturn: {
    borderWidth: 1.5,
    borderColor: "#DBE1FF",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 17,
  },
  buttonReturnText: {
    fontWeight: "bold",
    color: "#25399E",
    fontSize: 12,
  },
});
