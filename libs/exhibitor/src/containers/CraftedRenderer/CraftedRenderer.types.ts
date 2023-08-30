import type * as Hook from '../../hooks';
import type { FetchDataHandler, RendererOptions } from '../../utils';
import type { ExhibitionContentProps } from '../../components';

//* Component Props
export type LazyExhibitionContentProps = Omit<
  ExhibitionContentProps,
  'templates'
>;

export interface CraftedRendererProps
  extends Omit<
    LazyExhibitionContentProps,
    'options' | 'onFetchTodoWrapper' | 'onLazyRetrieve'
  > {
  options?: RendererOptions;
  onFetchData: FetchDataHandler;
  onFetchWrapper: Hook.FetchWrapperHandler<'todo' | 'widget'>;
}
