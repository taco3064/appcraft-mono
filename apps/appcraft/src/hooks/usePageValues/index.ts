import type { CraftedRendererProps } from '@appcraft/exhibitor';
import { GRID_LAYOUT_OPTIONS } from './usePageValues';

export { usePageValues } from './usePageValues';

type GridLayoutProps = Required<CraftedRendererProps['GridLayoutProps']>;

export const GRID_LAYOUT_COLS: GridLayoutProps['cols'] = Object.fromEntries(
  Object.entries(GRID_LAYOUT_OPTIONS).map(([breakpoint, { max }]) => [
    breakpoint,
    max,
  ])
);

export const GRID_LAYOUT_MINS = Object.fromEntries(
  Object.entries(GRID_LAYOUT_OPTIONS).map(([breakpoint, { min }]) => [
    breakpoint,
    min,
  ])
) as GridLayoutProps['mins'];
