import type { RootNodeWidget } from '@appcraft/types';
import type { ExternalLazy } from '../../hooks';

type WidgetLayout = {
  widget: RootNodeWidget;
};

export interface CraftedRendererProps {
  lazy: ExternalLazy;
  options?: RootNodeWidget | WidgetLayout[];
}
