import type { WidgetState } from '@appcraft/types';

export type StateGenerator = 'props' | 'todos' | 'node' | 'element';

export type GetStateCategory = (
  generator: StateGenerator
) => WidgetState['category'];

export type GetInitailState = (
  generator: StateGenerator,
  alias: string
) => WidgetState;
