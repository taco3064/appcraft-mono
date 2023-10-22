import type { Breakpoint } from '@mui/material/styles';
import type { Breakpoints } from '@appcraft/types';
import type { ComponentProps } from 'react';
import type { ImageListProps } from '@mui/material/ImageList';

import { CollectionItem } from '../../styles';
import type { DndHandleProps } from '../../hooks';

//* Variables
export type MaxWidthes = {
  xs: 'xs';
  sm?: MaxWidthes['xs'] | 'sm';
  md?: MaxWidthes['sm'] | 'md';
  lg?: MaxWidthes['md'] | 'lg';
  xl?: MaxWidthes['lg'] | 'xl';
};

//* Component Props
export interface CollectionGridProps<T extends { id: string }>
  extends DndHandleProps<T>,
    Omit<
      ImageListProps,
      'children' | 'cols' | 'rowHeight' | 'variant' | 'onResize'
    > {
  breakpoint?: Breakpoint;
  cols?: Breakpoints<number>;
  disableResort?: boolean;
  items?: T[];
  maxWidthes: MaxWidthes;
  rowHeight: number;

  renderContent: (
    items: T[],
    options: ComponentProps<typeof CollectionItem>['GridProps']
  ) => ImageListProps['children'];
}
