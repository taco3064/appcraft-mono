import type { LayoutWidget, MainWidget } from '@appcraft/types';
import type { PaperProps } from '@mui/material/Paper';
import type { ReactNode } from 'react';

import type { CollectionGridProps } from '../CollectionGrid';
import type { RenderedWidget } from '../../hooks';

//* Component Props
export type ShowcaseProps<T extends RenderedWidget> = T extends MainWidget
  ? {
      CollectionGridProps?: never;
      elevation?: never;
      options: MainWidget;
    }
  : {
      CollectionGridProps: Omit<
        CollectionGridProps<LayoutWidget>,
        'items' | 'renderContent'
      > & {
        renderAction?: (layout: LayoutWidget) => ReactNode;
      };

      elevation?: PaperProps['elevation'];
      options: LayoutWidget[];
    };
