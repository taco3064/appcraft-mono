import type * as Appcraft from '@appcraft/types';
import type { PropPaths } from '../../utils';

type ModifyEvent = Appcraft.EntityWidgets | Appcraft.MainWidget;

export type WidgetMutationHook = (
  widget: Appcraft.MainWidget,
  onWidgetChange: (e: Appcraft.MainWidget | null) => void
) => [
  {
    editedWidget?: Appcraft.EntityWidgets;
    widgetPath: string;
    todoPath?: string;
  },
  {
    add: (
      e: Appcraft.EntityWidgets,
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
