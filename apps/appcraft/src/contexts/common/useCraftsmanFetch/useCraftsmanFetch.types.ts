import type { CraftedRendererProps } from '@appcraft/exhibitor';

export type CraftsmanFetchHook = () => {
  data: CraftedRendererProps['onFetchData'];
  wrapper: CraftedRendererProps['onFetchWrapper'];
};
