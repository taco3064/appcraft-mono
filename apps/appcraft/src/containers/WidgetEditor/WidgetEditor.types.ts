import type { ConfigData, RootNodeWidget } from '@appcraft/types';

import type { Breadcrumb, NodePickerFn } from '~appcraft/hooks';
import type { PersistentDrawerContentProps } from '~appcraft/components';

export interface WidgetEditorProps {
  data: ConfigData<RootNodeWidget, string>;
  onActionNodePick?: NodePickerFn<'expand' | 'reset' | 'save'>;
  onWrapTodoView?: (id: string) => void;
  onSave?: () => void;

  superiors?: {
    names: Record<string, string>;
    breadcrumbs: Breadcrumb[];
  };

  PersistentDrawerContentProps?: Omit<
    PersistentDrawerContentProps,
    'ContentProps' | 'DrawerProps' | 'content' | 'drawer' | 'open' | 'onClose'
  >;
}
