import type { MainWidget } from '@appcraft/types';

//* Variables
export type BaseOption = {
  value: string;
  primary: string;
  secondary: string;
};

//* Custom Hooks
export type PathOptionsHook = (
  states: Omit<MainWidget['state'], 'todos'>,
  stateType?: 'public' | 'private'
) => BaseOption[];
