import type * as Appcraft from '@appcraft/types';
import type { PropPaths } from '../../utils';

type ModifyEvent = Appcraft.WidgetOptions | Appcraft.RootNodeWidget;

export type WidgetMutationHook = (
  widget: Appcraft.RootNodeWidget,
  onWidgetChange: (e: Appcraft.RootNodeWidget | null) => void
) => [
  {
    editedWidget?: Appcraft.WidgetOptions;
    widgetPath: string;
    todoPath?: string;
  },
  {
    add: (
      e: Appcraft.WidgetOptions,
      type: Appcraft.NodeType,
      paths: PropPaths
    ) => void;

    editing: (e?: PropPaths) => void;
    modify: <E extends ModifyEvent>(e: E) => void;
    remove: (e: PropPaths) => void;
    resort: (paths: PropPaths, dragIndex: number, hoverIndex: number) => void;
    todo: (e: PropPaths) => void;
  }
];
