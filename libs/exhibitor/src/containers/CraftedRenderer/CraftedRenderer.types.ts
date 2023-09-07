import type { ExhibitionContentProps } from '../../components';
import type { RenderedWidget } from '../../hooks';
import type { HandleFns } from '../../contexts';

//* Component Props
export interface CraftedRendererProps
  extends Omit<ExhibitionContentProps, 'options'>,
    Omit<HandleFns, 'getWidgetOptions' | 'onLazyRetrieve'> {
  options?: RenderedWidget;
}
