import type { LayoutWidget } from '@appcraft/types';

//* Variables
export type LinkOptions = {
  layoutid: string;
  todoName: string;
  todoPath: string;
  outputs: string[];
};

//* Custom Hooks
export type LinkHandlesHook = (layouts: LayoutWidget[]) => [
  {
    options: LinkOptions[];
  }
];
