import type * as Util from '../../utils';
import type { ExternalLazy, RendererOptions } from '../../hooks';

export interface CraftedRendererProps {
  lazy: ExternalLazy;
  options?: RendererOptions;
  onFetchTodoWrapper: Util.FetchTodoWrapperHandler;
  onOutputCollect?: Util.OutputCollectHandler;
}
