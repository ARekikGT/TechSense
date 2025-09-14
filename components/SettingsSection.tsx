import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface SettingsSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export function SettingsSection({ title, icon, children }: SettingsSectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        {icon}
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginLeft: 8,
  },
  content: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});