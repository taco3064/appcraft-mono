import type { ConfigData, ConfigOptions } from '@appcraft/types';

export interface ConfigValueOptions {
  data: ConfigData<ConfigOptions, string>;
  typeFile: string;
  typeName: string;
  onSave?: () => void;
}

export type ConfigValuesHook = (options: ConfigValueOptions) => [
  ConfigOptions,
  {
    change: (values: ConfigOptions) => void;
    reset: () => void;
    save: () => void;
  }
];
