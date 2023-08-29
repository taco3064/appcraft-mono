import type * as Hook from '../../hooks';
import type { FetchDataHandler, RendererOptions } from '../../utils';
import type { RendererContentProps } from '../../components';

//* Component Props
export type LazyRendererProps = Omit<RendererContentProps, 'templates'>;

export interface CraftedRendererProps
  extends Omit<
    LazyRendererProps,
    'options' | 'onFetchTodoWrapper' | 'onLazyRetrieve'
  > {
  options?: RendererOptions;
  onFetchData: FetchDataHandler;
  onFetchWrapper: Hook.FetchWrapperHandler<'todo' | 'widget'>;
}
