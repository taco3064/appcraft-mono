import type { MutableRefObject, ReactElement, ReactNode } from 'react';
import type { MainWidget, PropTypesDef } from '@appcraft/types';

import type { PropPaths, StateGenerator } from '../../utils';

//* Methods
type ChangeHandler = (widget: MainWidget) => void;

export type SelectHandler = (checked: boolean, options?: PropTypesDef) => void;

//* Custom Hooks
export interface SelectionContextValue {
  basePath: string;
  disabled: boolean;
  values?: MainWidget;
  ref?: MutableRefObject<{
    action: ReactElement;
    onChange: ChangeHandler;
  }>;
}

export type SelectionActionHook = () => ReactElement | null;

export type SelectionHook = (
  generator: StateGenerator,
  alias: string,
  propPath: PropPaths | string,
  options?: PropTypesDef
) => [boolean, ReactNode];

//* Provider Component Props
export interface SelectionProviderProps {
  basePath: string;
  children: ReactNode;
  disabled?: boolean;
  action: ReactElement;
  values?: MainWidget;
  onChange: ChangeHandler;
}
