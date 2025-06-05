import { StyleSheet, Text, View } from "react-native";

export const StepIndicator = ({ step }: { step: number }) => (
    <View style={styles.container}>
        {['Dados de conta', 'Dados pessoais', 'Endereço'].map((label, index, arr) => {
            const isActive = index + 1 === step;
            const isCompleted = index + 1 < step;

            return (
                <View key={label} style={styles.stepContainer}>
                    <View style={styles.stepContent}>
                        <Text style={[styles.stepNumber, (isActive || isCompleted) && styles.activeNumber]}>{index + 1}</Text>
                        <Text style={[styles.label, (isActive || isCompleted) && styles.activeLabel]}>{label}</Text>
                    </View>
                </View>
            );
        })}
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginVertical: 24,
        paddingHorizontal: 16,
    },
    stepContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    stepContent: {
        alignItems: "center",
        width: "100%",
    },
    stepNumber: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#999",
    },
    activeNumber: {
        color: "#25399E",
    },
    label: {
        fontSize: 12,
        color: "#999",
        marginTop: 4,
        textAlign: "center",
    },
    activeLabel: {
        color: "#25399E",
        fontWeight: "600",
    }
});