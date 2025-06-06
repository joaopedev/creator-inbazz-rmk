import React from "react";
import { Image, StyleSheet } from "react-native";

type TabBarImageIconProps = {
  focused: boolean;
  activeIcon: any;
  inactiveIcon: any;
  size?: number;
};

export function TabBarImageIcon({
  focused,
  activeIcon,
  inactiveIcon,
  size,
}: TabBarImageIconProps) {
  return (
    <Image
      source={focused ? activeIcon : inactiveIcon}
      style={[styles.icon, { opacity: focused ? 1 : 0.6, padding: size }]}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 18,
    height: 18,
  },
});
