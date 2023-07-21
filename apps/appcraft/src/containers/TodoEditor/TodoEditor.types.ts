import type { ComponentProps } from 'react';
import type { ConfigData, WidgetTodo } from '@appcraft/types';

import { PersistentDrawerContent } from '~appcraft/styles';
import type { Breadcrumb, NodePickerFn } from '~appcraft/hooks';

export interface TodoEditorProps {
  data: ConfigData<Record<string, WidgetTodo>, string>;
  onActionNodePick?: NodePickerFn<'run' | 'reset' | 'save'>;
  onSave?: () => void;

  superiors?: {
    names: Record<string, string>;
    breadcrumbs: Breadcrumb[];
  };

  PersistentDrawerContentProps?: Omit<
    ComponentProps<typeof PersistentDrawerContent>,
    'ContentProps' | 'DrawerProps' | 'content' | 'drawer' | 'open' | 'onClose'
  >;
}
