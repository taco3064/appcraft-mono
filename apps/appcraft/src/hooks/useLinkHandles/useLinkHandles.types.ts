import type { GetWidgetOptionsFn, OutputData } from '@appcraft/exhibitor';
import type { LayoutWidget } from '@appcraft/types';

//* Variables
export type ActiveEvent = {
  layoutid: string;
  nodePaths: (string | number)[];
  todoName: string;
  outputs: OutputData[];
};

export type LinkEvent = {
  layoutid: string;
  alias?: string;
  todoName: string;
  todoPath: string;
  nodePaths: (string | number)[];
  outputs: string[];
};

//* Custom Hooks
export type LinkHandlesHook = (
  layouts: LayoutWidget[],
  getWidgetOptions: GetWidgetOptionsFn
) => [
  {
    events: LinkEvent[];
    outputs?: OutputData[];
  },
  {
    click: (target: LinkEvent) => void;
  }
];
