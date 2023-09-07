import type { ExhibitionContentProps } from '../../components';
import type { RenderedWidget } from '../../hooks';
import type { HandleFns, ReadyHandler } from '../../contexts';

//* Component Props
export interface CraftedRendererProps
  extends Omit<ExhibitionContentProps, 'options'>,
    Omit<HandleFns, 'getWidgetOptions' | 'onLazyRetrieve'> {
  options?: RenderedWidget;
  onReady?: ReadyHandler;
}
