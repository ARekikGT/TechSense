import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CheckCircle, XCircle, AlertCircle, Play, Square, RotateCw } from "lucide-react-native";
import { HistoryItem as HistoryItemType } from "@/hooks/useHistory";

interface HistoryItemProps {
  item: HistoryItemType;
}

export function HistoryItem({ item }: HistoryItemProps) {
  const getResultIcon = () => {
    switch (item.result) {
      case "success":
        return <CheckCircle color="#10b981" size={20} />;
      case "failed":
        return <XCircle color="#ef4444" size={20} />;
      case "partial":
        return <AlertCircle color="#f59e0b" size={20} />;
      default:
        return <CheckCircle color="#64748b" size={20} />;
    }
  };

  const getTypeIcon = () => {
    switch (item.type) {
      case "spot_clean":
        return <Play color="#64748b" size={16} />;
      case "row_clean":
        return <Square color="#64748b" size={16} />;
      case "full_sweep":
        return <RotateCw color="#64748b" size={16} />;
      default:
        return <Play color="#64748b" size={16} />;
    }
  };

  const getTypeLabel = () => {
    switch (item.type) {
      case "spot_clean": return "Spot Clean";
      case "row_clean": return "Row Clean";
      case "full_sweep": return "Full Sweep";
      default: return item.type;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.typeContainer}>
          {getTypeIcon()}
          <Text style={styles.type}>{getTypeLabel()}</Text>
        </View>
        <View style={styles.resultContainer}>
          {getResultIcon()}
        </View>
      </View>
      
      <View style={styles.dateTime}>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Duration</Text>
          <Text style={styles.statValue}>{item.duration}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Water</Text>
          <Text style={styles.statValue}>{item.water_used}L</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Energy</Text>
          <Text style={styles.statValue}>{item.energy_used}kWh</Text>
        </View>
      </View>

      {item.reason && (
        <View style={styles.reasonContainer}>
          <Text style={styles.reason}>{item.reason}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  type: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginLeft: 6,
  },
  resultContainer: {
    alignItems: "center",
  },
  dateTime: {
    flexDirection: "row",
    marginBottom: 12,
  },
  date: {
    fontSize: 14,
    color: "#64748b",
    marginRight: 12,
  },
  time: {
    fontSize: 14,
    color: "#64748b",
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stat: {
    alignItems: "center",
  },
  statLabel: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 2,
  },
  statValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
  },
  reasonContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  reason: {
    fontSize: 14,
    color: "#f59e0b",
    fontStyle: "italic",
  },
});