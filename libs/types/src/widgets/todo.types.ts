import type { AxiosRequestConfig } from 'axios';
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

export type Variables =
  | Variable<'define', Definition>
  | Variable<'extract', ExtractTodoResult>;

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
      source: Omit<Variable<'extract', ExtractTodoResult>, 'template'>;
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
