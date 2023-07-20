import type { RootNodeWidget } from '@appcraft/types';

import type { ExternalLazy } from '../../hooks';
import type { FetchTodoWrap } from '../../utils';

type WidgetLayout = {
  widget: RootNodeWidget;
};

export interface CraftedRendererProps {
  fetchTodoWrap: FetchTodoWrap;
  lazy: ExternalLazy;
  options?: RootNodeWidget | WidgetLayout[];
}
