import type * as Appcraft from '@appcraft/types';
import type { Dispatch } from 'react';

import type { GetWidgetOptionsFn } from '../Handles';
import type { StateChangeHandler } from '../../utils';

//* Variables
type Widget = Appcraft.MainWidget | Appcraft.EntityWidgets;
type StateChangeEvent = Parameters<StateChangeHandler>[0];
type BaseAction<T extends string, P = unknown> = { type: T; payload: P };

type StateOptions<C extends Appcraft.StateCategory> = {
  category: C;
  renderPath: string;
  propPath: string;
  options: StateType<C>;
  value: C extends 'todos' ? Record<string, Appcraft.WidgetTodo> : unknown;
};

export type InjectType<T extends Appcraft.StateCategory> = Required<
  Required<Appcraft.LayoutWidget['template']>[T]
>[string];

export type StateType<T extends Appcraft.StateCategory> = Required<
  Required<Appcraft.MainWidget['state']>[T]
>[string];

export type PendingStateOptions = {
  group: string;
  injection?: Appcraft.LayoutWidget['template'];
  renderPaths: string[];
  widget: Appcraft.MainWidget;
};

//* Methods
export type GetPropsByValueFn = (options: {
  value: unknown;
  state?: Appcraft.MainWidget['state']['props'];
}) => Appcraft.MainWidget['props'];

export type GetTodosByTemplateFn = (options: {
  template?: Appcraft.MainWidget['todos'];
  todos?: Appcraft.MainWidget['todos'];
  state?: Appcraft.MainWidget['state']['todos'];
}) => Appcraft.MainWidget['todos'];

export type GetNodeByValueFn = (
  widget: Appcraft.MainWidget | undefined,
  value: unknown,
  state: Appcraft.EntityNodeStates
) => Widget | Widget[];

//* Custom Hooks
export type GlobalState = Record<
  string, //* Group ID
  StateOptions<Appcraft.StateCategory>[]
>;

export type GlobalAction =
  | BaseAction<'setState', { group: string; values: StateChangeEvent }>
  | BaseAction<
      'initial',
      { pending: PendingStateOptions[]; getWidgetOptions: GetWidgetOptionsFn }
    >;

export type GlobalStateContextValue = {
  globalState: GlobalState;
  dispatch: Dispatch<GlobalAction>;
  pendingRef: React.RefObject<PendingStateOptions[]>;
};

export type InitializePendingHook = () => (
  pending: PendingStateOptions
) => void;

export type GlobalStateHook = () => {
  getGlobalState: (
    group: string,
    renderPaths: string[]
  ) => Pick<Appcraft.MainWidget, Appcraft.StateCategory>;
  onStateChange: (group: string, e: StateChangeEvent) => void;
};

//* Component Props
export interface GlobalStateProviderProps {
  children: React.ReactNode;
}
