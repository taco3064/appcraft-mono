import type * as Appcraft from '@appcraft/types';

//* Variables
export type OutputData = { todo: string; alias: string; output: object };
export type OutputCollectEvent = Parameters<OutputCollectHandler>[0];

export type IteratePrepare = {
  key: string | number;
  outputs: OutputData[];
};

export type IterateResult = Promise<[string | number, OutputData[]]>;

export type VariableOptions = Omit<
  Parameters<Execute>[2],
  'onFetchTodoWrapper' | 'onStateChange'
> & {
  mixedTypes?: Appcraft.TypesMapping;
};

//* Methods
export type GetEventHandler = (
  todos: Record<string, Appcraft.WidgetTodo>,
  options?: {
    defaultOutputs?: OutputData[];
    eventName?: string;
    onFetchTodoWrapper?: FetchTodoWrapperHandler;
    onStateChange?: (e: Record<string, unknown>) => void;

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

export type FetchTodoWrapperHandler = (
  todosId: string
) => Promise<Record<string, Appcraft.WidgetTodo>>;

export type OutputCollectHandler = Required<
  Required<Parameters<GetEventHandler>>[1]
>['onOutputCollect'];

export type StateChangeHandler = Required<
  Required<Parameters<GetEventHandler>>[1]
>['onStateChange'];

export type Execute = (
  todos: Record<string, Appcraft.WidgetTodo>,
  todo: Appcraft.WidgetTodo,
  options: {
    event: unknown[];
    outputs: OutputData[];
    onFetchTodoWrapper?: FetchTodoWrapperHandler;
    onStateChange?: StateChangeHandler;
  }
) => Promise<OutputData[]>;
