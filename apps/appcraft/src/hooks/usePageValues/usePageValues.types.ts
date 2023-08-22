import type { Breakpoint } from '@mui/material/styles';
import type { ConfigData, LayoutWidget, MainWidget } from '@appcraft/types';
import type { ResponsiveProps } from 'react-grid-layout';

//* Variables
export type GridLayoutOptions = Record<
  Breakpoint,
  { max: number; min: number }
>;

//* Custom Hooks
export type PageValuesHook = (options: {
  data: ConfigData<LayoutWidget[], string>;
  onSave?: () => void;
}) => [
  {
    active?: number;
    breakpoint: Breakpoint;
    items: LayoutWidget[];
    layouts: Required<ResponsiveProps>['layouts'];
  },
  {
    active: (e?: LayoutWidget) => void;
    breakpoint: (e: Breakpoint) => void;
    add: () => void;
    change: (e: LayoutWidget[]) => void;
    remove: (e: LayoutWidget) => void;
    reset: () => void;
    save: () => void;
  }
];
