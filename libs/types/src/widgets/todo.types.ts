import type { AxiosRequestConfig } from 'axios';

//* Category Names
enum ConversionCategory {
  template,
  subTodos,
}

enum TodoEventCategory {
  convert,
  define,
  evaluate,
  fetch,
}

enum VariableCategory {
  arr,
  bool,
  date,
  num,
  obj,
  str,
}

//* Conversion
type BaseConversion<C extends keyof typeof ConversionCategory, O> = {
  category: C;
  target: string; //* 轉換目標的參數路徑
  alias: string; //* 轉換後的參數名稱
} & O;

export type TemplateConversion = BaseConversion<
  'template',
  { template?: string }
>;

export type SubTodosConversion<C extends Conversion[] = []> = BaseConversion<
  'subTodos',
  { todos: ConvertTodoEvent<C>[] }
>;

export type Conversion = TemplateConversion | SubTodosConversion;

//* Evaluation
export interface Evaluation {
  target: string; //* 目標進行判斷的參數路徑
  source: string | DefineTodoEvent; //* 比對來源參數的路徑或是定義事件
  todo: ConvertTodoEvent | DefineTodoEvent | FetchTodoEvent; //* 比對成功後要執行的事件
}

//* Events
type BaseTodoEvent<
  C extends keyof typeof TodoEventCategory,
  Output,
  Options
> = {
  category: C;
  description?: string;
  output?: Output;
  inputs?: Record<string, keyof typeof VariableCategory> & {
    default?: keyof typeof VariableCategory;
  };
} & Options;

export type ConvertTodoEvent<C extends Conversion[] = []> = BaseTodoEvent<
  'convert',
  Record<C[number]['alias'], unknown>,
  {
    conversions: C;
  }
>;

export type DefineTodoEvent<T extends keyof typeof VariableCategory = 'str'> =
  BaseTodoEvent<
    'define',
    T extends 'arr'
      ? Array<unknown>
      : T extends 'bool'
      ? boolean
      : T extends 'date'
      ? Date
      : T extends 'num'
      ? number
      : T extends 'obj'
      ? Record<string, unknown>
      : T extends 'str'
      ? string
      : never,
    {
      initial?: string;
      type: T;
    }
  >;

export type EvaluateTodoEvent = BaseTodoEvent<
  'evaluate',
  Evaluation['todo'],
  {
    evaluation: Evaluation[];
  }
>;

export type FetchTodoEvent<Output = unknown> = BaseTodoEvent<
  'fetch',
  Output,
  Pick<AxiosRequestConfig, 'url' | 'method'> & {
    headers?: Record<
      | 'Accept'
      | 'Content-Length'
      | 'User-Agent'
      | 'Content-Encoding'
      | 'Authorization',
      string
    >;
  }
>;

export type TodoEvent =
  | ConvertTodoEvent
  | DefineTodoEvent
  | EvaluateTodoEvent
  | FetchTodoEvent;
