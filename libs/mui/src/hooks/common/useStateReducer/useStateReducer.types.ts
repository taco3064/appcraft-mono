import type * as Appcraft from '@appcraft/types';
import type { Dispatch } from 'react';

//* Variables
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

export type RendererOptions =
  | Appcraft.RootNodeWidget
  | {
      widget: Appcraft.RootNodeWidget;
    }[];

export type ReducerState = Record<string, StateOptions<Appcraft.StateCategory>>;

type ReducerAction = {
  id: string;
  path: string;
  value: unknown;
};

//* Hook
export type StateReducerHook = (
  options: RendererOptions
) => [ReducerState, Dispatch<ReducerAction>];

export type Reducer = (
  state: ReducerState,
  action: ReducerAction
) => ReducerState;
