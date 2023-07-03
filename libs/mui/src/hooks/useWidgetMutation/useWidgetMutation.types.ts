import type * as Appcraft from '@appcraft/types';
import type { PropPaths } from '../../contexts';

type ModifyEvent = Appcraft.WidgetOptions | Appcraft.RootNodeWidget;

export type WidgetMutationHook = (
  widget: Appcraft.RootNodeWidget,
  isMultiChildren: boolean,
  paths: undefined | PropPaths,
  onWidgetChange: (e: Appcraft.RootNodeWidget | null) => void
) => [
  Appcraft.WidgetOptions | null,
  {
    add: (e: Appcraft.WidgetOptions) => void;
    modify: <E extends ModifyEvent>(e: E) => void;
    remove: (e: Appcraft.WidgetOptions) => void;
    select: (e: Appcraft.WidgetOptions | null) => void;
  }
];
