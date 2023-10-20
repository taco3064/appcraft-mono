import type { Breakpoint } from '@mui/material/styles';
import type { Breakpoints } from '@appcraft/types';
import type { ImageListProps } from '@mui/material/ImageList';

//* Component Props
export interface CollectionGridProps<T extends { id: string }>
  extends Omit<
    ImageListProps,
    'children' | 'cols' | 'rowHeight' | 'variant' | 'onResize'
  > {
  breakpoint?: Breakpoint;
  cols?: Breakpoints<number>;
  items?: T[];
  rowHeight: number;
  onResort?: (items: T[]) => void;

  onResize?: (item: T, size: Record<'cols' | 'rows', number>) => void;

  renderContent: (
    items: T[],
    breakpoint: Breakpoint
  ) => ImageListProps['children'];
}
