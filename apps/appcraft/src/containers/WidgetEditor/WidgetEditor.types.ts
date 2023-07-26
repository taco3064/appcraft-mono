import type { ComponentProps } from 'react';
import type { ConfigData, RootNodeWidget } from '@appcraft/types';

import { PersistentDrawerContent } from '~appcraft/styles';
import type { Breadcrumb, NodePickerFn } from '~appcraft/hooks';
import type { WrapTodoSelectProps } from '../common';

export interface WidgetEditorProps {
  data: ConfigData<RootNodeWidget, string>;
  onActionNodePick?: NodePickerFn<'expand' | 'reset' | 'save'>;
  onWrapTodoView?: WrapTodoSelectProps['onTodoView'];
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
