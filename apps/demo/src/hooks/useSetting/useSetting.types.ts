import { TFunction } from 'i18next';

export interface SettingState {
  lng: string;
  getFixedT: (namespace: string) => TFunction<string, string>;
  setLng: (lng: string) => void;
}

export type FixedTHook = <O extends object>(
  ...namespaces: string[]
) => ((key: string, options?: O) => string)[];
