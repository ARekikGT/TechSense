import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { TrendingUp } from "lucide-react-native";

const { width } = Dimensions.get("window");

export function TrendChart() {
  // Mock data for 24-hour trend
  const mockData = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    production: Math.random() * 100 + 50,
    cleaned: i === 6 || i === 14 ? true : false,
  }));

  const maxProduction = Math.max(...mockData.map(d => d.production));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TrendingUp color="#10b981" size={20} />
        <Text style={styles.title}>Production vs. Cleaning Events</Text>
      </View>
      
      <View style={styles.chart}>
        <View style={styles.yAxis}>
          <Text style={styles.axisLabel}>100W</Text>
          <Text style={styles.axisLabel}>50W</Text>
          <Text style={styles.axisLabel}>0W</Text>
        </View>
        
        <View style={styles.chartArea}>
          {mockData.map((point, index) => (
            <View key={index} style={styles.dataPoint}>
              <View
                style={[
                  styles.bar,
                  {
                    height: (point.production / maxProduction) * 80,
                    backgroundColor: point.cleaned ? "#10b981" : "#e2e8f0",
                  },
                ]}
              />
              {index % 6 === 0 && (
                <Text style={styles.xAxisLabel}>{point.hour}:00</Text>
              )}
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: "#10b981" }]} />
          <Text style={styles.legendText}>Cleaned</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: "#e2e8f0" }]} />
          <Text style={styles.legendText}>Normal</Text>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginLeft: 8,
  },
  chart: {
    flexDirection: "row",
    height: 120,
    marginBottom: 16,
  },
  yAxis: {
    justifyContent: "space-between",
    paddingRight: 8,
    width: 40,
  },
  axisLabel: {
    fontSize: 10,
    color: "#64748b",
  },
  chartArea: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  dataPoint: {
    alignItems: "center",
    flex: 1,
  },
  bar: {
    width: 8,
    backgroundColor: "#e2e8f0",
    borderRadius: 4,
    marginBottom: 4,
  },
  xAxisLabel: {
    fontSize: 10,
    color: "#64748b",
    marginTop: 4,
  },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: "#64748b",
  },
});