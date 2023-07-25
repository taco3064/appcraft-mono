import type { Definition } from './todo.types';

type States = 'nodes' | 'props' | 'todos';
type StateType = 'private' | 'public';
export type NodeType = 'element' | 'node';

type BaseState<C extends States, P> = {
  category: C;
  type: StateType;
  alias: string;
  description?: string;
} & P;

export type PropsState = BaseState<
  'props',
  {
    defaultValue?: Definition;
  }
>;

export type NodesState<N extends NodeType> = BaseState<
  'nodes',
  {
    nodeType: N;
    templateWidgetId: string;
    defaultValue?: N extends 'element'
      ? { [key: string]: Definition }
      : Definition[];
  }
>;

export type TodosState = BaseState<
  'todos',
  {
    type: 'public';
  }
>;

export type WidgetPropsState = Record<string, PropsState>;
export type WidgetTodosState = Record<string, TodosState>;

export type WidgetNodesState = Record<
  string,
  NodesState<'element'> | NodesState<'node'>
>;

export type WidgetState =
  | PropsState
  | NodesState<'element'>
  | NodesState<'node'>
  | TodosState;
