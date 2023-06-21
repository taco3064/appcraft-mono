import type { ConfigData, ConfigOptions } from '@appcraft/types';

export interface ConfigValueOptions {
  data: ConfigData<ConfigOptions, string>;
  typeFile: string;
  typeName: string;
  onSave?: () => void;
}

export type ConfigValuesHook = (options: ConfigValueOptions) => {
  values: ConfigOptions;
  onChange: (values: ConfigOptions) => void;
  onReset: () => void;
  onSave: () => void;
};
