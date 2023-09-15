import type { MutableRefObject, ReactElement, ReactNode } from 'react';
import type { MainWidget } from '@appcraft/types';

type ChangeHandler = (widget: MainWidget) => void;

export interface SelectionContextValue {
  basePath: string;
  disabled: boolean;
  values?: MainWidget;
  actionRef?: MutableRefObject<ReactElement>;
  handleChangeRef?: MutableRefObject<ChangeHandler>;
}

export interface SelectionProviderProps {
  basePath: string;
  children: ReactNode;
  disabled?: boolean;
  action: ReactElement;
  values?: MainWidget;
  onChange: ChangeHandler;
}
