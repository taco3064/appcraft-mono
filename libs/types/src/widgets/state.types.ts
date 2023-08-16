import type { Definition } from './todo.types';
import type { TypesMapping } from './prop-types-def.types';
import type { WidgetTodo } from './todo.types';

type States = 'nodes' | 'props' | 'todos';
type StateType = 'private' | 'public';

export type NodeType = 'element' | 'node';

export type Template = {
  id: string;
  todos?: { [propPath: string]: Record<string, WidgetTodo> }; //* Record key is todo id
};

type BaseState<C extends States, P> = {
  category: C;
  type: StateType;
  alias: string;
  description?: string;
  mixedTypes?: TypesMapping;
} & P;

type BaseNode<T extends NodeType, V extends Definition> = {
  nodeType: T;
  defaultValue?: V;
  template?: Template;
};

export type PropsState = BaseState<
  'props',
  {
    defaultValue?: Definition;
  }
>;

export type TodosState = BaseState<
  'todos',
  {
    type: 'public';
  }
>;

export type ElementState = BaseState<
  'nodes',
  BaseNode<'element', string | { [key: string]: Definition }>
>;

export type NodeState = BaseState<
  'nodes',
  BaseNode<'node', string | Definition[]>
>;

export type EntityNodeStates = ElementState | NodeState;
export type WidgetState = ElementState | NodeState | PropsState | TodosState;
export type StateCategory = WidgetState['category'];
