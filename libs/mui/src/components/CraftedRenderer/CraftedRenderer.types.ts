import type { WidgetOptions } from '@appcraft/types';
import type { RendererProviderProps } from '../../contexts';

type WidgetLayout = {
  widget: WidgetOptions;
};

export interface CraftedRendererProps
  extends Omit<RendererProviderProps, 'children'> {
  options?: WidgetOptions | WidgetLayout[];
}
