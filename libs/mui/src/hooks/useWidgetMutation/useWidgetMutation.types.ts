import type * as Appcraft from '@appcraft/types';
import type { NodePath } from '../../contexts';

type ModifyEvent = Appcraft.WidgetOptions | Appcraft.RootNodeWidget;

export type WidgetMutationHook = (
  widget: Appcraft.RootNodeWidget,
  isMultiChildren: boolean,
  paths: undefined | NodePath[],
  onWidgetChange: (e: Appcraft.RootNodeWidget | null) => void
) => {
  selected: Appcraft.WidgetOptions | null;
  onWidgetAdd: (e: Appcraft.WidgetOptions) => void;
  onWidgetModify: <E extends ModifyEvent>(e: E) => void;
  onWidgetRemove: (e: Appcraft.WidgetOptions) => void;
  onWidgetSelect: (e: Appcraft.WidgetOptions | null) => void;
};
