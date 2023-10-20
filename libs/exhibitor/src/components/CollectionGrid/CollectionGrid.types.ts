import type { Breakpoint } from '@mui/material/styles';
import type { Breakpoints } from '@appcraft/types';
import type { ImageListProps } from '@mui/material/ImageList';

import type { DndHandleProps } from '../../hooks';

//* Component Props
export interface CollectionGridProps<T extends { id: string }>
  extends DndHandleProps<T>,
    Omit<
      ImageListProps,
      'children' | 'cols' | 'rowHeight' | 'variant' | 'onResize'
    > {
  breakpoint?: Breakpoint;
  cols?: Breakpoints<number>;
  items?: T[];
  rowHeight: number;

  renderContent: (
    items: T[],
    breakpoint: Breakpoint,
    rowHeight: number
  ) => ImageListProps['children'];
}
