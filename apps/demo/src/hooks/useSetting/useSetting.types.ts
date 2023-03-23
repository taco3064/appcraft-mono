import { TFunction } from 'i18next';

export interface SettingState {
  token: string | null;

  lng: string;
  getFixedT: (namespace: string) => TFunction<string, string>;
  setLng: (lng: string) => void;
}

export type FixedTHook = <O extends object>(
  ...namespaces: string[]
) => ((key: string, options?: O) => string)[];

export type UserAccountHook = () => {
  authorized: boolean;
  token: string;
};
