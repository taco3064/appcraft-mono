import type { WidgetOptions } from '@appcraft/types';
import type { RendererProviderProps } from '../../contexts';

type WidgetLayout = {
  widget: WidgetOptions;
};

export interface CraftedRendererProps extends RendererProviderProps {
  options: WidgetOptions | WidgetLayout[];
}
