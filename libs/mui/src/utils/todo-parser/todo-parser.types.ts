import type * as Appcraft from '@appcraft/types';

//* Variables
export type FetchTodoWrap = (
  todosId: string
) => Promise<Record<string, Appcraft.WidgetTodo>>;

export type OutputData = { id: string; output: object };

export type ExecuteOptions = {
  event: unknown[];
  outputs: OutputData[];
  fetchTodoWrap?: FetchTodoWrap;
};

export type IteratePrepare = {
  key: string | number;
  outputs: OutputData[];
};

export type IterateResult = Promise<[string | number, OutputData[]]>;

export type VariableOptions = Omit<ExecuteOptions, 'fetchTodoWrap'> & {
  mixedTypes?: Appcraft.TypesMapping;
};

//* Methods
export type GetEventHandler = (
  options: Record<string, Appcraft.WidgetTodo>,
  fetchTodoWrap?: FetchTodoWrap
) => (...event: unknown[]) => Promise<OutputData[][]>;
