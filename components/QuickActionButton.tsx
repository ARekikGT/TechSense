import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface QuickActionButtonProps {
  icon: React.ReactNode;
  label: string;
  color: string;
  onPress: () => void;
  testId?: string;
}

export function QuickActionButton({ icon, label, color, onPress, testId }: QuickActionButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
      testID={testId}
    >
      {icon}
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "48%",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 6,
  },
});