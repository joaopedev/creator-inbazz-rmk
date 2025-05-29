import { TextInput, TextInputProps, StyleSheet } from "react-native";
import { forwardRef } from 'react'

interface InputFieldProps extends TextInputProps {
  error?: string;
  isFocused?: boolean;
}

export const InputField = forwardRef<TextInput, InputFieldProps>(({ error, isFocused, style, ...rest }, ref) => {
  return (
    <TextInput
      ref={ref}
      style={[
        styles.input,
        isFocused && styles.inputFocused,
        error && styles.inputError, 
        style,
      ]}
      {...rest}
    />
  );
})

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 9,
    borderColor: "#ccc",
    fontSize: 16,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "red",
  },
  inputFocused: {
    borderColor: "#000",
  },
});
