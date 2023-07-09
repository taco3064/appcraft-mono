import type { AxiosRequestConfig } from 'axios';

//* Variable Definition
type Definition =
  | boolean
  | Date
  | number
  | string
  | Definition[]
  | { [key: string]: Definition };

type ExtractTodoResult = {
  sourceType: 'input' | 'superior' | 'todo';
  key: string;
  path?: string;
};

type VariableInitialMode = 'define' | 'extract';

type Variable<M extends VariableInitialMode, I> = {
  mode: M;
  template?: string; //* 使用 lodash template 讀取 inputs 建立初始值
} & (M extends 'extract' ? { initial: I } : { initial?: I });

//* Todo Events
type Todos = 'variable' | 'fetch' | 'branch' | 'iterate';

type BaseTodo<C extends Todos, P> = {
  category: C;
  id: string;
  description: string;
  defaultNextTodo?: string;
} & P;

export type VariableTodo = BaseTodo<
  'variable',
  {
    variables: Record<
      string,
      Variable<'define', Definition> | Variable<'extract', ExtractTodoResult>
    >;
  }
>;

export type FetchTodo = BaseTodo<
  'fetch',
  Required<Pick<AxiosRequestConfig, 'url' | 'method'>> & {
    headers?: Record<
      | 'Accept'
      | 'Content-Length'
      | 'User-Agent'
      | 'Content-Encoding'
      | 'Authorization',
      string
    >;

    data?: ExtractTodoResult;
  }
>;

export type ConditionBranchTodo = BaseTodo<
  'branch',
  {
    sources: Omit<Variable<'extract', ExtractTodoResult>, 'template'>[];
    template: string; //* 使用 lodash template 進行判斷
    metTodo: string;
  }
>;

export type IterateTodo = BaseTodo<
  'iterate',
  {
    source: Omit<Variable<'extract', ExtractTodoResult>, 'template'>;
    iterateTodo: string;
  }
>;

export type WidgetTodo =
  | VariableTodo
  | FetchTodo
  | ConditionBranchTodo
  | IterateTodo;
