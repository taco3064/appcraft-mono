import type { ComponentProps } from 'react';
import type { ConfigData, WidgetTodo } from '@appcraft/types';

import { ResponsiveDrawer } from '~appcraft/styles';
import type { Breadcrumb } from '~appcraft/hooks';
import type { NodePickerFn } from '~appcraft/hooks/common';

export interface TodoEditorProps {
  data: ConfigData<Record<string, WidgetTodo>, string>;
  logZIndex?: number;
  onActionNodePick?: NodePickerFn<'run' | 'reset' | 'save'>;
  onSave?: () => void;

  superiors?: {
    names: Record<string, string>;
    breadcrumbs: Breadcrumb[];
  };

  ResponsiveDrawerProps?: Omit<
    ComponentProps<typeof ResponsiveDrawer>,
    'ContentProps' | 'DrawerProps' | 'content' | 'drawer' | 'open' | 'onClose'
  >;
}
