import type { LayoutWidget } from '@appcraft/types';
import type { ReactNode } from 'react';

export type GridActionRenderer = (
  layout: LayoutWidget,
  withActionClose: (fn?: () => void) => () => void
) => ReactNode;

export interface GridActionProps {
  action?: GridActionRenderer;
  layout: LayoutWidget;
}
