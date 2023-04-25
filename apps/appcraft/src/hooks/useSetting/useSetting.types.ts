import type { TFunction } from 'i18next';
import type { ThemeOptions } from '@mui/material/styles';

export interface SettingState {
  tokens: Record<'id' | 'access', string | null>;

  lng: string;
  getFixedT: (namespace: string) => TFunction<string, string>;
  setLng: (lng: string) => void;

  theme: string;
  timestamp?: string;
  setTheme: (theme: string, timestamp?: string) => void;
}

export type FixedTHook = <O extends object>(
  ...namespaces: string[]
) => ((key: string, options?: O) => string)[];

export type UserAutTokensHook = () => {
  authorized: boolean;
  tokens: SettingState['tokens'];
};

export type SettingModifiedHook = () => Pick<
  SettingState,
  'lng' | 'setLng' | 'theme' | 'setTheme'
>;

export type ThemeStyleHook = () => ThemeOptions;
