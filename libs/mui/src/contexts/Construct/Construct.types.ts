import type { ReactNode } from 'react';
import type { RootNodeWidget } from '@appcraft/types';

export interface ConstructContextValue {
  widget?: RootNodeWidget;
  onWidgetChange: (widget: RootNodeWidget) => void;
}

export interface ConstructProviderProps extends ConstructContextValue {
  children: ReactNode;
}
