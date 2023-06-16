import type { ReactNode } from 'react';
import type { RootNodeWidget } from '@appcraft/types';

export type NodePath = string | number;

export interface ConstructContextValue {
  paths: NodePath[];
  widget?: RootNodeWidget;
  onWidgetChange: (widget: RootNodeWidget) => void;
}

export interface ConstructProviderProps extends ConstructContextValue {
  children: ReactNode;
}
