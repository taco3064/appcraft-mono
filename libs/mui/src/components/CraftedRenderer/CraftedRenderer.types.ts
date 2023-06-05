import type { RendererProviderProps, RenderType } from '../../contexts';

export type CraftedRendererProps<T extends RenderType> = Pick<
  RendererProviderProps<T>,
  'options'
>;
