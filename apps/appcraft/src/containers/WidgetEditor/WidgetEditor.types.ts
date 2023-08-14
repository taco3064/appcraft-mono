import type { ComponentProps } from 'react';
import type { ConfigData, RootNodeWidget } from '@appcraft/types';
import type * as Appcraft from '@appcraft/mui';

import { ResponsiveDrawer } from '~appcraft/styles';
import type { Breadcrumb, NodePickerFn } from '~appcraft/hooks';
import type { TodoWrapperSelectProps, WidgetSelectProps } from '../common';

//* Variables
type OverrideRenderType = 'WIDGET_PICKER' | 'STATE_PICKER' | 'TODO_PICKER';

export type HandleFetchData = Appcraft.CraftedRendererProps['onFetchData'];

export type HandleFetchWrapper =
  Appcraft.CraftedRendererProps['onFetchWrapper'];

//* Methods
export type GetOverrideRenderType = (
  ...args: Parameters<Appcraft.CraftedWidgetEditorProps['renderOverrideItem']>
) => OverrideRenderType | void;

//* Component Props
export interface WidgetEditorProps {
  data: ConfigData<RootNodeWidget, string>;

  onActionNodePick?: NodePickerFn<'expand' | 'reset' | 'save'>;
  onOutputCollect?: Appcraft.OutputCollectHandler;
  onSave?: () => void;
  onTodoWrapperView?: TodoWrapperSelectProps['onView'];
  onWidgetWrapperView?: WidgetSelectProps['onView'];

  superiors?: {
    names: Record<string, string>;
    breadcrumbs: Breadcrumb[];
  };

  PersistentDrawerContentProps?: Omit<
    ComponentProps<typeof ResponsiveDrawer>,
    'ContentProps' | 'DrawerProps' | 'content' | 'drawer' | 'open' | 'onClose'
  >;
}
