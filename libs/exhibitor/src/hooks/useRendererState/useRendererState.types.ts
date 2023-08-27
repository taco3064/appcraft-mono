import type * as Appcraft from '@appcraft/types';
import type { Dispatch } from 'react';

import { getEventHandler } from '../../utils';
import type * as Util from '../../utils';
import type { RendererOptions } from '../useGridLayouts';

//* Variables
type Queue = { id: string; path?: string };
export type ReadyOptions = Parameters<RendererStateHook>[2];
export type StateQueue = { state: Queue; superiors?: Queue[] };
export type WidgetMap = Map<string, Appcraft.MainWidget>;
export type TodosReturn = ReturnType<ReturnType<RendererStateHook>[1]['todos']>;

export type ReadyRef = [
  Parameters<RendererStateHook>[2][0],
  Parameters<RendererStateHook>[2][1] & {
    onPropsChange: Util.PropsChangeHandler;
  }
];

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
  tempaltes: WidgetMap,
  readyOptions: [
    (
      | undefined
      | Record<string, Appcraft.WidgetTodo>
      | ((onPropsChange: Util.PropsChangeHandler) => Promise<void>)
    ),
    Pick<
      Parameters<typeof getEventHandler>[1],
      'onFetchData' | 'onFetchTodoWrapper' | 'onOutputCollect'
    >
  ]
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
