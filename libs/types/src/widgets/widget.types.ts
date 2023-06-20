import type { TypesParseOptions } from './prop-types-def.types';
import type { WidgetEvent } from './todo.types';

//* Category Names
enum OptionCategory {
  config,
  node,
  plainText,
}

export type NodeType = 'element' | 'node';

//* Node & Structure
type Nodes<E extends string[] = [], N extends string[] = []> = Partial<
  Record<E[number], WidgetOptions> & Record<N[number], WidgetOptions[]>
>;

export type WidgetChildren = Record<keyof Nodes, NodeType>;

export type WidgetStructure<N extends string = string> = Record<
  N,
  WidgetChildren
>;

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
    todos?: Record<string, WidgetEvent[]>;
  }
>;

export type NodeWidget = BaseOptions<
  'node',
  Omit<ConfigOptions, 'category'> & {
    type: string;
    nodes?: Nodes;
  }
>;

export interface RootNodeWidget extends NodeWidget {
  construct: Record<'state' | 'props', Record<string, string>>;
}

export type WidgetOptions = PlainTextWidget | NodeWidget;
