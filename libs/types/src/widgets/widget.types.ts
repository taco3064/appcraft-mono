import type { TypesParseOptions } from './prop-types-def.types';
import type { NodeType, WidgetState } from './state.types';
import type { WidgetTodo } from './todo.types';

//* Variables
enum OptionCategory {
  config,
  node,
  plainText,
}

export type ChildNodes = Record<string, NodeType>;

export type NodeAndEventProps = {
  nodes: Record<string, ChildNodes>;
  events: Record<string, string[]>;
};

//* Options
type BaseOptions<C extends keyof typeof OptionCategory, P> = {
  category: C;
  description?: string;
} & P;

export type PlainTextWidget = BaseOptions<'plainText', { content: string }>;

export type ConfigOptions = BaseOptions<
  'config',
  Omit<TypesParseOptions, 'collectionPath'> & {
    props?: Record<string, unknown>;
  }
>;

export type NodeWidget = BaseOptions<
  'node',
  Omit<ConfigOptions, 'category'> & {
    type: string;
    nodes?: Record<string, WidgetOptions | WidgetOptions[]>;
    todos?: Record<string, Record<string, WidgetTodo>>;
  }
>;

export interface RootNodeWidget extends NodeWidget {
  state: Record<'props' | 'nodes' | 'todos', Record<string, WidgetState>>;
}

export type WidgetOptions = PlainTextWidget | NodeWidget;

//* Lazy Renderer Fn
export type LazyRenderer<D, R = Record<string, never>> = (
  options: R & {
    fetchData: D | null;
  }
) => JSX.Element;
