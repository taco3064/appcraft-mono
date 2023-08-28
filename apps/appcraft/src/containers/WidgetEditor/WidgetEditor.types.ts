import type { ComponentProps } from 'react';
import type { ConfigData, MainWidget } from '@appcraft/types';
import type * as Exhibitor from '@appcraft/exhibitor';

import { ResponsiveDrawer } from '~appcraft/styles';
import type { Breadcrumb, NodePickerFn } from '~appcraft/hooks';
import type { TodoWrapperSelectProps, WidgetSelectProps } from '../common';

export type HandleFetchWrapper =
  Exhibitor.CraftedRendererProps['onFetchWrapper'];

//* Component Props
export interface WidgetEditorProps {
  data: ConfigData<MainWidget, string>;

  onActionNodePick?: NodePickerFn<'expand' | 'reset' | 'save'>;
  onOutputCollect?: Exhibitor.OutputCollectHandler;
  onSave?: () => void;
  onTodoWrapperView?: TodoWrapperSelectProps['onView'];
  onWidgetWrapperView?: WidgetSelectProps['onView'];

  superiors?: {
    names: Record<string, string>;
    breadcrumbs: Breadcrumb[];
  };

  ResponsiveDrawerProps?: Omit<
    ComponentProps<typeof ResponsiveDrawer>,
    | 'ContentProps'
    | 'DrawerProps'
    | 'content'
    | 'disablePersistent'
    | 'drawer'
    | 'open'
    | 'onClose'
  >;
}
