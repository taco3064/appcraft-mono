import type { ShowcaseProps } from '../../components';
import type { RenderedWidget } from '../../hooks';
import type { HandleFns, ReadyHandler } from '../../contexts';

//* Component Props
export interface CraftedRendererProps
  extends Omit<ShowcaseProps, 'options'>,
    Omit<HandleFns, 'getWidgetOptions' | 'onLazyRetrieve'> {
  options?: RenderedWidget;
  onReady?: ReadyHandler;
}
