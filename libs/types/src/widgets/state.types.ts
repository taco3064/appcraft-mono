import type { Definition } from './todo.types';
import type { TypesMapping } from './prop-types-def.types';

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

export type WidgetState =
  | PropsState
  | NodesState<'element'>
  | NodesState<'node'>
  | TodosState;
