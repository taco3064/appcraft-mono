import type * as Appcraft from '@appcraft/types';
import type { PropPaths } from '../../contexts';

type ModifyEvent = Appcraft.WidgetOptions | Appcraft.RootNodeWidget;

export type WidgetMutationHook = (
  widget: Appcraft.RootNodeWidget,
  onWidgetChange: (e: Appcraft.RootNodeWidget | null) => void
) => [
  {
    editedWidget: Appcraft.WidgetOptions | null;
    todoPath: string | null;
  },
  {
    add: (
      e: Appcraft.WidgetOptions,
      type: Appcraft.NodeType,
      paths: PropPaths
    ) => void;

    editing: (e: PropPaths | null) => void;
    modify: <E extends ModifyEvent>(e: E) => void;
    remove: (e: PropPaths) => void;
    todo: (e: PropPaths) => void;
  }
];
