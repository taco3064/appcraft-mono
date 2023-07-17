import type { ReactNode } from 'react';
import type { RootNodeWidget } from '@appcraft/types';

import type { PropPaths } from '../../utils';

export interface ConstructContextValue {
  paths: PropPaths;
  widget?: RootNodeWidget;
  onWidgetChange: (widget: RootNodeWidget) => void;
}

export interface ConstructProviderProps extends ConstructContextValue {
  children: ReactNode;
}
