import { Colors } from "@/constants/Colors";
import { useInputFocus } from "@/hooks/useInputFocus";
import React, { ReactNode } from "react";
import { Controller, FieldValues, UseControllerProps } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

type AditionalInput = {
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  errorMessage?: string;
  errorColor?: string;
  sizeError?: number;
  paddingBottom?: number;
  paddingTop?: number;
  placeholderColor?: string;
  inputTextColor?: string;
  borderColorInputFocus?: string;
  borderColorInputBlur?: string;
  backgroundColorInput?: string;
  borderRadius?: number;
  colorLabel?: string;
  sizeLabel?: number;
  heightInput?: number;
  keyboardType?: TextInputProps["keyboardType"];
} & TextInputProps;

export function ControlledInput<FormType extends FieldValues>({
  control,
  name,
  leftIcon,
  rightIcon,
  errorMessage,
  errorColor = "red",
  sizeError = 12,
  paddingBottom,
  paddingTop,
  label,
  colorLabel = "white",
  sizeLabel = 16,
  placeholderColor,
  inputTextColor = "white",
  borderColorInputFocus,
  borderColorInputBlur,
  backgroundColorInput = Colors.light.text,
  borderRadius = 8,
  heightInput = 50,
  keyboardType,
  ...textInputProps
}: UseControllerProps<FormType> & AditionalInput) {
  const { handleBlur, handleFocus, isFocused } = useInputFocus();

  const onChangeText = (text: string, onChange: (...event: any[]) => void) => {
    if (
      keyboardType === "numeric" ||
      keyboardType === "number-pad" ||
      keyboardType === "decimal-pad"
    ) {
      const onlyNumbers = text.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      onChange(onlyNumbers);
    } else {
      onChange(text);
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={styles.container}>
          {label && (
            <Text
              style={[styles.label, { fontSize: sizeLabel, color: colorLabel }]}
            >
              {label}
            </Text>
          )}
          <View
            style={[
              styles.textInputContainer,
              {
                borderRadius: borderRadius,
                borderColor: isFocused
                  ? borderColorInputFocus
                  : borderColorInputBlur,
                borderWidth: 2.5,
              },
            ]}
          >
            {leftIcon && (
              <View style={styles.iconLeftContainer}>{leftIcon}</View>
            )}
            <TextInput
              {...textInputProps}
              keyboardType={keyboardType}
              onChangeText={(text) => onChangeText(text, onChange)}
              onBlur={handleBlur}
              onFocus={handleFocus}
              value={value?.toString() || ""}
              placeholderTextColor={placeholderColor}
              style={[
                {
                  color: inputTextColor,
                  backgroundColor: backgroundColorInput,
                  height: heightInput,
                  fontSize: 18,
                },
                textInputProps.style,
                styles.input,
              ]}
            />
            {rightIcon && (
              <View style={styles.iconRightContainer}>{rightIcon}</View>
            )}
            {errorMessage && (
              <Text
                style={[
                  styles.errorMessage,
                  { color: errorColor, fontSize: sizeError },
                ]}
              >
                {errorMessage}
              </Text>
            )}
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20, // Spacing between fields
    position: "relative",
  },
  label: {
    marginBottom: 8,
  },
  textInputContainer: {
    flexDirection: "row", // Aligns the icon and input field horizontally
    backgroundColor: "#7589A4",
    position: "relative",
  },
  iconLeftContainer: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  iconRightContainer: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 1, // The input field takes up the remaining space
    borderRadius: 8,
  },
  errorMessage: {
    position: "absolute",
    bottom: -20,
    left: 0,
    fontSize: 12,
  },
});
