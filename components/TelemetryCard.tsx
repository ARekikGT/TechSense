import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

interface TelemetryCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  testId?: string;
}

export function TelemetryCard({ icon, label, value, color, testId }: TelemetryCardProps) {
  return (
    <View style={[styles.card, { borderLeftColor: color }]} testID={testId}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    width: "48%",
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "500",
    marginBottom: 2,
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
});