import type { NodeWidget, WidgetOptions } from '@appcraft/types';

export type Path = string | number;

export type StructurePathHook = (widget: NodeWidget) => {
  paths: Path[];
  items: WidgetOptions[];
  onPathsChange: (paths: Path[]) => void;
};

export type GetItemsUtil = (
  widget: WidgetOptions[],
  paths: Path[]
) => WidgetOptions[];
