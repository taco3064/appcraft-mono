import type { LayoutWidget } from '@appcraft/types';
import type { ReactNode } from 'react';

export type GridActionRenderer = (
  layout: LayoutWidget,

  withActionClose: (
    fn?: (...args: unknown[]) => unknown
  ) => (...args: unknown[]) => void
) => ReactNode;

export interface GridActionProps {
  action?: GridActionRenderer;
  layout: LayoutWidget;
}
