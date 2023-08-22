import type { LayoutWidget, MainWidget } from '@appcraft/types';
import type { PaperProps } from '@mui/material/Paper';
import type { ReactNode } from 'react';

import { useRender } from '../../hooks';
import type * as Hook from '../../hooks';
import type { GridLayoutProps } from '../common';

type RendererHandlers = Parameters<typeof useRender>[0];

//* Component Props
export type RendererContentProps<T extends Hook.RendererOptions> =
  RendererHandlers &
    (T extends MainWidget
      ? {
          GridLayoutProps?: never;
          action?: never;
          breakpoint?: never;
          elevation?: never;
          options: MainWidget;
          templates: Hook.WidgetMap;
        }
      : {
          GridLayoutProps: Omit<
            GridLayoutProps,
            'breakpoint' | 'children' | 'options'
          >;

          action?: (layout?: LayoutWidget) => ReactNode;
          breakpoint?: GridLayoutProps['breakpoint'];
          elevation?: PaperProps['elevation'];
          options: GridLayoutProps['options'];
          templates: Hook.WidgetMap;
        });
