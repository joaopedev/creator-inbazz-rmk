import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const metricasData = [
  { id: "1", titulo: "Interações", valor: 127 },
  { id: "2", titulo: "Indicações", valor: 127 },
  { id: "3", titulo: "Posts", valor: 127 },
  { id: "4", titulo: "Curtidas", valor: 42 },
];

const campanhasData = [
  {
    id: "1",
    nome: "Campanha Inbazz",
    ranking: "1º",
    posts: 12,
    pontos: 127,
    encerraEm: "12 dias",
  },
  {
    id: "2",
    nome: "Campanha Alpha",
    ranking: "2º",
    posts: 8,
    pontos: 95,
    encerraEm: "5 dias",
  },
  {
    id: "3",
    nome: "Campanha Beta",
    ranking: "3º",
    posts: 5,
    pontos: 60,
    encerraEm: "30 dias",
  },
  {
    id: "4",
    nome: "Campanha Gamma",
    ranking: "4º",
    posts: 20,
    pontos: 180,
    encerraEm: "1 dia",
  },
];

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState("Em andamento");
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();

  const renderMetricCard = ({ item }: { item: (typeof metricasData)[0] }) => (
    <View style={styles.metricCard}>
      <Text style={styles.metricTitle}>{item.titulo}</Text>
      <Text style={styles.metricNumber}>{item.valor}</Text>
    </View>
  );

  const renderCampaignCard = ({
    item,
  }: {
    item: (typeof campanhasData)[0];
  }) => (
    <View style={styles.campaignCard}>
      <Text style={styles.campaignTitle}>{item.nome}</Text>
      <View style={styles.campaignMetrics}>
        <View style={styles.campaignMetric}>
          <Text style={styles.campaignMetricLabel}>Ranking</Text>
          <Text style={styles.campaignMetricValue}>{item.ranking}</Text>
        </View>
        <View style={styles.campaignMetric}>
          <Text style={styles.campaignMetricLabel}>Posts</Text>
          <Text style={styles.campaignMetricValue}>{item.posts}</Text>
        </View>
        <View style={styles.campaignMetric}>
          <Text style={styles.campaignMetricLabel}>Pontos</Text>
          <Text style={styles.campaignMetricValue}>{item.pontos}</Text>
        </View>
      </View>
      <Text style={styles.campaignFooter}>Encerra em {item.encerraEm}</Text>
      <TouchableOpacity>
        <Text style={styles.campaignDetails}>Ver detalhes →</Text>
      </TouchableOpacity>
    </View>
  );

  const handleLogout = () => {
    router.replace("/(not-authenticated)/signin/page");
  };

  return (
    <View style={styles.container}>
      <View style={styles.navContainer}>
        <Image
          source={require("../../../assets/images/logodamarca.png")}
          style={styles.logo}
        />
        <Text style={styles.navTitle}>Home</Text>

        {/* 
          Ao clicar nesta imagem, alternamos a visibilidade do menu de logout.
          Coloquei position: "relative" neste container para que o menu possa
          aparecer em posição absoluta em relação a este View. 
        */}
        <View style={styles.profileWrapper}>
          <TouchableOpacity onPress={() => setMenuVisible((v) => !v)}>
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
              style={styles.profileImage}
            />
          </TouchableOpacity>

          {menuVisible && (
            <View style={styles.logoutMenu}>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <Text style={styles.logoutText}>Sair</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 20 }}
      >
        <ImageBackground
          source={require("../../../assets/images/5f3fb6d24e3e62686b224bdbc90790935d7549ff.png")}
          style={styles.banner}
          imageStyle={{ borderRadius: 10 }}
        >
          <Text style={styles.bannerTitle}>Primeiros passos</Text>
          <Text style={styles.bannerSubtitle}>
            Descubra todas as funcionalidades do app
          </Text>
          <TouchableOpacity style={styles.bannerButton}>
            <Text style={styles.bannerButtonText}>→</Text>
          </TouchableOpacity>
        </ImageBackground>

        <Text style={styles.sectionTitle}>Métricas</Text>
        <FlatList
          data={metricasData}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={renderMetricCard}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 5 }}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          style={{ marginBottom: 30 }}
        />

        <Text style={styles.sectionTitle}>Campanhas</Text>
        <View style={styles.tabsContainer}>
          {["Em andamento", "Disponíveis", "Finalizadas"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Lista vertical de campanhas */}
        {campanhasData.map((campanha) => (
          <View key={campanha.id} style={{ marginBottom: 20 }}>
            {renderCampaignCard({ item: campanha })}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  navContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  navTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  profileWrapper: {
    position: "relative",
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  logoutMenu: {
    position: "absolute",
    top: 50,
    right: 0,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  logoutButton: {
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  logoutText: {
    fontSize: 14,
    color: "#e53935",
    fontWeight: "600",
  },

  banner: {
    borderRadius: 10,
    padding: 20,
    marginBottom: 25,
    position: "relative",
    overflow: "hidden", // Garante que o conteúdo respeite o borderRadius
  },
  bannerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  bannerSubtitle: {
    color: "#fff",
    fontSize: 12,
    marginBottom: 12,
  },
  bannerButton: {
    position: "absolute",
    right: 20,
    top: 30,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  bannerButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  sectionTitle: {
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 15,
    color: "#000",
  },
  metricCard: {
    width: 120,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  metricTitle: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },
  metricNumber: {
    fontWeight: "700",
    fontSize: 20,
  },
  tabsContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#d4e3fc",
    borderColor: "#5b8def",
  },
  tabText: {
    fontSize: 14,
    color: "#999",
  },
  activeTabText: {
    color: "#3a5bdc",
    fontWeight: "700",
  },
  campaignCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  campaignTitle: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 10,
  },
  campaignMetrics: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  campaignMetric: {
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    padding: 10,
    flex: 1,
    marginHorizontal: 3,
    alignItems: "center",
  },
  campaignMetricLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  campaignMetricValue: {
    fontWeight: "700",
    fontSize: 16,
  },
  campaignFooter: {
    marginTop: 10,
    fontSize: 12,
    color: "#999",
  },
  campaignDetails: {
    marginTop: 6,
    color: "#2f6bed",
    fontWeight: "600",
  },
});
