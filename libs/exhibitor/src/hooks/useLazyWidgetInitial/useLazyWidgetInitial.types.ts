import type * as Appcraft from '@appcraft/types';

import type { FetchWrapperHandler } from '../useComposerRender';
import type { WidgetMap } from '../../utils';

export type WidgetInfo = {
  id: string;
  widget: Appcraft.MainWidget;
};

export type ExtractByLayoutTemplate = (
  template: Appcraft.LayoutWidget['template'][]
) => string[];

export type ExtractByStateTemplate = (
  widgets: Appcraft.MainWidget[]
) => string[];

export type FetchWidgets = (
  templateIds: string[],
  onFetchWidget: FetchWrapperHandler<'widget'>,
  tempaltes?: WidgetMap
) => Promise<WidgetMap>;
