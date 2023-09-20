import type { Breakpoint } from '@mui/material/styles';
import type { LayoutWidget } from '@appcraft/types';
import type { ResponsiveProps } from 'react-grid-layout';

export interface GridLayoutProps
  extends Omit<ResponsiveProps, 'rowHeight' | 'style'> {
  breakpoint?: Breakpoint;
  options: LayoutWidget[];
}
