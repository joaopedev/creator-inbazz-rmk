import { StyleSheet, Text, View } from "react-native";

export default function PostsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus posts</Text>

      <View style={styles.banner}>
        <Text style={styles.bannerText}>
          ℹ️ Os posts são contabilizados em até 24h após a postagem
        </Text>
      </View>

      <Text style={styles.tabLabel}>Todos</Text>

      <View style={styles.emptyBox}>
        {/* <Image
          source={require("../../../assets/images/empty.png")} // substitua se desejar
          style={styles.emptyIcon}
        /> */}
        <Text>Você não possui posts</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 18, fontWeight: "600", textAlign: "center", marginBottom: 20 },
  banner: {
    backgroundColor: "#FF7E5F",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  bannerText: { color: "#fff", fontSize: 14 },
  tabLabel: {
    fontWeight: "600",
    color: "#3A5BDC",
    borderBottomWidth: 2,
    borderBottomColor: "#3A5BDC",
    width: 50,
    marginBottom: 20,
  },
  emptyBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyIcon: { width: 50, height: 50, marginBottom: 10 },
});