import type { ReactNode } from 'react';

import type * as Hooks from '~appcraft/hooks';

export interface ConfigDetailProps extends Hooks.ConfigValueOptions {
  header?: ReactNode;
  onActionNodePick?: Hooks.NodePickerFn<'reset' | 'save'>;

  superiors: {
    names: Record<string, string>;
    breadcrumbs: Hooks.Breadcrumb[];
  };
}
