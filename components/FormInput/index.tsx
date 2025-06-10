// Atualize seu FormInput para aceitar um botão extra

import { ReactNode } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { KeyboardTypeOptions, View } from "react-native";
import { useFocusInput } from "../../hooks/useFocusInput";
import { Input } from "../Input";

interface FormInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  placeholder?: string;
  control: Control<T>;
  error?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  paddingLeftIcon?: number;
  paddingRightIcon?: number;
  paddingTopLabel?: number;
  paddingLeftLabel?: number;
  colorLabel?: string;
  required?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  secureTextEntry?: boolean;
  multiline?: boolean;
  textArea?: boolean;
  buttonRight?: ReactNode;
  onChangeText?: (text: string) => void;
  editable?: boolean;
}

export function FormInput<T extends FieldValues>({
  label,
  name,
  placeholder,
  error,
  iconLeft,
  iconRight,
  required = false,
  keyboardType,
  autoCapitalize,
  control,
  secureTextEntry,
  paddingLeftIcon = 0,
  paddingRightIcon = 0,
  paddingTopLabel = 0,
  paddingLeftLabel = 9,
  colorLabel = "black",
  multiline = false,
  textArea = false,
  buttonRight = null,
  onChangeText, // Definindo como null por padrão
}: FormInputProps<T>) {
  const { isFocused, handleFocus, handleBlur } = useFocusInput();

  const textAreaStyle = textArea
    ? {
        height: 120,
        textAlignVertical: "top" as "top",
        paddingTop: 12,
      }
    : {};

  return (
    <Input.Root>
      <Input.Label
        label={label}
        colorLabel={colorLabel}
        required={required}
        paddingTopLabel={paddingTopLabel}
        paddingLeftLabel={paddingLeftLabel}
      />
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={{ position: "relative" }}>
            {iconLeft && <Input.Icon position="left">{iconLeft}</Input.Icon>}
            <Input.Field
              onChangeText={(text) => {
                onChange(text); // Atualiza o valor do react-hook-form
                onChangeText?.(text); // Chama o onChangeText customizado, se houver
              }}
              value={value}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={placeholder}
              keyboardType={keyboardType}
              autoCapitalize={autoCapitalize}
              secureTextEntry={secureTextEntry}
              error={error}
              isFocused={isFocused}
              multiline={multiline}
              style={textAreaStyle}
            />
            {iconRight && <Input.Icon position="right">{iconRight}</Input.Icon>}
            {buttonRight && (
              <View style={{ position: "absolute", right: 0, top: 12 }}>
                {buttonRight}
              </View>
            )}
          </View>
        )}
      />
      <Input.MessageError message={error} />
    </Input.Root>
  );
}
