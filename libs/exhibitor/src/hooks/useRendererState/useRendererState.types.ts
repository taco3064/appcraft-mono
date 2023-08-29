import type * as Appcraft from '@appcraft/types';
import type { Dispatch } from 'react';

import { getEventHandler } from '../../utils';
import { useStateReducer } from '../common';
import type * as Util from '../../utils';
import type { ReducerAction, ReducerState } from '../common';

//* Variables
type Queue = { id: string; path?: string };
export type StateQueue = { state: Queue; superiors?: Queue[] };
export type TodosReturn = ReturnType<ReturnType<RendererStateHook>['todos']>;

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
    onPropsChange: Util.PropsChangeHandler;
    onStateChange: Dispatch<ReducerAction>;
  }
) => TodosReturn;

//* Custom Hooks
export type RendererStateHook = (
  ...args: Parameters<typeof useStateReducer>
) => {
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
};
