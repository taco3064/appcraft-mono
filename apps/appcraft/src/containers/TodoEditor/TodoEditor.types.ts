import type { ConfigData, WidgetTodo } from '@appcraft/types';

import type { Breadcrumb, NodePickerFn } from '~appcraft/hooks';
import type { PersistentDrawerContentProps } from '~appcraft/components';

export interface TodoEditorProps {
  data: ConfigData<Record<string, WidgetTodo>, string>;
  onActionNodePick?: NodePickerFn<'expand' | 'run' | 'reset' | 'save'>;
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
