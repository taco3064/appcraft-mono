import type { TypesParseOptions } from './prop-types-def.types';
import type { WidgetEvent } from './todo.types';

//* Category Names
enum OptionCategory {
  config,
  node,
  plainText,
}

//* Node & Structure
export type NodeType = 'element' | 'node';
export type ChildNodes = Record<string, NodeType>;
export type StructureNode<N extends string = string> = Record<N, ChildNodes>;

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
    todos?: Record<string, WidgetEvent[]>;
  }
>;

export interface RootNodeWidget extends NodeWidget {
  construct: Record<'state' | 'props', Record<string, string>>;
}

export type WidgetOptions = PlainTextWidget | NodeWidget;

//* Lazy Renderer Fn
export type LazyRenderer<D, R = Record<string, never>> = (
  options: R & {
    fetchData: D | null;
  }
) => JSX.Element;
