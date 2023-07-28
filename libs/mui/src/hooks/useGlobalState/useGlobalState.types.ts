import type * as Appcraft from '@appcraft/types';

export type RendererOptions =
  | Appcraft.RootNodeWidget
  | {
      widget: Appcraft.RootNodeWidget;
    }[];
