import type * as Appcraft from '@appcraft/types';

import type { FetchWrapperHandler } from '../useRender';
import type { WidgetMap } from '../useRendererState';

export type WidgetInfo = {
  id: string;
  widget: Appcraft.RootNodeWidget;
};

export type FetchWidgets = (
  widgets: Appcraft.RootNodeWidget[],
  onFetchWidget: FetchWrapperHandler<'widget'>,
  tempaltes?: WidgetMap
) => Promise<WidgetMap>;
