import type { NodeWidget, WidgetOptions } from '@appcraft/types';

export type StructurePathHook = (widget: NodeWidget) => {
  paths: string[];
  items: WidgetOptions[];
  onPathsChange: (paths: string[]) => void;
};

export type GetItemsUtil = (
  widget: NodeWidget,
  paths: string[]
) => WidgetOptions[];
