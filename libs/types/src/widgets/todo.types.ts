import type { TypesMapping } from './prop-types-def.types';

//* Variable Definition
export type Definition =
  | boolean
  | Date
  | number
  | string
  | Definition[]
  | { [key: string]: Definition };

type ExtractTodoResult = {
  source: 'event' | 'output';
  path: string;
};

type VariableInitialMode = 'define' | 'extract';

type Variable<M extends VariableInitialMode, I> = {
  mode: M;
  template?: string; //* 使用 lodash template 讀取 inputs 建立初始值
} & (M extends 'extract' ? { initial: I } : { initial?: I });

export type DefineVariable = Variable<'define', Definition>;
export type ExtractVariable = Variable<'extract', ExtractTodoResult>;
export type Variables = DefineVariable | ExtractVariable;

//* Todo Events
type Todos = 'variable' | 'fetch' | 'branch' | 'iterate' | 'wrap' | 'state';

type BaseTodo<C extends Todos, P> = {
  category: C;
  id: string;
  alias: string;
  description: string;
  defaultNextTodo?: string;
  ignoreOutput?: boolean;
  mixedTypes?: TypesMapping;
} & P;

export type VariableTodo = BaseTodo<
  'variable',
  {
    variables: Record<string, Variables>;
  }
>;

export type FetchTodo = BaseTodo<
  'fetch',
  {
    url: string;
    method: 'GET' | 'DELETE' | 'POST' | 'PUT' | 'PATCH';
    data?: ExtractTodoResult;

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

export type ConditionBranchTodo = BaseTodo<
  'branch',
  {
    sources: ExtractTodoResult[];
    template: string; //* 使用 lodash template 進行判斷
    metTodo: string;
  }
>;

export type IterateTodo = BaseTodo<
  'iterate',
  {
    source: ExtractTodoResult;
    iterateTodo: string;
  }
>;

export type WrapTodo = BaseTodo<
  'wrap',
  {
    todosId: string;
  }
>;

export type SetStateTodo = BaseTodo<
  'state',
  {
    states: {
      source: ExtractTodoResult;
      state: string;
    }[];
  }
>;

export type WidgetTodo =
  | VariableTodo
  | FetchTodo
  | ConditionBranchTodo
  | IterateTodo
  | WrapTodo
  | SetStateTodo;
