import type { ReactNode } from 'react';

import type { Breadcrumb } from '~appcraft/hooks';
import type { ConfigData } from '~appcraft/services';
import type { PersistentDrawerContentProps } from '~appcraft/components';

export type WidgetEditorAction = {
  expand: ReactNode;
  reset: ReactNode;
  save: ReactNode;
};

export interface WidgetEditorProps<C extends object> {
  data: ConfigData<Partial<C>, string>;
  onActionNodePick?: (nodes: WidgetEditorAction) => Partial<WidgetEditorAction>;

  PersistentDrawerContentProps?: Omit<
    PersistentDrawerContentProps,
    'DrawerProps' | 'drawer' | 'open' | 'onClose'
  >;

  superiors: {
    names: Record<string, string>;
    breadcrumbs: Breadcrumb[];
  };
}
