import type * as Appcraft from '@appcraft/mui';
import type { WidgetOptions } from '@appcraft/types';

import type { Breadcrumb, NodePickerFn } from '~appcraft/hooks';
import type { ConfigData } from '~appcraft/services';
import type { PersistentDrawerContentProps } from '~appcraft/components';

export type WidgetMap = Map<
  string,
  Pick<Appcraft.CraftedWidgetEditorProps, 'typeFile' | 'typeName'>
>;

export type EditedValuesHook = (data: WidgetEditorProps['data']) => {
  values: Appcraft.CraftedRendererProps['options'];
  widget?: WidgetOptions;
  onEditingChange: (editingId?: string) => void;
  onReset: () => void;
  onWidgetAdd: (id: string) => void;
  onWidgetChange: (propPath: string, value: unknown) => void;
};

export interface WidgetEditorProps {
  data: ConfigData<Partial<Appcraft.CraftedRendererProps['options']>, string>;
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
