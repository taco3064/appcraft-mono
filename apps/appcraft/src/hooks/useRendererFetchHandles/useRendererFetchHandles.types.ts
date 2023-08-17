import type { CraftedRendererProps } from '@appcraft/exhibitor';

export type RendererFetchHandlesHook = () => {
  data: CraftedRendererProps['onFetchData'];
  wrapper: CraftedRendererProps['onFetchWrapper'];
};
