import { StyleProp, Text, TextStyle } from "react-native";

interface InputLabelProps {
  label: string;
  required?: boolean;
  paddingTopLabel?: number;
  paddingLeftLabel?: number;
  colorLabel?: string;
}

export function InputLabel({ label, required, paddingTopLabel, paddingLeftLabel, colorLabel }: InputLabelProps) {
  return (
    <Text style={{ fontSize: 14, color: colorLabel, paddingTop: paddingTopLabel, paddingLeft: paddingLeftLabel }}>
      {label}
      {required && <Text style={{ color: "red" }}> *</Text>}
    </Text>
  );
}
