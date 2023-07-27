import type { ComponentProps } from 'react';
import type { ConfigData, RootNodeWidget } from '@appcraft/types';

import { PersistentDrawerContent } from '~appcraft/styles';
import type { Breadcrumb, NodePickerFn } from '~appcraft/hooks';
import type { WidgetSelectProps, WrapTodoSelectProps } from '../common';

export interface WidgetEditorProps {
  data: ConfigData<RootNodeWidget, string>;
  onActionNodePick?: NodePickerFn<'expand' | 'reset' | 'save'>;
  onSave?: () => void;
  onWrapTodoView?: WrapTodoSelectProps['onView'];
  onWrapWidgetView?: WidgetSelectProps['onView'];

  superiors?: {
    names: Record<string, string>;
    breadcrumbs: Breadcrumb[];
  };

  PersistentDrawerContentProps?: Omit<
    ComponentProps<typeof PersistentDrawerContent>,
    'ContentProps' | 'DrawerProps' | 'content' | 'drawer' | 'open' | 'onClose'
  >;
}
