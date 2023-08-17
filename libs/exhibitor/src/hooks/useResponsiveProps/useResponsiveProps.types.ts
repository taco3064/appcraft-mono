import type { Breakpoint } from '@mui/system';
import type { Layout } from 'react-grid-layout';
import type { LayoutWidget } from '@appcraft/types';

import type { RendererOptions } from '../useRendererState';

//* Variables
type Responsive<T> = Partial<Record<Breakpoint, T>>;

export type ResponsiveProps = {
  breakpoints: Responsive<number>;
  cols: Responsive<number>;
  layouts: Responsive<Layout[]>;
};

//* Methods
export type GetLayout = (
  sizes: Breakpoint[],
  size: Breakpoint,
  layoutWidget: LayoutWidget
) => Layout;

//* Custom Hooks
export type ResponsivePropsHook = (
  options: RendererOptions
) => ResponsiveProps | undefined;
