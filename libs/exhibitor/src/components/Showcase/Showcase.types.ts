import type { LayoutWidget, MainWidget } from '@appcraft/types';
import type { ReactNode } from 'react';

import type { CollectionGridProps } from '../CollectionGrid';
import type { RenderedWidget } from '../../hooks';

//* Component Props
export type ShowcaseProps<T extends RenderedWidget> = T extends MainWidget
  ? {
      CollectionGridProps?: never;
      options: MainWidget;
    }
  : {
      CollectionGridProps: Omit<
        CollectionGridProps<LayoutWidget>,
        'disableResort' | 'items' | 'renderContent'
      > & {
        renderAction?: (layout: LayoutWidget) => ReactNode;
      };

      options: LayoutWidget[];
    };
