import type { LayoutWidget } from '@appcraft/types';

//* Variables
export type LinkOptions = {
  layoutid: string;
  alias?: string;
  todoName: string;
  todoPath: string;
  nodePaths: (string | number)[];
  outputs: string[];
};

//* Custom Hooks
export type LinkHandlesHook = (layouts: LayoutWidget[]) => [
  {
    options: LinkOptions[];
  }
];
