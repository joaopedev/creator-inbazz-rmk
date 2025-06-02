import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useUIStore } from "../../../../store/useUIStore";


export function GlobalSpinner() {
    const showSpinner = useUIStore((state) => state.showSpinner);
    if (!showSpinner) return null;

    return (
        <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#4AACB3" style={{ flex: 1 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.2)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
});
