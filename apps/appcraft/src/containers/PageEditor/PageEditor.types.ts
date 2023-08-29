import type { ComponentProps } from 'react';
import type { ConfigData } from '@appcraft/types';
import type * as Exhibitor from '@appcraft/exhibitor';

import { ResponsiveDrawer } from '~appcraft/styles';
import type * as Ctx from '~appcraft/contexts';
import type { Breadcrumb, NodePickerFn, PageData } from '~appcraft/hooks';

export interface PageEditorProps {
  data: ConfigData<PageData, string>;

  onActionNodePick?: NodePickerFn<'add' | 'ready' | 'reset' | 'save'>;
  onOutputCollect?: Exhibitor.OutputCollectHandler;
  onSave?: () => void;
  onTodoWrapperView?: Ctx.TodoWrapperViewHandler;
  onWidgetView?: Ctx.WidgetViewHandler;

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
