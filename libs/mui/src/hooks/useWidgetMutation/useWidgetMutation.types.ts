import type * as Appcraft from '@appcraft/types';
import type { PropPaths } from '../../contexts';

type ModifyEvent = Appcraft.WidgetOptions | Appcraft.RootNodeWidget;

export type WidgetMutationHook = (
  widget: Appcraft.RootNodeWidget,
  isMultiChildren: boolean,
  paths: PropPaths,
  onWidgetChange: (e: Appcraft.RootNodeWidget | null) => void
) => [
  {
    editedWidget: Appcraft.WidgetOptions | null;
    todoPath: string | null;
  },
  {
    add: (e: Appcraft.WidgetOptions) => void;
    editing: (e: Appcraft.WidgetOptions | null) => void;
    modify: <E extends ModifyEvent>(e: E) => void;
    remove: (e: Appcraft.WidgetOptions) => void;
    todo: (e: PropPaths) => void;
  }
];
