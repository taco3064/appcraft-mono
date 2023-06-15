import type * as Appcraft from '@appcraft/types';
import type { NodePath } from '../useStructure';

export type WidgetMutationHook = (
  widget: Appcraft.NodeWidget,
  isMultiChildren: boolean,
  paths: undefined | NodePath[],
  onWidgetChange: (e: Appcraft.NodeWidget | null) => void
) => [
  Appcraft.WidgetOptions | null,
  {
    onWidgetAdd: (e: Appcraft.WidgetOptions) => void;
    onWidgetModify: <E extends Appcraft.WidgetOptions>(e: E) => void;
    onWidgetRemove: (e: Appcraft.WidgetOptions) => void;
    onWidgetSelect: (e: Appcraft.WidgetOptions | null) => void;
  }
];
