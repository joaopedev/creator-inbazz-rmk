import { Stack } from "expo-router";
import { StatusBar, View } from "react-native";

export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="#ffffff" barStyle="light-content" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(not-authenticated)/signin/page" />
        <Stack.Screen
          name="(not-authenticated)/signup/page"
          options={{
            headerShown: true,
            headerBackTitle: "Voltar",
            headerTitle: "Criar conta",
            headerTitleAlign: "center",
            headerTitleStyle: { fontSize: 20 },
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#ffffff" },
          }}
        />
      </Stack>
    </View>
  );
}
