import type { TypesMapping } from '../services/config.types';
import type { TypesParseOptions } from './prop-types-def.types';

enum Category {
  config,
  node,
  plainText,
}

type Nodes<
  E extends string[] = [],
  N extends string[] = [],
  P extends string[] = []
> = Partial<
  Record<E[number], NodeWidget> &
    Record<N[number], NodeWidget[]> &
    Record<P[number], PlainTextWidget>
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
