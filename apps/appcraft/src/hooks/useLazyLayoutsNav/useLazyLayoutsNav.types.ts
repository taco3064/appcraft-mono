import { useLazyWidgetNav } from '@appcraft/exhibitor';
import type * as Exhibitor from '@appcraft/exhibitor';
import type { LayoutWidget, LazyRenderer } from '@appcraft/types';

//* Variables
export type LazyLayoutsNavArgs<R> = [
  enabled: boolean,
  pageid: string,
  fetchWidgetWrapper: Exhibitor.FetchWrapperHandler<'widget'>,
  renderer: LazyRenderer<Exhibitor.GetWidgetOptionsFn, R>
];

export type LazyLayoutsNavReturnType<R> = [
  ReturnType<typeof useLazyWidgetNav<R>>,
  LayoutWidget[]
];
