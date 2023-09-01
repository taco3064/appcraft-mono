import type { LayoutWidget, MainWidget } from '@appcraft/types';
import type { PaperProps } from '@mui/material/Paper';

import { useComposerRender } from '../../hooks';
import type * as Hook from '../../hooks';
import type { GridActionRenderer, GridLayoutProps } from '../common';

//* Variables
type RendererHandlers = Parameters<typeof useComposerRender>[0];

export type PopoverOptions = {
  anchorEl?: HTMLButtonElement;
  layout: LayoutWidget;
};

//* Component Props
export type ExhibitionContentProps<T extends Hook.RenderedWidget> =
  RendererHandlers &
    (T extends MainWidget
      ? {
          GridLayoutProps?: never;
          action?: never;
          breakpoint?: never;
          elevation?: never;
          options: MainWidget;
          templates: Hook.WidgetRegistry;
          onReady?: never;
        }
      : {
          GridLayoutProps: Omit<
            GridLayoutProps,
            | 'breakpoint'
            | 'children'
            | 'draggableHandle'
            | 'options'
            | 'layouts'
          > & { mins: Hook.Mins };

          action?: GridActionRenderer;
          breakpoint?: GridLayoutProps['breakpoint'];
          elevation?: PaperProps['elevation'];
          options: LayoutWidget[];
          templates: Hook.WidgetRegistry;
          onReady?: Hook.ReadyHandler;
        });
