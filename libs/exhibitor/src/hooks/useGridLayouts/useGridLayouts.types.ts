import type * as Appcraft from '@appcraft/types';
import type { Breakpoint } from '@mui/material/styles';
import type { Layout, Layouts, ResponsiveProps } from 'react-grid-layout';

import type { RenderedWidget } from '../common';

//* Variables
export type Mins = Record<Breakpoint, number>;

export type Config = {
  widgets: Appcraft.LayoutWidget[];
  props: Required<Required<Parameters<GridLayoutsHook>>[1]>;
};

//* Methods
export type GetPrevLayout = (
  params: Pick<Config['props'], 'cols' | 'mins'> & {
    id: string;
    breakpoint: Breakpoint;
    breakpoints: Breakpoint[];
    layouts: Layouts;
  }
) => Layout;

//* Custom Hooks
export type GridLayoutsHook = (
  options: RenderedWidget,
  props?: Pick<ResponsiveProps, 'breakpoints' | 'cols'> & { mins: Mins }
) => Layouts;
