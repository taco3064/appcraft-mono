import type { LayoutWidget, LazyRenderer, MainWidget } from '@appcraft/types';

import type { FetchWrapperHandler, GetWidgetOptionsFn } from '../../contexts';
import type { RenderedWidget } from '../index.types';

//* Variables
export type FetchResult = Promise<{ id: string; widget: MainWidget }>[];
export type WidgetNav = Map<string, { widget: MainWidget; id: string }>;

export type LazyWidgetNavArgs<R> = [
  RenderedWidget | undefined,
  FetchWrapperHandler<'widget'>,
  LazyRenderer<GetWidgetOptionsFn, R>
];

//* Methods
export type FetchWidgets = (
  templateIds: string[],
  onFetchWidget: FetchWrapperHandler<'widget'>,
  records?: WidgetNav
) => Promise<WidgetNav>;

export type GetTemplateIdsFn = <By extends 'layout' | 'state'>(
  getBy: By,
  sources: (By extends 'layout' ? LayoutWidget['template'] : MainWidget)[]
) => string[];
