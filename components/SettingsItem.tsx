import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ChevronRight } from "lucide-react-native";

interface SettingsItemProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightComponent?: React.ReactNode;
  showChevron?: boolean;
}

export function SettingsItem({ title, subtitle, onPress, rightComponent, showChevron }: SettingsItemProps) {
  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {rightComponent && <View style={styles.rightComponent}>{rightComponent}</View>}
      {showChevron && <ChevronRight color="#64748b" size={20} />}
    </Component>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1f2937",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
  },
  rightComponent: {
    marginRight: 8,
  },
});