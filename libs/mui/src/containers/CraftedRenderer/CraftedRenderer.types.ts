import { useRender } from '../../hooks';
import type * as Hook from '../../hooks';
import type { FetchDataHandler } from '../../utils';

export type LazyRendererProps = Parameters<typeof useRender>[0] & {
  options: Hook.RendererOptions;
};

export type RendererContentProps = LazyRendererProps & {
  fetchData: Hook.WidgetMap;
};

export interface CraftedRendererProps
  extends Omit<LazyRendererProps, 'options' | 'onFetchTodoWrapper'> {
  options?: Hook.RendererOptions;
  onFetchData: FetchDataHandler;
  onFetchWrapper: Hook.FetchWrapperHandler<'todo' | 'widget'>;
}
