import type * as Appcraft from '@appcraft/types';
import type { Dispatch } from 'react';

import { getEventHandler } from '../../../utils';

//* Variables
export type GeneratorSuperior = { id: string; path: string };
export type GetPropsResult = Required<Appcraft.NodeWidget>['props'];

export type HookReturn<M extends keyof ReturnType<GlobalStateHook>> =
  ReturnType<ReturnType<GlobalStateHook>[M]>;

export type RendererOptions =
  | Appcraft.RootNodeWidget
  | {
      widget: Appcraft.RootNodeWidget;
    }[];

export type StateOptions<
  C extends Appcraft.StateCategory,
  V = unknown
> = Record<
  string,
  {
    category: C;
    value: V;
    options: C extends 'props'
      ? Appcraft.PropsState
      : C extends 'todos'
      ? Appcraft.TodosState
      : Appcraft.ElementState | Appcraft.NodeState;
  }
>;

//* Hook
type ReducerAction = {
  id: string;
  path: string;
  value: unknown;
};

export type ReducerState = Record<string, StateOptions<Appcraft.StateCategory>>;

export type Reducer = (
  state: ReducerState,
  action: ReducerAction
) => ReducerState;

export type GlobalStateHook = (options: RendererOptions) => {
  change: Dispatch<ReducerAction>;

  getProps: (
    widget: Appcraft.NodeWidget,
    superiors: GeneratorSuperior[]
  ) => Required<Appcraft.NodeWidget>['props'];

  getTodos: (
    widget: Appcraft.NodeWidget,
    superiors: GeneratorSuperior[],
    options: Required<Parameters<typeof getEventHandler>>[1]
  ) => Record<string, ReturnType<typeof getEventHandler>>;
};

//* Methods
export type FetchWidgetHandler = (
  id: string
) => Promise<Appcraft.RootNodeWidget>;

export type GetSuperiorProps = (
  state: ReducerState,
  superiors: GeneratorSuperior[]
) => Record<string, unknown>;

export type GetSuperiorTodos = (
  state: ReducerState,
  superiors: GeneratorSuperior[]
) => Record<string, Parameters<typeof getEventHandler>[0][]>;
