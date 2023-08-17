import type { PaperProps } from '@mui/material/Paper';
import type { ResponsiveProps } from 'react-grid-layout';

import { useRender } from '../../hooks';
import type * as Hook from '../../hooks';
import type { FetchDataHandler } from '../../utils';

export type LazyRendererProps = Parameters<typeof useRender>[0] & {
  elevation?: PaperProps['elevation'];
  options: Hook.RendererOptions;
  onLayoutChange?: ResponsiveProps['onLayoutChange'];
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
