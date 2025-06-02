// Atualize seu FormInput para aceitar um botão extra

import { ReactNode } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { KeyboardTypeOptions, View } from 'react-native';
import { useFocusInput } from '../../hooks/useFocusInput';
import { Input } from '../Input';

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
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  secureTextEntry?: boolean;
  buttonRight?: ReactNode;
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
  colorLabel = 'black',
  buttonRight,
}: FormInputProps<T>) {
  const { isFocused, handleFocus, handleBlur } = useFocusInput();

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
          <View style={{ position: 'relative' }}>
            {iconLeft && <Input.Icon position="left">{iconLeft}</Input.Icon>}
            <Input.Field
              onChangeText={onChange}
              value={value}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={placeholder}
              keyboardType={keyboardType}
              autoCapitalize={autoCapitalize}
              secureTextEntry={secureTextEntry}
              error={error}
              isFocused={isFocused}
            />
            {iconRight && <Input.Icon position="right">{iconRight}</Input.Icon>}
            {buttonRight && (
              <View style={{ position: 'absolute', right: 0, top: 12 }}>{buttonRight}</View>
            )}
          </View>
        )}
      />
      <Input.MessageError message={error} />
    </Input.Root>
  );
}
