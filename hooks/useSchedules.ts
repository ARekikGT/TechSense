import { useState } from "react";

export interface Schedule {
  id: string;
  name: string;
  time: string;
  days: string[];
  type: "spot_clean" | "row_clean" | "full_sweep";
  enabled: boolean;
}

export interface Rule {
  id: string;
  name: string;
  description: string;
  type: "soiling" | "battery" | "weather";
  enabled: boolean;
  conditions: any;
}

export function useSchedules() {
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: "1",
      name: "Morning Auto-Clean",
      time: "06:30",
      days: ["Monday", "Wednesday", "Friday"],
      type: "full_sweep",
      enabled: true,
    },
    {
      id: "2",
      name: "Midday Spot Check",
      time: "12:00",
      days: ["Tuesday", "Thursday"],
      type: "spot_clean",
      enabled: false,
    },
  ]);

  const [rules, setRules] = useState<Rule[]>([
    {
      id: "1",
      name: "High Soiling Auto-Clean",
      description: "Clean when soiling > 35% and battery > 50%",
      type: "soiling",
      enabled: true,
      conditions: { soiling_threshold: 35, min_battery: 50 },
    },
    {
      id: "2",
      name: "Low Battery Protection",
      description: "Skip cleaning when battery < 30%",
      type: "battery",
      enabled: true,
      conditions: { min_battery: 30 },
    },
  ]);

  const toggleSchedule = (id: string) => {
    setSchedules(prev =>
      prev.map(schedule =>
        schedule.id === id ? { ...schedule, enabled: !schedule.enabled } : schedule
      )
    );
  };

  const toggleRule = (id: string) => {
    setRules(prev =>
      prev.map(rule =>
        rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
      )
    );
  };

  const addSchedule = (schedule: Schedule) => {
    setSchedules(prev => [...prev, schedule]);
  };

  return {
    schedules,
    rules,
    toggleSchedule,
    toggleRule,
    addSchedule,
  };
}