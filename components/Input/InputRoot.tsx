import { ReactNode } from "react";
import { View, StyleSheet } from "react-native";

interface InputRootProps {
  children: ReactNode;
}

export function InputRoot({ children }: InputRootProps) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 4,
  },
});
