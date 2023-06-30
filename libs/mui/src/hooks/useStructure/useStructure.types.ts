import type * as Appcraft from '@appcraft/types';
import type { PropPaths } from '../../contexts';

export type Breadcrumbs = {
  text: string;
  paths: PropPaths;
  type: Appcraft.NodeType;
}[];

export type StructureHook = (widget: Appcraft.NodeWidget) => {
  breadcrumbs: Breadcrumbs;
  items: Appcraft.WidgetOptions[];
  paths: PropPaths;

  onPathsChange: (e: PropPaths) => void;
};
