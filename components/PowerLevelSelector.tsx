import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Leaf, Zap, Flame } from "lucide-react-native";

interface PowerLevelSelectorProps {
  selected: "eco" | "normal" | "max";
  onSelect: (level: "eco" | "normal" | "max") => void;
  disabled?: boolean;
}

export function PowerLevelSelector({ selected, onSelect, disabled }: PowerLevelSelectorProps) {
  const levels = [
    {
      key: "eco" as const,
      label: "Eco",
      icon: <Leaf color="#10b981" size={20} />,
      description: "Low power, longer duration",
      color: "#10b981",
    },
    {
      key: "normal" as const,
      label: "Normal",
      icon: <Zap color="#1e3a8a" size={20} />,
      description: "Balanced power and speed",
      color: "#1e3a8a",
    },
    {
      key: "max" as const,
      label: "Max",
      icon: <Flame color="#f59e0b" size={20} />,
      description: "High power, fast cleaning",
      color: "#f59e0b",
    },
  ];

  return (
    <View style={styles.container}>
      {levels.map((level) => (
        <TouchableOpacity
          key={level.key}
          style={[
            styles.levelButton,
            selected === level.key && { borderColor: level.color, backgroundColor: `${level.color}10` },
            disabled && styles.disabledButton,
          ]}
          onPress={() => !disabled && onSelect(level.key)}
          disabled={disabled}
        >
          <View style={styles.levelIcon}>
            {level.icon}
          </View>
          <View style={styles.levelInfo}>
            <Text style={[styles.levelLabel, selected === level.key && { color: level.color }]}>
              {level.label}
            </Text>
            <Text style={styles.levelDescription}>{level.description}</Text>
          </View>
          {selected === level.key && (
            <View style={[styles.selectedIndicator, { backgroundColor: level.color }]} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  levelButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  levelIcon: {
    marginRight: 12,
  },
  levelInfo: {
    flex: 1,
  },
  levelLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 2,
  },
  levelDescription: {
    fontSize: 14,
    color: "#64748b",
  },
  selectedIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  disabledButton: {
    opacity: 0.5,
  },
});