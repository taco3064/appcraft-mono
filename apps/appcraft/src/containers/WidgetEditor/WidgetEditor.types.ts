import type { ReactNode } from 'react';
import type { TypesEditorProps } from '@appcraft/mui';
import type { WidgetOptions } from '@appcraft/types';

import type { Breadcrumb } from '~appcraft/hooks';
import type { ConfigData } from '~appcraft/services';
import type { PersistentDrawerContentProps } from '~appcraft/components';

export type WidgetEditorAction = {
  expand: ReactNode;
  reset: ReactNode;
  save: ReactNode;
};

export type WidgetMap = Map<
  string,
  Pick<TypesEditorProps, 'typeFile' | 'typeName'>
>;

export interface WidgetConfig {
  widgets: WidgetOptions[];
}

export interface WidgetEditorProps {
  data: ConfigData<Partial<WidgetConfig>, string>;
  onActionNodePick?: (nodes: WidgetEditorAction) => Partial<WidgetEditorAction>;

  PersistentDrawerContentProps?: Omit<
    PersistentDrawerContentProps,
    'DrawerProps' | 'content' | 'drawer' | 'open' | 'onClose'
  >;

  superiors: {
    names: Record<string, string>;
    breadcrumbs: Breadcrumb[];
  };
}
