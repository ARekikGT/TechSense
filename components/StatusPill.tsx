import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface StatusPillProps {
  status: "idle" | "cleaning" | "error" | "paused";
}

export function StatusPill({ status }: StatusPillProps) {
  const getStatusColor = () => {
    switch (status) {
      case "idle": return "#64748b";
      case "cleaning": return "#10b981";
      case "error": return "#ef4444";
      case "paused": return "#f59e0b";
      default: return "#64748b";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "idle": return "Idle";
      case "cleaning": return "Cleaning";
      case "error": return "Error";
      case "paused": return "Paused";
      default: return "Unknown";
    }
  };

  return (
    <View style={[styles.pill, { backgroundColor: getStatusColor() }]}>
      <Text style={styles.text}>{getStatusText()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  text: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
});