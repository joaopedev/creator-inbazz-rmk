import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { TabBarImageIcon } from "../../components/navigation/TabBarImageIcon";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: "transparent",
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarBackground: () => (
          <LinearGradient colors={["#fff", "#fff"]} style={{ flex: 1 }} />
        ),
      }}
    >
      <Tabs.Screen
        name="home/page"
        options={{
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused, size }) => (
            <TabBarImageIcon
              focused={focused}
              activeIcon={require("../../assets/images/homeActive.png")}
              inactiveIcon={require("../../assets/images/homeInactive.png")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="posts/page"
        options={{
          title: "Posts",
          tabBarLabel: "Posts",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarImageIcon
              focused={focused}
              activeIcon={require("../../assets/images/postsActive.png")}
              inactiveIcon={require("../../assets/images/postsInactive.png")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="integrations/page"
        options={{
          title: "Integrations",
          tabBarLabel: "Integrations",
          tabBarIcon: ({ color, focused }) => (
            <TabBarImageIcon
              focused={focused}
              activeIcon={require("../../assets/images/integrationsActive.png")}
              inactiveIcon={require("../../assets/images/integrationsInactive.png")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet/page"
        options={{
          title: "Wallet",
          tabBarLabel: "Wallet",
          headerShown: true,
          headerTitleAlign: `${Platform.OS === "ios" ? "center" : "left"}`,
          headerTitle: "Wallet",
          headerTitleStyle: { fontSize: 20 },
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#4AACB3" },
          tabBarIcon: ({ color, focused }) => (
            <TabBarImageIcon
              focused={focused}
              activeIcon={require("../../assets/images/walletActive.png")}
              inactiveIcon={require("../../assets/images/walletInactive.png")}
            />
          ),
        }}
      />
    </Tabs>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slotContainer: {
    flex: 1,
    position: "relative",
  },
});
