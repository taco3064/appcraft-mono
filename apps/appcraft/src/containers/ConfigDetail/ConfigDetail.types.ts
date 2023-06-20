import type { ConfigData, ConfigOptions } from '@appcraft/types';
import type { ReactNode } from 'react';

import type { Breadcrumb, NodePickerFn } from '~appcraft/hooks';

export interface ConfigDetailProps {
  data: ConfigData<ConfigOptions, string>;
  header?: ReactNode;
  typeFile: string;
  typeName: string;
  onActionNodePick?: NodePickerFn<'reset' | 'save'>;
  onSave?: () => void;

  superiors: {
    names: Record<string, string>;
    breadcrumbs: Breadcrumb[];
  };
}

export type ConfigValuesHook = (
  options: Pick<ConfigDetailProps, 'data' | 'typeFile' | 'typeName' | 'onSave'>
) => {
  values: ConfigOptions;
  onChange: (values: ConfigOptions) => void;
  onReset: () => void;
  onSave: () => void;
};
