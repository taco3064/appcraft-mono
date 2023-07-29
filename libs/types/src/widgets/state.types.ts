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
    templateWidgetId: string;
    defaultValue?: { [key: string]: Definition };
  }
>;

export type NodeState = BaseState<
  'nodes',
  {
    nodeType: 'node';
    templateWidgetId?: string;
    defaultValue?: Definition[];
  }
>;

export type WidgetState = ElementState | NodeState | PropsState | TodosState;
export type StateCategory = WidgetState['category'];
