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
  'onFetchData' | 'onFetchTodoWrapper' | 'onStateChange'
> & {
  mixedTypes?: Appcraft.TypesMapping;
};

//* Methods
export type GetEventHandler = (
  todos: Record<string, Appcraft.WidgetTodo>,
  options: {
    defaultOutputs?: OutputData[];
    disableIgnoreOutput?: boolean;
    eventName?: string;

    onPropsChange?: (e: Record<string, Record<string, unknown>>) => void;
    onStateChange?: (e: Record<string, unknown>) => void;

    onFetchData: <R>(
      options: Pick<Appcraft.FetchTodo, 'url' | 'method' | 'headers'> & {
        data?: unknown;
      }
    ) => Promise<R>;

    onFetchTodoWrapper?: (
      todosId: string
    ) => Promise<Record<string, Appcraft.WidgetTodo>>;

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

export type FetchDataHandler = Required<
  Parameters<GetEventHandler>[1]
>['onFetchData'];

export type FetchTodoWrapperHandler = Required<
  Parameters<GetEventHandler>[1]
>['onFetchTodoWrapper'];

export type OutputCollectHandler = Required<
  Parameters<GetEventHandler>[1]
>['onOutputCollect'];

export type PropsChangeHandler = Required<
  Parameters<GetEventHandler>[1]
>['onPropsChange'];

export type StateChangeHandler = Required<
  Parameters<GetEventHandler>[1]
>['onStateChange'];

export type Execute = (
  todos: Record<string, Appcraft.WidgetTodo>,
  todo: Appcraft.WidgetTodo,
  options: {
    event: unknown[];
    outputs: OutputData[];
    onFetchData: FetchDataHandler;
    onFetchTodoWrapper?: FetchTodoWrapperHandler;
    onPropsChange?: PropsChangeHandler;
    onStateChange?: StateChangeHandler;
  }
) => Promise<OutputData[]>;
