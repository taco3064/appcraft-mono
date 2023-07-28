import type { ComponentProps } from 'react';
import type { ConfigData, RootNodeWidget } from '@appcraft/types';
import type { OutputCollectHandler } from '@appcraft/mui';

import { PersistentDrawerContent } from '~appcraft/styles';
import type { Breadcrumb, NodePickerFn } from '~appcraft/hooks';
import type { TodoWrapperSelectProps, WidgetSelectProps } from '../common';

export interface WidgetEditorProps {
  data: ConfigData<RootNodeWidget, string>;

  onActionNodePick?: NodePickerFn<'expand' | 'reset' | 'save'>;
  onOutputCollect?: OutputCollectHandler;
  onSave?: () => void;
  onTodoWrapperView?: TodoWrapperSelectProps['onView'];
  onWidgetWrapperView?: WidgetSelectProps['onView'];

  superiors?: {
    names: Record<string, string>;
    breadcrumbs: Breadcrumb[];
  };

  PersistentDrawerContentProps?: Omit<
    ComponentProps<typeof PersistentDrawerContent>,
    'ContentProps' | 'DrawerProps' | 'content' | 'drawer' | 'open' | 'onClose'
  >;
}
