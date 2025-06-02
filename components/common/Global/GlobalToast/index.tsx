import { useEffect } from "react";
import { Animated, Platform, StyleSheet, Text } from "react-native";
import { useUIStore } from "../../../../store/useUIStore";


export function GlobalToast() {
    const { toastMessage, showToast } = useUIStore();
    const opacity = new Animated.Value(0);

    useEffect(() => {
        if (showToast) {
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.delay(2000),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [showToast]);

    if (!showToast) return null;

    return (
        <Animated.View style={[styles.container, { opacity }]}>
            <Text style={styles.text}>{toastMessage}</Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: Platform.OS === "ios" ? 100 : 55,
        left: 8,
        right: 8,
        backgroundColor: "#323232",
        padding: 16,
        borderRadius: 5,
        alignItems: "center",
        zIndex: 1000,
    },
    text: {
        color: "white",
        fontSize: 16,
    },
});