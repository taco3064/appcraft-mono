import type { Breakpoint } from '@mui/material/styles';
import type { ConfigData, LayoutWidget } from '@appcraft/types';
import type { Layout, Layouts } from 'react-grid-layout';

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
  },
  {
    active: (e?: LayoutWidget) => void;
    add: () => void;
    breakpoint: (e: Breakpoint) => void;
    change: (e: LayoutWidget[]) => void;
    layout: (...e: [Layout[], Layouts]) => void;
    remove: (e: LayoutWidget) => void;
    reset: () => void;
    save: () => void;
  }
];
