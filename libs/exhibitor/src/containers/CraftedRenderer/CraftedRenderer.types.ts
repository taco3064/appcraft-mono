import type { ExhibitionContentProps } from '../../components';
import type { FetchDataHandler } from '../../utils';
import type { FetchWrapperHandler, RenderedWidget } from '../../hooks';

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
  options?: RenderedWidget;
  onFetchData: FetchDataHandler;
  onFetchWrapper: FetchWrapperHandler<'todo' | 'widget'>;
}
