import type { MainWidget } from '@appcraft/types';
import type { BaseOption } from '../index.types';

//* Custom Hooks
export type PathOptionsHook = (
  states: Omit<MainWidget['state'], 'todos'>,
  stateType?: 'public' | 'private'
) => BaseOption[];
