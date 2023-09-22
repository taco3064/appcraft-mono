import type { ComponentProps } from 'react';
import type { ConfigData, Website } from '@appcraft/types';

import { ResponsiveDrawer } from '~appcraft/styles';
import type { Breadcrumb, NodePickerFn } from '~appcraft/hooks';

export interface WebsiteEditorProps {
  data: ConfigData<Website, string>;

  onActionBasePick?: NodePickerFn<'switch' | 'expand' | 'reset' | 'save'>;
  onActionAddPick?: NodePickerFn<'add'>;
  onSave?: () => void;

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
