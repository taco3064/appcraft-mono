import type { MainWidget } from '@appcraft/types';

//* Variables
export type PathOption = {
  value: string;
  primary: string;
  secondary: string;
};

//* Custom Hooks
export type PathOptionsHook = (
  states: Omit<MainWidget['state'], 'todos'>
) => PathOption[];
