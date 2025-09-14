import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Battery,
  Zap,
  Droplets,
  TestTube,
  Clock,
  Play,
  Square,
  Pause,
  Calendar,
} from "lucide-react-native";
import { useTelemetry } from "@/hooks/useTelemetry";
import { TelemetryCard } from "@/components/TelemetryCard";
import { QuickActionButton } from "@/components/QuickActionButton";
import { TrendChart } from "@/components/TrendChart";
import { StatusPill } from "@/components/StatusPill";



export default function DashboardScreen() {
  const { telemetry, sendCommand } = useTelemetry();
  const insets = useSafeAreaInsets();

  const handleQuickAction = async (action: string) => {
    console.log(`Executing ${action}`);
    await sendCommand(action.toLowerCase().replace(" ", "_"));
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>TechSense</Text>
          <Text style={styles.subtitle}>Smart Tech. Clean Panels. More Power.</Text>
          <StatusPill status={telemetry.status} />
        </View>

        <View style={styles.telemetryGrid}>
          <TelemetryCard
            icon={<Battery color="#10b981" size={24} />}
            label="Battery"
            value={`${telemetry.battery_pct}%`}
            color="#10b981"
            testId="battery-card"
          />
          <TelemetryCard
            icon={<Zap color="#f59e0b" size={24} />}
            label="PV Input"
            value={`${telemetry.pv_input_w}W`}
            color="#f59e0b"
            testId="pv-card"
          />
          <TelemetryCard
            icon={<Droplets color="#3b82f6" size={24} />}
            label="Water Level"
            value={`${telemetry.water_level_pct}%`}
            color="#3b82f6"
            testId="water-card"
          />
          <TelemetryCard
            icon={<TestTube color="#8b5cf6" size={24} />}
            label="TDS"
            value={`${telemetry.tds_ppm} ppm`}
            color="#8b5cf6"
            testId="tds-card"
          />
        </View>

        <View style={styles.lastCleanedCard}>
          <Clock color="#64748b" size={20} />
          <Text style={styles.lastCleanedText}>
            Last cleaned: {telemetry.last_clean}
          </Text>
        </View>

        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <QuickActionButton
              icon={<Play color="#ffffff" size={20} />}
              label="Spot Clean"
              color="#10b981"
              onPress={() => handleQuickAction("spot_clean")}
              testId="spot-clean-btn"
            />
            <QuickActionButton
              icon={<Square color="#ffffff" size={20} />}
              label="Full Sweep"
              color="#1e3a8a"
              onPress={() => handleQuickAction("full_sweep")}
              testId="full-sweep-btn"
            />
            <QuickActionButton
              icon={<Pause color="#ffffff" size={20} />}
              label="Pause"
              color="#f59e0b"
              onPress={() => handleQuickAction("pause")}
              testId="pause-btn"
            />
            <QuickActionButton
              icon={<Calendar color="#ffffff" size={20} />}
              label="Schedule"
              color="#8b5cf6"
              onPress={() => handleQuickAction("schedule")}
              testId="schedule-btn"
            />
          </View>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>24-Hour Performance</Text>
          <TrendChart />
        </View>
      </ScrollView>
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
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e3a8a",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#64748b",
    marginBottom: 16,
  },
  telemetryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 12,
  },
  lastCleanedCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    marginTop: 12,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lastCleanedText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#374151",
    fontWeight: "500",
  },
  quickActionsContainer: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  chartContainer: {
    marginTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});