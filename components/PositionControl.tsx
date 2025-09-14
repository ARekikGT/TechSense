import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import Slider from "@react-native-community/slider";

interface Position {
  x: number;
  y: number;
  z: number;
}

interface PositionControlProps {
  position: Position;
  onPositionChange: (position: Position) => void;
  disabled?: boolean;
}

export function PositionControl({ position, onPositionChange, disabled }: PositionControlProps) {
  const updatePosition = (axis: keyof Position, value: number) => {
    onPositionChange({ ...position, [axis]: value });
  };

  return (
    <View style={styles.container}>
      <View style={styles.axisControl}>
        <Text style={styles.axisLabel}>X-Axis (Horizontal)</Text>
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            value={position.x}
            onValueChange={(value) => updatePosition("x", value)}
            minimumTrackTintColor="#1e3a8a"
            maximumTrackTintColor="#e2e8f0"

            disabled={disabled}
          />
          <TextInput
            style={[styles.input, disabled && styles.disabledInput]}
            value={position.x.toFixed(0)}
            onChangeText={(text) => updatePosition("x", parseInt(text) || 0)}
            keyboardType="numeric"
            editable={!disabled}
          />
        </View>
      </View>

      <View style={styles.axisControl}>
        <Text style={styles.axisLabel}>Y-Axis (Vertical)</Text>
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            value={position.y}
            onValueChange={(value) => updatePosition("y", value)}
            minimumTrackTintColor="#1e3a8a"
            maximumTrackTintColor="#e2e8f0"

            disabled={disabled}
          />
          <TextInput
            style={[styles.input, disabled && styles.disabledInput]}
            value={position.y.toFixed(0)}
            onChangeText={(text) => updatePosition("y", parseInt(text) || 0)}
            keyboardType="numeric"
            editable={!disabled}
          />
        </View>
      </View>

      <View style={styles.axisControl}>
        <Text style={styles.axisLabel}>Z-Axis (Height)</Text>
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            value={position.z}
            onValueChange={(value) => updatePosition("z", value)}
            minimumTrackTintColor="#1e3a8a"
            maximumTrackTintColor="#e2e8f0"

            disabled={disabled}
          />
          <TextInput
            style={[styles.input, disabled && styles.disabledInput]}
            value={position.z.toFixed(0)}
            onChangeText={(text) => updatePosition("z", parseInt(text) || 0)}
            keyboardType="numeric"
            editable={!disabled}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  axisControl: {
    marginBottom: 20,
  },
  axisLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  slider: {
    flex: 1,
    height: 40,
  },
  thumb: {
    backgroundColor: "#1e3a8a",
    width: 20,
    height: 20,
  },
  input: {
    width: 60,
    height: 40,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    textAlign: "center",
    marginLeft: 12,
    fontSize: 16,
    backgroundColor: "#ffffff",
  },
  disabledInput: {
    backgroundColor: "#f3f4f6",
    color: "#9ca3af",
  },
});