import type { CraftedWidgetEditorProps } from '@appcraft/mui';
import type { NodeWidget } from '@appcraft/types';

import type { Breadcrumb, NodePickerFn } from '~appcraft/hooks';
import type { ConfigData } from '~appcraft/services';
import type { PersistentDrawerContentProps } from '~appcraft/components';

export type WidgetMap = Map<string, Record<'typeFile' | 'typeName', string>>;

export type EditedWidgetHook = (data: WidgetEditorProps['data']) => Pick<
  CraftedWidgetEditorProps,
  'onWidgetChange'
> & {
  widget?: NodeWidget;
  onReset: () => void;
};

export interface WidgetEditorProps {
  data: ConfigData<Partial<NodeWidget>, string>;
  onActionNodePick?: NodePickerFn<'expand' | 'reset' | 'save'>;

  PersistentDrawerContentProps?: Omit<
    PersistentDrawerContentProps,
    'ContentProps' | 'DrawerProps' | 'content' | 'drawer' | 'open' | 'onClose'
  >;

  superiors: {
    names: Record<string, string>;
    breadcrumbs: Breadcrumb[];
  };
}
