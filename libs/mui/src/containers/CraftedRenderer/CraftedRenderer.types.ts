import type * as Hook from '../../hooks';

export interface CraftedRendererProps
  extends Omit<Hook.GeneratorHandlers, 'renderer'> {
  options?: Hook.RendererOptions;
  onFetchWidget: Hook.FetchWidgetHandler;
}
