import type * as Appcraft from '@appcraft/types';
import type { PropPaths } from '../../contexts';

export type Breadcrumbs = {
  text: string;
  paths: PropPaths;
}[];

export type PathsChangeHandler = (
  e: PropPaths,
  type?: Appcraft.NodeType
) => void;

export type StructureHook = (widget: Appcraft.NodeWidget) => [
  {
    type: Appcraft.NodeType;
    breadcrumbs: Breadcrumbs;
    items: Appcraft.WidgetOptions[];
    paths: PropPaths;
  },
  PathsChangeHandler
];
