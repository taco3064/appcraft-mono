import type { LayoutWidget } from '@appcraft/types';
import type { ReactNode } from 'react';

export type GridActionRenderer = (
  layout: LayoutWidget,
  onClsoe: () => void
) => ReactNode;

export interface GridActionProps {
  action?: GridActionRenderer;
  layout: LayoutWidget;
}
