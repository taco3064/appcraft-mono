import type { MutableRefObject, ReactElement, ReactNode } from 'react';
import type { MainWidget, PropTypesDef, StateCategory } from '@appcraft/types';

import type { PropPaths, StateGenerator } from '../../utils';

//* Methods
type ChangeHandler = (widget: MainWidget) => void;

export type SecondaryActionRenderer<M = unknown> = (options: {
  basePath: string;
  widget?: MainWidget;
  metadata?: M;
}) => ReactNode;

export type SelectHandler = (checked: boolean, options?: PropTypesDef) => void;

//* Custom Hooks
export interface SelectionContextValue {
  basePath: string;
  disabled: boolean;
  values?: MainWidget;
  ref?: MutableRefObject<
    Pick<SelectionProviderProps, 'action' | 'secondaryActions' | 'onChange'>
  >;
}

export type SelectionActionHook = () => ReactElement | null;

export type SecondaryActionHook = (
  category: StateCategory
) => SecondaryActionRenderer | undefined;

export type SelectionHook = (
  generator: StateGenerator,
  alias: string,
  propPath: PropPaths | string,
  options?: PropTypesDef
) => [boolean, ReactNode];

//* Provider Component Props
export interface SelectionProviderProps {
  action: ReactElement;
  basePath: string;
  children: ReactNode;
  disabled?: boolean;
  secondaryActions?: Partial<Record<StateCategory, SecondaryActionRenderer>>;
  values?: MainWidget;
  onChange: ChangeHandler;
}
