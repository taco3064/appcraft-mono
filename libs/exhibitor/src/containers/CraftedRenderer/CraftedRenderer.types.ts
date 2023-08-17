import type { Breakpoint } from '@mui/material/styles';
import type { PaperProps } from '@mui/material/Paper';
import type { ResponsiveProps } from 'react-grid-layout';

import { useRender } from '../../hooks';
import type * as Hook from '../../hooks';
import type { FetchDataHandler } from '../../utils';

//* Variables
export type LayoutChangeHandler = (
  breakpoint: Breakpoint,
  ...e: Parameters<Required<ResponsiveProps>['onLayoutChange']>
) => void;

//* Component Props
export type LazyRendererProps = Parameters<typeof useRender>[0] & {
  elevation?: PaperProps['elevation'];
  options: Hook.RendererOptions;

  layoutable?: {
    breakpoint: Breakpoint;
    onLayoutChange: LayoutChangeHandler;
  };
};

export type RendererContentProps = LazyRendererProps & {
  fetchData: Hook.WidgetMap;
};

export interface CraftedRendererProps
  extends Omit<
    LazyRendererProps,
    'options' | 'onFetchTodoWrapper' | 'onLazyRetrieve'
  > {
  options?: Hook.RendererOptions;
  onFetchData: FetchDataHandler;
  onFetchWrapper: Hook.FetchWrapperHandler<'todo' | 'widget'>;
}
