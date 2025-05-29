import { Text, StyleSheet, TextStyle } from "react-native";

interface InputMessageErrorProps {
  message?: string;
  style?: TextStyle;
}

export function InputMessageError({ message, style }: InputMessageErrorProps) {
  if (!message) return null;

  return <Text style={[styles.error, style]}>{message}</Text>;
}

const styles = StyleSheet.create({
  error: {
    color: "red",
    fontSize: 12,
    paddingLeft: 9,
    textAlign: "right"
  },
});
