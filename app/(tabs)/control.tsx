import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Play, Square, RotateCw } from "lucide-react-native";
import { PositionControl } from "@/components/PositionControl";
import { PowerLevelSelector } from "@/components/PowerLevelSelector";
import { useTelemetry } from "@/hooks/useTelemetry";

export default function ControlScreen() {
  const [position, setPosition] = useState({ x: 50, y: 50, z: 50 });
  const [powerLevel, setPowerLevel] = useState<"eco" | "normal" | "max">("normal");
  const [showModal, setShowModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string>("");
  const { sendCommand, telemetry } = useTelemetry();
  const insets = useSafeAreaInsets();

  const handlePresetAction = (action: string) => {
    if (!action.trim()) return;
    if (action.length > 100) return;
    const sanitizedAction = action.trim();
    
    setSelectedAction(sanitizedAction);
    setShowModal(true);
  };

  const confirmAction = async () => {
    const actionMap = {
      "Spot Clean": "spot_clean",
      "Row Clean": "row_clean", 
      "Full Sweep": "full_sweep",
    };

    console.log(`Executing ${selectedAction} at ${powerLevel} power`);
    await sendCommand(actionMap[selectedAction as keyof typeof actionMap], { 
      power: powerLevel,
      position 
    });
    setShowModal(false);
  };

  const handlePositionUpdate = async () => {
    console.log("Updating position to:", position);
    await sendCommand("move", position);
  };

  const isDisabled = telemetry.status === "cleaning" || telemetry.status === "error";

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Manual Control</Text>
          <Text style={styles.subtitle}>Precise positioning and cleaning presets</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Position Control</Text>
          <PositionControl
            position={position}
            onPositionChange={setPosition}
            disabled={isDisabled}
          />
          <TouchableOpacity
            style={[styles.updateButton, isDisabled && styles.disabledButton]}
            onPress={handlePositionUpdate}
            disabled={isDisabled}
          >
            <RotateCw color="#ffffff" size={20} />
            <Text style={styles.updateButtonText}>Update Position</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Power Level</Text>
          <PowerLevelSelector
            selected={powerLevel}
            onSelect={setPowerLevel}
            disabled={isDisabled}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Smart Presets</Text>
          <View style={styles.presetsGrid}>
            <TouchableOpacity
              style={[styles.presetButton, styles.spotCleanButton, isDisabled && styles.disabledButton]}
              onPress={() => handlePresetAction("Spot Clean")}
              disabled={isDisabled}
            >
              <Play color="#ffffff" size={24} />
              <Text style={styles.presetButtonText}>Spot Clean</Text>
              <Text style={styles.presetDescription}>Precise, local action</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.presetButton, styles.rowCleanButton, isDisabled && styles.disabledButton]}
              onPress={() => handlePresetAction("Row Clean")}
              disabled={isDisabled}
            >
              <Square color="#ffffff" size={24} />
              <Text style={styles.presetButtonText}>Row Clean</Text>
              <Text style={styles.presetDescription}>One row, end-to-end</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.presetButton, styles.fullSweepButton, isDisabled && styles.disabledButton]}
              onPress={() => handlePresetAction("Full Sweep")}
              disabled={isDisabled}
            >
              <RotateCw color="#ffffff" size={24} />
              <Text style={styles.presetButtonText}>Full Sweep</Text>
              <Text style={styles.presetDescription}>Complete field pass</Text>
            </TouchableOpacity>
          </View>
        </View>

        {isDisabled && (
          <View style={styles.statusWarning}>
            <Text style={styles.warningText}>
              Controls disabled - System is {telemetry.status}
            </Text>
          </View>
        )}
      </ScrollView>

      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedAction}</Text>
            <Text style={styles.modalMessage}>
              Execute {selectedAction} at {powerLevel} power level?
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
                onPress={confirmAction}
              >
                <Text style={styles.confirmButtonText}>Execute</Text>
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
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#64748b",
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 16,
  },
  updateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e3a8a",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  updateButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  presetsGrid: {
    gap: 12,
  },
  presetButton: {
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  spotCleanButton: {
    backgroundColor: "#10b981",
  },
  rowCleanButton: {
    backgroundColor: "#1e3a8a",
  },
  fullSweepButton: {
    backgroundColor: "#f59e0b",
  },
  presetButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  presetDescription: {
    color: "#ffffff",
    fontSize: 14,
    opacity: 0.9,
    marginTop: 4,
  },
  disabledButton: {
    opacity: 0.5,
  },
  statusWarning: {
    backgroundColor: "#fef3c7",
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  warningText: {
    color: "#92400e",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
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