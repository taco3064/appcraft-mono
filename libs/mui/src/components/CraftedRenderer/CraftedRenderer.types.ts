import type { RootNodeWidget } from '@appcraft/types';
import type { RendererProviderProps } from '../../contexts';

type WidgetLayout = {
  widget: RootNodeWidget;
};

export interface CraftedRendererProps
  extends Omit<RendererProviderProps, 'children'> {
  options?: RootNodeWidget | WidgetLayout[];
}
