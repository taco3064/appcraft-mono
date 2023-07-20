import type { ReactNode } from 'react';
import type { CraftedTypeEditorProps } from '@appcraft/mui';
import type { ConfigOptions } from '@appcraft/types';

import type * as Hooks from '~appcraft/hooks';

export interface ConfigDetailProps
  extends Hooks.ConfigValueOptions,
    Pick<CraftedTypeEditorProps<ConfigOptions>, 'renderOverridePureItem'> {
  header?: ReactNode;
  onActionNodePick?: Hooks.NodePickerFn<'reset' | 'save'>;

  superiors: {
    names: Record<string, string>;
    breadcrumbs: Hooks.Breadcrumb[];
  };
}
