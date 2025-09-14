import React from "react";
import { StyleSheet, View, TouchableOpacity, useWindowDimensions } from "react-native";

interface PanelGridProps {
  showHeatmap: boolean;
  selectedCell: { row: number; col: number } | null;
  onCellPress: (row: number, col: number) => void;
}

export function PanelGrid({ showHeatmap, selectedCell, onCellPress }: PanelGridProps) {
  const { width } = useWindowDimensions();
  const rows = 6;
  const cols = 8;
  const cellSize = (width - 80) / cols;

  // Mock soiling data
  const getSoilingLevel = (row: number, col: number) => {
    if (typeof row !== 'number' || typeof col !== 'number') return 0;
    if (row < 0 || col < 0) return 0;
    const seed = row * cols + col;
    return Math.sin(seed) * 0.5 + 0.5;
  };

  const getCellColor = (row: number, col: number) => {
    if (!showHeatmap) return "#e2e8f0";
    if (typeof row !== 'number' || typeof col !== 'number') return "#e2e8f0";
    if (row < 0 || col < 0) return "#e2e8f0";
    
    const soiling = getSoilingLevel(row, col);
    if (soiling < 0.3) return "#10b981";
    if (soiling < 0.7) return "#f59e0b";
    return "#ef4444";
  };

  const isSelected = (row: number, col: number) => {
    if (typeof row !== 'number' || typeof col !== 'number') return false;
    return selectedCell?.row === row && selectedCell?.col === col;
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: rows }, (_, row) => (
        <View key={row} style={styles.row}>
          {Array.from({ length: cols }, (_, col) => (
            <TouchableOpacity
              key={col}
              style={[
                styles.cell,
                {
                  width: cellSize,
                  height: cellSize * 0.6,
                  backgroundColor: getCellColor(row, col),
                },
                isSelected(row, col) && styles.selectedCell,
              ]}
              onPress={() => onCellPress(row, col)}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    marginBottom: 4,
  },
  cell: {
    marginRight: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  selectedCell: {
    borderWidth: 3,
    borderColor: "#1e3a8a",
  },
});