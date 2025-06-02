import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function WalletScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carteira</Text>

      <View style={styles.balanceContainer}>
        <View>
          <Text style={styles.label}>Saldo atual</Text>
          <Text style={styles.value}>R$ 0.00</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionBox}>
          <Text style={styles.icon}>↗</Text>
          <Text>Retirar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBox}>
          <Text style={styles.icon}>⚙</Text>
          <Text>Configurações</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.totalEarnings}>
        <Text style={styles.label}>Ganhos totais</Text>
        <Text style={styles.value}>R$ 0.00</Text>
        <Text style={styles.subtext}>Nos últimos 30 dias — 0%</Text>
      </View>

      <Text style={styles.subtitle}>Últimos lançamentos</Text>

      <View style={styles.emptyBox}>
        {/* <Image
          source={require("../../../assets/images/empty.png")}
          style={styles.emptyIcon}
        /> */}
        <Text>Nenhuma transação encontrada</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 20, fontWeight: "600", textAlign: "center", marginBottom: 20 },
  balanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  label: { fontSize: 14, color: "#555" },
  value: { fontSize: 24, fontWeight: "700" },
  arrow: { fontSize: 24, fontWeight: "bold", color: "#888" },
  actionsRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  actionBox: {
    width: "48%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  icon: { fontSize: 20, marginBottom: 8 },
  totalEarnings: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginBottom: 20,
  },
  subtext: { fontSize: 12, color: "#999" },
  subtitle: { fontWeight: "600", fontSize: 16, marginBottom: 10 },
  emptyBox: { flex: 1, alignItems: "center", justifyContent: "center" },
  emptyIcon: { width: 50, height: 50, marginBottom: 10 },
});
