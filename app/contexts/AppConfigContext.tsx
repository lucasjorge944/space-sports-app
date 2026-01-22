import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeMode = 'light' | 'dark';

interface AppConfig {
  themeMode: ThemeMode;
  notifyClassStart: boolean;
  notifyReservationStart: boolean;
}

interface AppConfigContextType {
  config: AppConfig;
  updateThemeMode: (mode: ThemeMode) => Promise<void>;
  updateNotifyClassStart: (enabled: boolean) => Promise<void>;
  updateNotifyReservationStart: (enabled: boolean) => Promise<void>;
  loading: boolean;
}

const AppConfigContext = createContext<AppConfigContextType | undefined>(
  undefined
);

const STORAGE_KEY = '@app_config';
const DEFAULT_CONFIG: AppConfig = {
  themeMode: 'light',
  notifyClassStart: true,
  notifyReservationStart: true,
};

export function AppConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setConfig({ ...DEFAULT_CONFIG, ...parsed });
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveConfig = async (newConfig: AppConfig) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
      setConfig(newConfig);
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
    }
  };

  const updateThemeMode = async (mode: ThemeMode) => {
    await saveConfig({ ...config, themeMode: mode });
  };

  const updateNotifyClassStart = async (enabled: boolean) => {
    await saveConfig({ ...config, notifyClassStart: enabled });
  };

  const updateNotifyReservationStart = async (enabled: boolean) => {
    await saveConfig({ ...config, notifyReservationStart: enabled });
  };

  return (
    <AppConfigContext.Provider
      value={{
        config,
        updateThemeMode,
        updateNotifyClassStart,
        updateNotifyReservationStart,
        loading,
      }}
    >
      {children}
    </AppConfigContext.Provider>
  );
}

export function useAppConfig() {
  const context = useContext(AppConfigContext);
  if (!context) {
    throw new Error('useAppConfig deve ser usado dentro de AppConfigProvider');
  }
  return context;
}
