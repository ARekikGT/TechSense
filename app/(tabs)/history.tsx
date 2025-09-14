import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Download, CheckCircle, XCircle, AlertCircle } from "lucide-react-native";
import { HistoryItem } from "@/components/HistoryItem";
import { useHistory } from "@/hooks/useHistory";

export default function HistoryScreen() {
  const [filter, setFilter] = useState<"all" | "success" | "failed">("all");
  const { history, exportData } = useHistory();
  const insets = useSafeAreaInsets();

  const filteredHistory = history.filter((item) => {
    if (filter === "all") return true;
    return item.result === filter;
  });

  const getFilterColor = (filterType: string) => {
    switch (filterType) {
      case "success": return "#10b981";
      case "failed": return "#ef4444";
      default: return "#64748b";
    }
  };

  const handleExport = async () => {
    console.log("Exporting history data...");
    await exportData();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Cleaning History</Text>
        <TouchableOpacity style={styles.exportButton} onPress={handleExport}>
          <Download color="#1e3a8a" size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "all" && { backgroundColor: getFilterColor("all") },
          ]}
          onPress={() => setFilter("all")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "all" && styles.activeFilterText,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "success" && { backgroundColor: getFilterColor("success") },
          ]}
          onPress={() => setFilter("success")}
        >
          <CheckCircle
            color={filter === "success" ? "#ffffff" : "#10b981"}
            size={16}
          />
          <Text
            style={[
              styles.filterText,
              filter === "success" && styles.activeFilterText,
              { color: filter === "success" ? "#ffffff" : "#10b981" },
            ]}
          >
            Success
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "failed" && { backgroundColor: getFilterColor("failed") },
          ]}
          onPress={() => setFilter("failed")}
        >
          <XCircle
            color={filter === "failed" ? "#ffffff" : "#ef4444"}
            size={16}
          />
          <Text
            style={[
              styles.filterText,
              filter === "failed" && styles.activeFilterText,
              { color: filter === "failed" ? "#ffffff" : "#ef4444" },
            ]}
          >
            Failed
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredHistory.map((item) => (
          <HistoryItem key={item.id} item={item} />
        ))}

        {filteredHistory.length === 0 && (
          <View style={styles.emptyState}>
            <AlertCircle color="#64748b" size={48} />
            <Text style={styles.emptyTitle}>No records found</Text>
            <Text style={styles.emptyDescription}>
              {filter === "all"
                ? "No cleaning history available"
                : `No ${filter} cleaning records found`}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
  },
  exportButton: {
    backgroundColor: "#ffffff",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 8,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748b",
    marginLeft: 4,
  },
  activeFilterText: {
    color: "#ffffff",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
  },
});