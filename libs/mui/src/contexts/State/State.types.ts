import type { MutableRefObject, ReactElement, ReactNode } from 'react';
import type { RootNodeWidget } from '@appcraft/types';

type ChangeHandler = (widget: RootNodeWidget) => void;

export interface StateContextValue {
  basePath: string;
  values?: RootNodeWidget;
  toggleRef?: MutableRefObject<ReactElement>;
  handleChangeRef?: MutableRefObject<ChangeHandler>;
}

export interface StateProviderProps {
  basePath: string;
  children: ReactNode;
  toggle: ReactElement;
  values?: RootNodeWidget;
  onChange: ChangeHandler;
}
