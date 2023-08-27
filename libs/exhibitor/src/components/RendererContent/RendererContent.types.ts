import type { LayoutWidget, MainWidget, WidgetTodo } from '@appcraft/types';
import type { PaperProps } from '@mui/material/Paper';

import { getEventHandler } from '../../utils';
import { useRender } from '../../hooks';
import type * as Hook from '../../hooks';
import type { GridActionRenderer, GridLayoutProps } from '../common';

//* Variables
type RendererHandlers = Parameters<typeof useRender>[0];

export type PopoverOptions = {
  anchorEl?: HTMLButtonElement;
  layout: LayoutWidget;
};

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
          templates: Hook.WidgetMap;
          onReady?: Hook.ReadyOptions[0];
        });
