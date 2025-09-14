import { useState } from "react";

export interface HistoryItem {
  id: string;
  date: string;
  time: string;
  type: "spot_clean" | "row_clean" | "full_sweep";
  duration: string;
  water_used: number;
  energy_used: number;
  result: "success" | "failed" | "partial";
  reason?: string;
}

export function useHistory() {
  const [history] = useState<HistoryItem[]>([
    {
      id: "1",
      date: "2024-01-15",
      time: "06:30",
      type: "full_sweep",
      duration: "45 min",
      water_used: 12.5,
      energy_used: 2.3,
      result: "success",
    },
    {
      id: "2",
      date: "2024-01-14",
      time: "12:15",
      type: "spot_clean",
      duration: "8 min",
      water_used: 2.1,
      energy_used: 0.4,
      result: "success",
    },
    {
      id: "3",
      date: "2024-01-13",
      time: "06:30",
      type: "full_sweep",
      duration: "32 min",
      water_used: 9.8,
      energy_used: 1.9,
      result: "partial",
      reason: "Low water level",
    },
    {
      id: "4",
      date: "2024-01-12",
      time: "14:20",
      type: "row_clean",
      duration: "0 min",
      water_used: 0,
      energy_used: 0,
      result: "failed",
      reason: "Communication error",
    },
  ]);

  const exportData = async () => {
    console.log("Exporting history data...");
    // Simulate export functionality
    const csvData = history.map(item => 
      `${item.date},${item.time},${item.type},${item.duration},${item.water_used},${item.energy_used},${item.result},${item.reason || ""}`
    ).join("\n");
    
    console.log("CSV Data:", csvData);
  };

  return { history, exportData };
}