import type { CraftedWidgetEditorProps } from '@appcraft/mui';
import type { WidgetOptions } from '@appcraft/types';

import type { Breadcrumb, NodePickerFn } from '~appcraft/hooks';
import type { ConfigData } from '~appcraft/services';
import type { PersistentDrawerContentProps } from '~appcraft/components';

export type WidgetMap = Map<
  string,
  Pick<CraftedWidgetEditorProps, 'typeFile' | 'typeName'>
>;

export type EditedValuesHook = (data: WidgetEditorProps['data']) => {
  values: WidgetOptions;
  widget?: WidgetOptions;
  onEditingChange: (editingId?: string) => void;
  onReset: () => void;
  onWidgetAdd: (id: string) => void;
  onWidgetChange: (propPath: string, value: unknown) => void;
};

export interface WidgetEditorProps {
  data: ConfigData<Partial<WidgetOptions>, string>;
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
