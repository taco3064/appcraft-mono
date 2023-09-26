import type { ChangeEvent } from 'react';
import type { GetWidgetOptionsFn, OutputData } from '@appcraft/exhibitor';
import type { LayoutWidget } from '@appcraft/types';

import type { Links, Navigation } from '../useNavValues';

//* Variables
export type ActiveEvent = {
  layoutid: string;
  nodePaths: (string | number)[];
  alias?: string;
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
  value: Navigation,
  getWidgetOptions: GetWidgetOptionsFn,
  onChange: (value: Links) => void
) => [
  {
    events: LinkEvent[];
    outputs?: OutputData[];
    active?: {
      title: string;
      subtitle: string;
      link?: Links[number];
    };
  },
  {
    add: () => void;
    back: () => void;
    click: (target: LinkEvent) => void;
    params: (type: 'key' | 'value', index: number, value: string) => void;
    remove: (type: 'params' | 'link', index: number) => void;
    resetable: (event: LinkEvent) => boolean;
    to: (e: ChangeEvent<HTMLInputElement>) => void;
  }
];
