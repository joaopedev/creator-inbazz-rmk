import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function IntegrationsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conectar Redes</Text>
      <Text style={styles.subtitle}>
        Permita que as empresas acompanhem seus posts.
      </Text>

      <TouchableOpacity style={styles.tiktokButton}>
        <Text style={styles.tiktokButtonText}>Conectar TikTok</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.instagramConnected}>
        <Text style={styles.instagramText}>Instagram conectado</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 20, fontWeight: "600", textAlign: "center", marginBottom: 10 },
  subtitle: { textAlign: "center", marginBottom: 30 },
  tiktokButton: {
    backgroundColor: "#1C1C1C",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  tiktokButtonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  instagramConnected: {
    borderWidth: 1,
    borderColor: "#1C1C1C",
    paddingVertical: 12,
    borderRadius: 8,
  },
  instagramText: { textAlign: "center", fontWeight: "600" },
});
