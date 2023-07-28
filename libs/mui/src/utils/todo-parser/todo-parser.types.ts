import type * as Appcraft from '@appcraft/types';

//* Variables
export type OutputData = { todo: string; alias: string; output: object };

export type OutputCollectEvent = {
  duration: number;
  outputs: OutputData[][];
  todos: Record<string, Appcraft.WidgetTodo>;
};

export type OutputCollectHandler = (
  e: OutputCollectEvent,
  name?: string
) => void;

export type FetchTodoWrap = (
  todosId: string
) => Promise<Record<string, Appcraft.WidgetTodo>>;

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
  todos: Record<string, Appcraft.WidgetTodo>,
  options?: {
    eventName?: string;
    fetchTodoWrap?: FetchTodoWrap;
    onOutputCollect?: OutputCollectHandler;
  }
) => (...event: unknown[]) => Promise<OutputData[][]>;
