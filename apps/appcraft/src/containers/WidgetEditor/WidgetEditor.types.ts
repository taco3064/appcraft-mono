import type { NodePickerFn, TypesEditorProps } from '@appcraft/mui';
import type { WidgetOptions } from '@appcraft/types';

import type { Breadcrumb } from '~appcraft/hooks';
import type { ConfigData } from '~appcraft/services';
import type { PersistentDrawerContentProps } from '~appcraft/components';

export type WidgetMap = Map<
  string,
  Pick<TypesEditorProps, 'typeFile' | 'typeName'>
>;

export type EditedValuesHook = (data: WidgetEditorProps['data']) => {
  values: WidgetConfig;
  widget?: WidgetOptions;
  onEditingChange: (editingId?: string) => void;
  onReset: () => void;
  onWidgetAdd: (id: string) => void;
  onWidgetChange: (propPath: string, value: unknown) => void;
};

export interface WidgetConfig {
  widgets: WidgetOptions[];
}

export interface WidgetEditorProps {
  data: ConfigData<Partial<WidgetConfig>, string>;
  onActionNodePick?: NodePickerFn<'expand' | 'reset' | 'save'>;

  PersistentDrawerContentProps?: Omit<
    PersistentDrawerContentProps,
    'DrawerProps' | 'content' | 'drawer' | 'open' | 'onClose'
  >;

  superiors: {
    names: Record<string, string>;
    breadcrumbs: Breadcrumb[];
  };
}
