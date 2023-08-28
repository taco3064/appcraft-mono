import type { WidgetTodo } from '@appcraft/types';
import type * as Exhibitor from '@appcraft/exhibitor';

import type { TodoEdge } from '../../utils';

export type GetSourceTodos = (
  todoid: string,
  edges: TodoEdge[],
  result?: Set<string>
) => string[];

export type LazyTodoOutputsHookArgs<T> = [
  Record<string, WidgetTodo>, //* todos
  TodoEdge[], //* edges
  string, //* todoid
  {
    onFetchData: Exhibitor.FetchDataHandler;
    onFetchTodoWrapper: Exhibitor.FetchTodoWrapperHandler;
  },
  T
];
