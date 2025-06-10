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
          fontSize: 10,
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
          tabBarIcon: ({ focused }) => (
            <TabBarImageIcon
              focused={focused}
              activeIcon={require("../../assets/images/home-active.png")}
              inactiveIcon={require("../../assets/images/home-inactive.png")}
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
          tabBarIcon: ({ focused }) => (
            <TabBarImageIcon
              focused={focused}
              activeIcon={require("../../assets/images/posts-active.png")}
              inactiveIcon={require("../../assets/images/posts-inactive.png")}
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
              activeIcon={require("../../assets/images/integrations-active.png")}
              inactiveIcon={require("../../assets/images/integrations-inactive.png")}
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
          tabBarIcon: ({ focused }) => (
            <TabBarImageIcon
              focused={focused}
              activeIcon={require("../../assets/images/wallet-active.png")}
              inactiveIcon={require("../../assets/images/wallet-inactive.png")}
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
