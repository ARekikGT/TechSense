import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Eye, EyeOff } from "lucide-react-native";
import { PanelGrid } from "@/components/PanelGrid";
import { useTelemetry } from "@/hooks/useTelemetry";



export default function LiveViewScreen() {
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { sendCommand } = useTelemetry();
  const insets = useSafeAreaInsets();

  const handleCellPress = (row: number, col: number) => {
    setSelectedCell({ row, col });
  };

  const handleSpotClean = () => {
    if (!selectedCell) return;
    setShowModal(true);
  };

  const confirmSpotClean = async () => {
    if (!selectedCell) return;
    console.log(`Spot cleaning cell ${selectedCell.row},${selectedCell.col}`);
    await sendCommand("spot_clean", { 
      row: selectedCell.row, 
      col: selectedCell.col 
    });
    setSelectedCell(null);
    setShowModal(false);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Live Panel View</Text>
        <TouchableOpacity
          style={styles.heatmapToggle}
          onPress={() => setShowHeatmap(!showHeatmap)}
        >
          {showHeatmap ? (
            <Eye color="#1e3a8a" size={20} />
          ) : (
            <EyeOff color="#64748b" size={20} />
          )}
          <Text style={[styles.toggleText, { color: showHeatmap ? "#1e3a8a" : "#64748b" }]}>
            Dirt Heatmap
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.gridContainer}>
        <PanelGrid
          showHeatmap={showHeatmap}
          selectedCell={selectedCell}
          onCellPress={handleCellPress}
        />
      </View>

      {selectedCell && (
        <View style={styles.actionContainer}>
          <Text style={styles.selectedText}>
            Selected: Row {selectedCell.row + 1}, Column {selectedCell.col + 1}
          </Text>
          <TouchableOpacity style={styles.spotCleanButton} onPress={handleSpotClean}>
            <Text style={styles.spotCleanText}>Spot Clean This Area</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: "#10b981" }]} />
          <Text style={styles.legendText}>Clean</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: "#f59e0b" }]} />
          <Text style={styles.legendText}>Light Soiling</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: "#ef4444" }]} />
          <Text style={styles.legendText}>Heavy Soiling</Text>
        </View>
      </View>

      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Spot Clean</Text>
            <Text style={styles.modalMessage}>
              Clean panel at Row {selectedCell ? selectedCell.row + 1 : 0}, Column {selectedCell ? selectedCell.col + 1 : 0}?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirmSpotClean}
              >
                <Text style={styles.confirmButtonText}>Clean</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  heatmapToggle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "500",
  },
  gridContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  actionContainer: {
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedText: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 12,
    textAlign: "center",
  },
  spotCleanButton: {
    backgroundColor: "#10b981",
    paddingVertical: 12,
    borderRadius: 8,
  },
  spotCleanText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  legend: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 24,
    marginHorizontal: 20,
    minWidth: 280,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 12,
    textAlign: "center",
  },
  modalMessage: {
    fontSize: 16,
    color: "#64748b",
    marginBottom: 24,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#f3f4f6",
  },
  confirmButton: {
    backgroundColor: "#10b981",
  },
  cancelButtonText: {
    color: "#64748b",
    fontSize: 16,
    fontWeight: "600",
  },
  confirmButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});