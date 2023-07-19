import type * as Appcraft from '@appcraft/types';

//* Variables
export type ExecuteRecord = {
  event: unknown[];
  output: Record<string, unknown>;
};

export type FetchTodoWrap = (
  todosId: string
) => Promise<Record<string, Appcraft.WidgetTodo>>;

//* Private
export type GetVariable = (
  variable: Appcraft.Variables,
  record: ExecuteRecord,
  mixedType?: string
) => unknown;

//* Methods
export type GetEventHandler = (
  options: Record<string, Appcraft.WidgetTodo>,
  fetchTodoWrap?: FetchTodoWrap
) => (...event: unknown[]) => Promise<ExecuteRecord['output']>;
