import type * as Appcraft from '@appcraft/types';

export type WidgetMutationHook = (
  widget: Appcraft.NodeWidget,
  isMultiChildren: boolean,
  paths: undefined | (string | number)[],
  onWidgetChange: (e: Appcraft.NodeWidget | null) => void
) => [
  Appcraft.NodeWidget | null,
  {
    onWidgetAdd: (e: Appcraft.WidgetOptions) => void;
    onWidgetModify: (e: Appcraft.NodeWidget) => void;
    onWidgetRemove: (e: Appcraft.WidgetOptions) => void;
    onWidgetSelect: (e: Appcraft.NodeWidget | null) => void;
  }
];
