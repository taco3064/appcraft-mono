import type * as Appcraft from '@appcraft/types';
import type { Dispatch } from 'react';

import { getEventHandler } from '../../../utils';

//* Variables
export type GeneratorSuperior = { id: string; path: string };
export type GetPropsResult = Required<Appcraft.NodeWidget>['props'];
export type Templates = Map<string, Appcraft.RootNodeWidget>;

export type NodeResult = {
  widget: Appcraft.WidgetOptions;
  defaultProps?: object;
};

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
  action: ReducerAction | Templates
) => ReducerState;

export type GlobalStateHook = (
  options: RendererOptions,
  tempaltes: Templates
) => {
  change: Dispatch<ReducerAction>;

  getProps: (
    widget: Appcraft.NodeWidget
  ) => Required<Appcraft.NodeWidget>['props'];

  getTodos: (
    widget: Appcraft.NodeWidget,
    superiors: GeneratorSuperior[],
    options: Required<Parameters<typeof getEventHandler>>[1]
  ) => Record<string, ReturnType<typeof getEventHandler>>;

  getNodes: (
    widget: Appcraft.NodeWidget,
    superiors: GeneratorSuperior[],
    index?: number
  ) => Record<string, NodeResult | NodeResult[]>;
};

//* Methods
export type FetchWidgetHandler = (
  id: string
) => Promise<Appcraft.RootNodeWidget>;

export type GenerateReducerState = (widgets: Templates) => ReducerState;

export type GetSuperiorProps = (
  state: ReducerState,
  superiors: GeneratorSuperior[],
  index?: number
) => Record<string, unknown>;

export type GetSuperiorTodos = (
  state: ReducerState,
  superiors: GeneratorSuperior[]
) => Record<string, Parameters<typeof getEventHandler>[0][]>;
