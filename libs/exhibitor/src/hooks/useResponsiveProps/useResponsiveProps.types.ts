import type { Breakpoint } from '@mui/material/styles';
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
  layout: Pick<LayoutWidget, 'id' | 'layout'>
) => Layout;

//* Custom Hooks
export type ResponsivePropsHook = (
  options: RendererOptions
) => ResponsiveProps | undefined;
