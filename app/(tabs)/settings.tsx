import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Smartphone,
  Bell,
  Wifi,
  User,
  Shield,
  HelpCircle,
  LogOut,
} from "lucide-react-native";
import { SettingsSection } from "@/components/SettingsSection";
import { SettingsItem } from "@/components/SettingsItem";
import { useSettings } from "@/hooks/useSettings";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";

export default function SettingsScreen() {
  const { settings, updateSetting } = useSettings();
  const { signOut, user } = useAuth();
  const insets = useSafeAreaInsets();

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await signOut();
            router.replace('/auth/welcome');
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Configure your TechSense experience</Text>
        </View>

        <SettingsSection title="Devices" icon={<Smartphone color="#1e3a8a" size={20} />}>
          <SettingsItem
            title="Solar Site Alpha"
            subtitle="Device ID: TSC-001 • Connected"
            onPress={() => console.log("Device settings")}
            showChevron
          />
          <SettingsItem
            title="Add New Device"
            subtitle="Scan QR code or enter device ID"
            onPress={() => console.log("Add device")}
            showChevron
          />
        </SettingsSection>

        <SettingsSection title="Notifications" icon={<Bell color="#f59e0b" size={20} />}>
          <SettingsItem
            title="Error Alerts"
            subtitle="Get notified of system errors"
            rightComponent={
              <Switch
                value={settings.notifications.errors}
                onValueChange={(value) =>
                  updateSetting("notifications", { ...settings.notifications, errors: value })
                }
                trackColor={{ false: "#d1d5db", true: "#10b981" }}
                thumbColor="#ffffff"
              />
            }
          />
          <SettingsItem
            title="Cycle Completion"
            subtitle="Cleaning cycle finished notifications"
            rightComponent={
              <Switch
                value={settings.notifications.completion}
                onValueChange={(value) =>
                  updateSetting("notifications", { ...settings.notifications, completion: value })
                }
                trackColor={{ false: "#d1d5db", true: "#10b981" }}
                thumbColor="#ffffff"
              />
            }
          />
          <SettingsItem
            title="Low Water Alerts"
            subtitle="Water level below threshold"
            rightComponent={
              <Switch
                value={settings.notifications.lowWater}
                onValueChange={(value) =>
                  updateSetting("notifications", { ...settings.notifications, lowWater: value })
                }
                trackColor={{ false: "#d1d5db", true: "#10b981" }}
                thumbColor="#ffffff"
              />
            }
          />
          <SettingsItem
            title="Maintenance Reminders"
            subtitle="Brush wear and consumable alerts"
            rightComponent={
              <Switch
                value={settings.notifications.maintenance}
                onValueChange={(value) =>
                  updateSetting("notifications", { ...settings.notifications, maintenance: value })
                }
                trackColor={{ false: "#d1d5db", true: "#10b981" }}
                thumbColor="#ffffff"
              />
            }
          />
        </SettingsSection>

        <SettingsSection title="Connectivity" icon={<Wifi color="#3b82f6" size={20} />}>
          <SettingsItem
            title="Connection Status"
            subtitle="WiFi • Signal: Strong"
            rightComponent={
              <View style={styles.statusIndicator}>
                <View style={[styles.statusDot, { backgroundColor: "#10b981" }]} />
              </View>
            }
          />
          <SettingsItem
            title="Data Usage"
            subtitle="Monitor telemetry data consumption"
            onPress={() => console.log("Data usage")}
            showChevron
          />
        </SettingsSection>

        <SettingsSection title="Account" icon={<User color="#8b5cf6" size={20} />}>
          <SettingsItem
            title="User"
            subtitle={user?.email || 'Not signed in'}
            rightComponent={
              <View style={styles.roleBadge}>
                <Text style={styles.roleText}>{user?.role || 'Guest'}</Text>
              </View>
            }
          />
          <SettingsItem
            title="Permissions"
            subtitle="Full system access"
            onPress={() => console.log("Permissions")}
            showChevron
          />
        </SettingsSection>

        <SettingsSection title="Security" icon={<Shield color="#ef4444" size={20} />}>
          <SettingsItem
            title="Auto-lock"
            subtitle="Lock app after inactivity"
            rightComponent={
              <Switch
                value={settings.security.autoLock}
                onValueChange={(value) =>
                  updateSetting("security", { ...settings.security, autoLock: value })
                }
                trackColor={{ false: "#d1d5db", true: "#10b981" }}
                thumbColor="#ffffff"
              />
            }
          />
          <SettingsItem
            title="Require Authentication"
            subtitle="Biometric or PIN for sensitive actions"
            rightComponent={
              <Switch
                value={settings.security.requireAuth}
                onValueChange={(value) =>
                  updateSetting("security", { ...settings.security, requireAuth: value })
                }
                trackColor={{ false: "#d1d5db", true: "#10b981" }}
                thumbColor="#ffffff"
              />
            }
          />
        </SettingsSection>

        <SettingsSection title="Support" icon={<HelpCircle color="#64748b" size={20} />}>
          <SettingsItem
            title="Help Center"
            subtitle="Documentation and guides"
            onPress={() => console.log("Help center")}
            showChevron
          />
          <SettingsItem
            title="Contact Support"
            subtitle="Get help from our team"
            onPress={() => console.log("Contact support")}
            showChevron
          />
          <SettingsItem
            title="App Version"
            subtitle="TechSense v1.0.0"
          />
        </SettingsSection>

        <View style={styles.signOutSection}>
          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <LogOut color="#ef4444" size={20} />
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
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
  statusIndicator: {
    alignItems: "center",
    justifyContent: "center",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  roleBadge: {
    backgroundColor: "#8b5cf6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  roleText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  signOutSection: {
    padding: 20,
    paddingBottom: 40,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ef4444',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  signOutText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});