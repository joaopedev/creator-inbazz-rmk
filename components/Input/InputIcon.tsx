import { ReactNode } from "react";
import { View, StyleSheet } from "react-native";

interface InputIconProps {
  position?: "left" | "right";
  children: ReactNode;
}

export function InputIcon({ children, position = "right" }: InputIconProps) {
  const positionStyle = position === "left" ? styles.left : styles.right;
  return <View style={[styles.iconContainer, positionStyle]}>{children}</View>;
}

const styles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    top: 12,
    zIndex: 1,
  },
  right: {
    right: 12,
  },
  left: {
    left: 12,
  },
});