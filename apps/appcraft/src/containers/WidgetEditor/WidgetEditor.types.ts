import type { ReactNode } from 'react';
import type { PersistentDrawerContentProps } from '~appcraft/components';

export type WidgetEditorAction = {
  expand: ReactNode;
  reset: ReactNode;
  save: ReactNode;
};

export interface WidgetEditorProps {
  PersistentDrawerContentProps?: Omit<
    PersistentDrawerContentProps,
    'DrawerProps' | 'drawer' | 'open' | 'onClose'
  >;
}
