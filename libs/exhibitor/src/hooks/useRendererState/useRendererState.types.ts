import type * as Appcraft from '@appcraft/types';
import type { Dispatch } from 'react';

import { getEventHandler } from '../../utils';
import type * as Util from '../../utils';

//* Variables
type Queue = { id: string; path?: string };
export type StateQueue = { state: Queue; superiors?: Queue[] };
export type WidgetMap = Map<string, Appcraft.MainWidget>;
export type RendererOptions = Appcraft.MainWidget | Appcraft.LayoutWidget[];

export type TodosReturn = ReturnType<ReturnType<RendererStateHook>[1]['todos']>;

//* Methods
export type GetSuperiorProps = (
  states: ReducerState,
  superiors?: Queue[]
) => Record<string, unknown>;

export type GetSuperiorTodos = (
  state: ReducerState,
  queue: StateQueue,
  handlers: {
    onFetchData: Util.FetchDataHandler;
    onFetchTodoWrapper: Util.FetchTodoWrapperHandler;
    onStateChange: Dispatch<ReducerAction>;
  }
) => TodosReturn;

//* Custom Hooks
export type ReducerState = Record<
  string,
  {
    [stateKey: string]: {
      category: Appcraft.StateCategory;
      value: unknown;
      propPath: string;
      options: Appcraft.WidgetState;
    };
  }
>;

export type ReducerAction = {
  id: string;
  values: Parameters<Util.StateChangeHandler>[0];
};

export type RendererStateHook = (
  options: RendererOptions,
  tempaltes: WidgetMap
) => [
  boolean,
  {
    props: (
      widget: Appcraft.NodeWidget,
      queue: StateQueue
    ) => Required<Appcraft.NodeWidget>['props'];

    todos: (
      widget: Appcraft.NodeWidget,
      queue: StateQueue,
      options: {
        onFetchData: Util.FetchDataHandler;
        onFetchTodoWrapper: Util.FetchTodoWrapperHandler;
      }
    ) => Record<
      string,
      {
        todos: Record<string, Appcraft.WidgetTodo>;
        handlers: ReturnType<typeof getEventHandler>[];
      }
    >;

    nodes: (
      widget: Appcraft.NodeWidget,
      queue: StateQueue
    ) => Record<string, Appcraft.EntityWidgets | Appcraft.EntityWidgets[]>;
  }
];
