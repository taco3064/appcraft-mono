import { TFunction } from 'i18next';

export interface SettingState {
  tokens: Record<'id' | 'access', string | null>;

  lng: string;
  getFixedT: (namespace: string) => TFunction<string, string>;
  setLng: (lng: string) => void;
}

export type FixedTHook = <O extends object>(
  ...namespaces: string[]
) => ((key: string, options?: O) => string)[];

export type UserAutTokensHook = () => {
  authorized: boolean;
  tokens: SettingState['tokens'];
};

export type SettingModifiedHook = () => Pick<SettingState, 'lng' | 'setLng'>;
