import type { CraftedRendererProps } from '@appcraft/exhibitor';
import { GRID_LAYOUT_OPTIONS } from './usePageValues';

export { usePageValues } from './usePageValues';
export type { PageData } from './usePageValues.types';

type GridLayoutProps = Required<CraftedRendererProps['GridLayoutProps']>;

export const GRID_LAYOUT = {
  COLS: Object.fromEntries(
    Object.entries(GRID_LAYOUT_OPTIONS).map(([breakpoint, { max }]) => [
      breakpoint,
      max,
    ])
  ) as GridLayoutProps['cols'],
  MINS: Object.fromEntries(
    Object.entries(GRID_LAYOUT_OPTIONS).map(([breakpoint, { min }]) => [
      breakpoint,
      min,
    ])
  ) as GridLayoutProps['mins'],
};
