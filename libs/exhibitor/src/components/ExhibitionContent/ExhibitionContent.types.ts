import type { LayoutWidget, MainWidget } from '@appcraft/types';
import type { PaperProps } from '@mui/material/Paper';

import type { GridActionRenderer } from '../GridAction';
import type { GridLayoutProps } from '../GridLayout';
import type { Mins, RenderedWidget } from '../../hooks';

//* Component Props
export type ExhibitionContentProps<T extends RenderedWidget> =
  T extends MainWidget
    ? {
        GridLayoutProps?: never;
        action?: never;
        breakpoint?: never;
        elevation?: never;
        options: MainWidget;
      }
    : {
        GridLayoutProps: Omit<
          GridLayoutProps,
          'breakpoint' | 'children' | 'draggableHandle' | 'options' | 'layouts'
        > & { mins: Mins };

        action?: GridActionRenderer;
        breakpoint?: GridLayoutProps['breakpoint'];
        elevation?: PaperProps['elevation'];
        options: LayoutWidget[];
      };
