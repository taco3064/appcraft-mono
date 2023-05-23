import type { PropTypesDef } from '@appcraft/types';

enum Categories {
  Display,
  Mixed,
  // Node,
  Pure,
}

export type Category = keyof typeof Categories;
export type GetOrderSeqFn = (type: PropTypesDef['type']) => number;
