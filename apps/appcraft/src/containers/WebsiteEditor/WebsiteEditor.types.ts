import type { ComponentProps } from 'react';
import type { ConfigData, Website } from '@appcraft/types';

import { ResponsiveDrawer } from '~appcraft/styles';
import type { Breadcrumb } from '~appcraft/hooks';
import type { NodePickerFn } from '~appcraft/hooks/common';

export interface WebsiteEditorProps {
  data: ConfigData<Website, string>;

  onActionNodePick?: NodePickerFn<'expand' | 'add' | 'reset' | 'save'>;
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
