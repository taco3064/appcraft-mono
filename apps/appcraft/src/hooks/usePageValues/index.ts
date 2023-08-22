import type { ResponsiveProps } from 'react-grid-layout';
import { GRID_LAYOUT_OPTIONS } from './usePageValues';

export { usePageValues } from './usePageValues';

export const GRID_LAYOUT_COLS: ResponsiveProps['cols'] = Object.fromEntries(
  Object.entries(GRID_LAYOUT_OPTIONS).map(([breakpoint, { max }]) => [
    breakpoint,
    max,
  ])
);
