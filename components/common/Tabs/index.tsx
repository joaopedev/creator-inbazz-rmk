import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

interface TabsProps {
  tabs: string[];
  selected: string;
  onSelect: (tab: string) => void;
}

export default function Tabs({ tabs, selected, onSelect }: TabsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={styles.tabButton}
            onPress={() => onSelect(tab)}
          >
            <Text style={[styles.tabText, selected === tab && styles.selectedText]}>
              {tab.toUpperCase()}
            </Text>
            {selected === tab && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.bottomBorder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
  },
  tabButton: {
    alignItems: "center",
    paddingVertical: 15,
    flex: 1,
  },
  tabText: {
    color: "#B4B4B4",
    fontWeight: "500",
    fontSize: 14,
  },
  selectedText: {
    color: "#4AACB3",
  },
  tabUnderline: {
    height: 3,
    backgroundColor: "#4AACB3",
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  bottomBorder: {
    height: 1,
    width: "100%",
    backgroundColor: "#B4B4B4",
    position: "absolute",
    bottom: 0,
  },
});
