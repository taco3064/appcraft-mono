import type { MainWidget } from '@appcraft/types';

//* Variables
export type BaseOption<V = string> = {
  value: V;
  primary: string;
  secondary: string;
};

//* Custom Hooks
export type PathOptionsHook = (
  states: Omit<MainWidget['state'], 'todos'>,
  stateType?: 'public' | 'private'
) => BaseOption[];
