import React from "react";
import { StyleSheet, Text, View, Switch } from "react-native";
import { Clock } from "lucide-react-native";
import { Schedule } from "@/hooks/useSchedules";

interface ScheduleItemProps {
  schedule: Schedule;
  onToggle: () => void;
}

export function ScheduleItem({ schedule, onToggle }: ScheduleItemProps) {
  const getTypeLabel = (type: string) => {
    switch (type) {
      case "spot_clean": return "Spot Clean";
      case "row_clean": return "Row Clean";
      case "full_sweep": return "Full Sweep";
      default: return type;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Clock color="#1e3a8a" size={20} />
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{schedule.name}</Text>
        <Text style={styles.time}>{schedule.time}</Text>
        <Text style={styles.days}>{schedule.days.join(", ")}</Text>
        <Text style={styles.type}>{getTypeLabel(schedule.type)}</Text>
      </View>
      <Switch
        value={schedule.enabled}
        onValueChange={onToggle}
        trackColor={{ false: "#d1d5db", true: "#10b981" }}
        thumbColor="#ffffff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f8fafc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 2,
  },
  time: {
    fontSize: 14,
    color: "#1e3a8a",
    fontWeight: "500",
    marginBottom: 2,
  },
  days: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 2,
  },
  type: {
    fontSize: 12,
    color: "#64748b",
  },
});