import type { ReactNode } from 'react';
import type { RootNodeWidget } from '@appcraft/types';

export type PropPaths = (string | number)[];

export interface ConstructContextValue {
  paths: PropPaths;
  widget?: RootNodeWidget;
  onWidgetChange: (widget: RootNodeWidget) => void;
}

export interface ConstructProviderProps extends ConstructContextValue {
  children: ReactNode;
}
