import React from "react";
import { Image, StyleSheet } from "react-native";

type TabBarImageIconProps = {
    focused: boolean;
    activeIcon: any;
    inactiveIcon: any;
};

export function TabBarImageIcon({ focused, activeIcon, inactiveIcon }: TabBarImageIconProps) {
    return (
        <Image
            source={focused ? activeIcon : inactiveIcon}
            style={[styles.icon, { opacity: focused ? 1 : 0.6 }]}
            resizeMode="contain"
        />
    );
}

const styles = StyleSheet.create({
    icon: {
        width: 50,
        height: 50,
    },
});
