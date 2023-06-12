import type { TypesParseOptions } from './prop-types-def.types';

enum Category {
  config,
  node,
  plainText,
}

type Nodes<E extends string[] = [], N extends string[] = []> = Partial<
  Record<E[number], WidgetOptions> & Record<N[number], WidgetOptions[]>
>;

type BaseOptions<
  C extends keyof typeof Category,
  P extends Record<string, unknown>
> = {
  category: C;
  description?: string;
} & P;

export type ConfigOptions = BaseOptions<
  'config',
  Omit<TypesParseOptions, 'collectionPath'> & {
    type: string;
    props?: Record<string, unknown>;
    events?: Record<string, unknown>;
  }
>;

export type NodeWidget = BaseOptions<
  'node',
  Omit<ConfigOptions, 'category'> & { nodes?: Nodes }
>;

export type PlainTextWidget = BaseOptions<
  'plainText',
  {
    content: string;
  }
>;

export type WidgetOptions = PlainTextWidget | NodeWidget;
export type WidgetChildren = Record<keyof Nodes, 'element' | 'node'>;
export type WidgetStructure<N extends string> = Record<N, WidgetChildren>;
