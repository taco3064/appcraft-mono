import type { MutableRefObject, ReactElement, ReactNode } from 'react';
import type { MainWidget } from '@appcraft/types';

type ChangeHandler = (widget: MainWidget) => void;

export interface StateContextValue {
  basePath: string;
  disabled: boolean;
  values?: MainWidget;
  toggleRef?: MutableRefObject<ReactElement>;
  handleChangeRef?: MutableRefObject<ChangeHandler>;
}

export interface StateProviderProps {
  basePath: string;
  children: ReactNode;
  disabled?: boolean;
  toggle: ReactElement;
  values?: MainWidget;
  onChange: ChangeHandler;
}
