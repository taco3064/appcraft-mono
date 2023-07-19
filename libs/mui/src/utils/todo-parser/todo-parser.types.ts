import type * as Appcraft from '@appcraft/types';

//* Variables
export type FetchTodoWrap = (
  todosId: string
) => Promise<Record<string, Appcraft.WidgetTodo>>;

export type OuputData = { id: string; output: object };

export type ExecuteOptions = {
  event: unknown[];
  outputs: OuputData[];
  fetchTodoWrap?: FetchTodoWrap;
};

export type IteratePrepare = {
  key: string | number;
  outputs: OuputData[];
};

export type IterateResult = Promise<[string | number, OuputData[]]>;

export type VariableOptions = Omit<ExecuteOptions, 'fetchTodoWrap'> & {
  mixedTypes?: Appcraft.TypesMapping;
};

//* Methods
export type GetEventHandler = (
  options: Record<string, Appcraft.WidgetTodo>,
  fetchTodoWrap?: FetchTodoWrap
) => (...event: unknown[]) => Promise<OuputData[][]>;
