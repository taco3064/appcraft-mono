import type { MutableRefObject, ReactNode } from 'react';
import type { RootNodeWidget } from '@appcraft/types';

type ChangeHandler = (widget: RootNodeWidget) => void;

export interface StateContextValue {
  basePath: string;
  values?: RootNodeWidget;
  handleChangeRef?: MutableRefObject<ChangeHandler>;
}

export interface StateProviderProps {
  basePath: string;
  children: ReactNode;
  values?: RootNodeWidget;
  onChange: ChangeHandler;
}
