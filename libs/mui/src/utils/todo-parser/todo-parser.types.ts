import type * as Appcraft from '@appcraft/types';

//* Variables
export type OutputData = { todo: string; alias: string; output: object };
export type OutputCollectEvent = Parameters<OutputCollectHandler>[0];

export type ExecuteOptions = {
  event: unknown[];
  outputs: OutputData[];
  onFetchTodoWrapper?: FetchTodoWrapperHandler;
};

export type IteratePrepare = {
  key: string | number;
  outputs: OutputData[];
};

export type IterateResult = Promise<[string | number, OutputData[]]>;

export type VariableOptions = Omit<ExecuteOptions, 'onFetchTodoWrapper'> & {
  mixedTypes?: Appcraft.TypesMapping;
};

//* Methods
export type GetEventHandler = (
  todos: Record<string, Appcraft.WidgetTodo>,
  options?: {
    defaultOutputs?: OutputData[];
    eventName?: string;
    onFetchTodoWrapper?: FetchTodoWrapperHandler;

    onOutputCollect?: (
      e: {
        duration: number;
        outputs: OutputData[];
        todos: Record<string, Appcraft.WidgetTodo>;
      },
      name?: string
    ) => void;
  }
) => (...event: unknown[]) => Promise<OutputData[]>;

export type OutputCollectHandler = Required<
  Required<Parameters<GetEventHandler>>[1]
>['onOutputCollect'];

export type FetchTodoWrapperHandler = (
  todosId: string
) => Promise<Record<string, Appcraft.WidgetTodo>>;
