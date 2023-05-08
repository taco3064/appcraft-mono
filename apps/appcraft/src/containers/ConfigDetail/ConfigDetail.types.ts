import type { ReactNode } from 'react';
import type { TypesEditorProps } from '@appcraft/mui';

import type { Breadcrumb } from '~appcraft/hooks';
import type { ConfigData } from '~appcraft/services';

enum ActionType {
  reset,
  save,
}

export type ConfigDetailAction = Record<keyof typeof ActionType, ReactNode>;

export interface ConfigDetailProps<C extends object>
  extends Pick<TypesEditorProps, 'typeFile' | 'typeName'> {
  data: ConfigData<Partial<C>, string>;
  onActionNodePick?: (nodes: ConfigDetailAction) => Partial<ConfigDetailAction>;
  onSave?: () => void;

  superiors: {
    names: Record<string, string>;
    breadcrumbs: Breadcrumb[];
  };
}
