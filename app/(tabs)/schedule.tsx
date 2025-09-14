import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Plus, Clock, Zap, Battery } from "lucide-react-native";
import { ScheduleItem } from "@/components/ScheduleItem";
import { useSchedules } from "@/hooks/useSchedules";

export default function ScheduleScreen() {
  const { schedules, rules, toggleSchedule, toggleRule, addSchedule } = useSchedules();
  const insets = useSafeAreaInsets();

  const handleAddSchedule = () => {
    const newSchedule = {
      id: Date.now().toString(),
      name: "New Schedule",
      time: "06:30",
      days: ["Monday", "Wednesday", "Friday"],
      type: "full_sweep" as const,
      enabled: true,
    };
    addSchedule(newSchedule);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Schedule & Rules</Text>
          <Text style={styles.subtitle}>Automated cleaning management</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Scheduled Cleans</Text>
            <TouchableOpacity style={styles.addButton} onPress={handleAddSchedule}>
              <Plus color="#ffffff" size={20} />
            </TouchableOpacity>
          </View>

          {schedules.map((schedule) => (
            <ScheduleItem
              key={schedule.id}
              schedule={schedule}
              onToggle={() => toggleSchedule(schedule.id)}
            />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Smart Rules</Text>
          <Text style={styles.sectionDescription}>
            Automatic cleaning based on conditions
          </Text>

          {rules.map((rule) => (
            <View key={rule.id} style={styles.ruleCard}>
              <View style={styles.ruleHeader}>
                <View style={styles.ruleIcon}>
                  {rule.type === "soiling" && <Zap color="#f59e0b" size={20} />}
                  {rule.type === "battery" && <Battery color="#10b981" size={20} />}
                </View>
                <View style={styles.ruleInfo}>
                  <Text style={styles.ruleName}>{rule.name}</Text>
                  <Text style={styles.ruleDescription}>{rule.description}</Text>
                </View>
                <Switch
                  value={rule.enabled}
                  onValueChange={() => toggleRule(rule.id)}
                  trackColor={{ false: "#d1d5db", true: "#10b981" }}
                  thumbColor="#ffffff"
                />
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Next Scheduled Action</Text>
          <View style={styles.nextActionCard}>
            <Clock color="#1e3a8a" size={24} />
            <View style={styles.nextActionInfo}>
              <Text style={styles.nextActionTitle}>Morning Auto-Clean</Text>
              <Text style={styles.nextActionTime}>Tomorrow at 06:30</Text>
              <Text style={styles.nextActionType}>Full Sweep • Normal Power</Text>
            </View>
          </View>
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
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
  sectionDescription: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: "#1e3a8a",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  ruleCard: {
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
  ruleHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  ruleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f8fafc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  ruleInfo: {
    flex: 1,
  },
  ruleName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 2,
  },
  ruleDescription: {
    fontSize: 14,
    color: "#64748b",
  },
  nextActionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nextActionInfo: {
    marginLeft: 12,
    flex: 1,
  },
  nextActionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 2,
  },
  nextActionTime: {
    fontSize: 14,
    color: "#1e3a8a",
    fontWeight: "500",
    marginBottom: 2,
  },
  nextActionType: {
    fontSize: 12,
    color: "#64748b",
  },
});