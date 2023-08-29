import type * as Appcraft from '@appcraft/types';

import type { FetchWrapperHandler } from '../useRender';
import type { WidgetMap } from '../../utils';

export type WidgetInfo = {
  id: string;
  widget: Appcraft.MainWidget;
};

export type ExtractTemplateIds = (widgets: Appcraft.MainWidget[]) => string[];

export type FetchWidgets = (
  templateIds: string[],
  onFetchWidget: FetchWrapperHandler<'widget'>,
  tempaltes?: WidgetMap
) => Promise<WidgetMap>;
