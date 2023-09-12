import type * as Appcraft from '@appcraft/types';
import type { Dispatch } from 'react';

import type * as Util from '../../utils';

//* Variables
type BaseAction<T extends string, P = unknown> = { type: T; payload: P };
type StateChangeEvent = Parameters<Util.StateChangeHandler>[0];

type StateOptions<C extends Appcraft.StateCategory> = {
  category: C;
  renderPath: string;
  propPath: string;
  stateKey: string;
  options: StateType<C>;
  value: C extends 'todos' ? Record<string, Appcraft.WidgetTodo> : unknown;
};

export type InjectType<T extends Appcraft.StateCategory> = Required<
  Required<Appcraft.LayoutWidget['template']>[T]
>[string];

export type PendingStateOptions = {
  group: string;
  injection?: Appcraft.LayoutWidget['template'];
  renderPaths: string[];
  widget: Appcraft.MainWidget;
};

export type StateType<T extends Appcraft.StateCategory> = Required<
  Required<Appcraft.MainWidget['state']>[T]
>[string];

//* Methods
export type GetStateOptionsFn = (
  state: Appcraft.WidgetState,
  renderPaths: string[],
  propPath: string,
  override?: Required<
    Required<Appcraft.LayoutWidget['template']>[Appcraft.StateCategory]
  >[string]
) => StateOptions<Appcraft.StateCategory>;

export type ReadyHandler =
  | Record<string, Appcraft.WidgetTodo>
  | ((onPropsChange: Util.PropsChangeHandler) => Promise<void>);

//* Custom Hooks
export type GlobalState = Record<
  string, //* Group ID
  StateOptions<Appcraft.StateCategory>[]
>;

export type GlobalAction =
  | BaseAction<'setProps', Parameters<Util.PropsChangeHandler>[0]>
  | BaseAction<'setState', { group: string; values: StateChangeEvent }>
  | BaseAction<
      'initial',
      {
        pending: PendingStateOptions[];
        getWidgetOptions: Util.GetWidgetOptionsFn;
      }
    >;

export type GlobalStateContextValue = {
  globalState: GlobalState;
  pendingRef: React.RefObject<PendingStateOptions[]>;
  dispatch: Dispatch<GlobalAction>;
};

export type InitializePendingHook = () => (
  pending: PendingStateOptions
) => void;

export type GlobalStateHook = () => {
  onPropsChange: Util.PropsChangeHandler;
  onStateChange: (group: string, e: StateChangeEvent) => void;
  getGlobalState: (
    group: string,
    renderPaths: string[],
    injection?: Appcraft.LayoutWidget['template']
  ) => Pick<Appcraft.MainWidget, Appcraft.StateCategory>;
};

//* Component Props
export interface GlobalStateProviderProps {
  children: React.ReactNode;
  onReady?: ReadyHandler;
}
