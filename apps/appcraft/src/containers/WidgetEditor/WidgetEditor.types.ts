import type { ComponentProps } from 'react';
import type { ConfigData, MainWidget } from '@appcraft/types';
import type * as Exhibitor from '@appcraft/exhibitor';
import type * as Craftsman from '@appcraft/craftsman';

import { ResponsiveDrawer } from '~appcraft/styles';
import type { Breadcrumb, NodePickerFn } from '~appcraft/hooks';
import type { TodoWrapperSelectProps, WidgetSelectProps } from '../common';

//* Variables
type OverrideRenderType = 'WIDGET_PICKER' | 'STATE_PICKER' | 'TODO_PICKER';

export type HandleFetchData = Exhibitor.CraftedRendererProps['onFetchData'];

export type HandleFetchWrapper =
  Exhibitor.CraftedRendererProps['onFetchWrapper'];

//* Methods
export type GetOverrideRenderType = (
  ...args: Parameters<Craftsman.CraftedWidgetEditorProps['renderOverrideItem']>
) => OverrideRenderType | void;

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

  PersistentDrawerContentProps?: Omit<
    ComponentProps<typeof ResponsiveDrawer>,
    'ContentProps' | 'DrawerProps' | 'content' | 'drawer' | 'open' | 'onClose'
  >;
}
