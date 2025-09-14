import { useState } from "react";

export interface Settings {
  notifications: {
    errors: boolean;
    completion: boolean;
    lowWater: boolean;
    maintenance: boolean;
  };
  security: {
    autoLock: boolean;
    requireAuth: boolean;
  };
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>({
    notifications: {
      errors: true,
      completion: true,
      lowWater: true,
      maintenance: false,
    },
    security: {
      autoLock: false,
      requireAuth: true,
    },
  });

  const updateSetting = (category: keyof Settings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: value,
    }));
  };

  return { settings, updateSetting };
}