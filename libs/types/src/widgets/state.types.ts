import type { Definition } from './todo.types';
import type { TypesMapping } from './prop-types-def.types';
import type { WidgetTodo } from './todo.types';

type States = 'nodes' | 'props' | 'todos';
type StateType = 'private' | 'public';
export type NodeType = 'element' | 'node';

type BaseState<C extends States, P> = {
  category: C;
  type: StateType;
  alias: string;
  description?: string;
  mixedTypes?: TypesMapping;
} & P;

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
  {
    nodeType: 'element';
    defaultValue?: { [key: string]: Definition }; //* Props
    template?: {
      id: string;
      todos?: Record<string, Record<string, WidgetTodo>>;
    };
  }
>;

export type NodeState = BaseState<
  'nodes',
  {
    nodeType: 'node';
    defaultValue?: Definition[];
    template?: {
      id: string;
      todos?: Record<string, Record<string, WidgetTodo>>;
    };
  }
>;

export type WidgetState = ElementState | NodeState | PropsState | TodosState;
export type StateCategory = WidgetState['category'];
