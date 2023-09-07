import type * as Appcraft from '@appcraft/types';
import type { PropPaths } from '../../utils';

export type Breadcrumbs = {
  text: string;
  paths: PropPaths;
}[];

export type PathsChangeHandler = (
  e: PropPaths,
  type?: Appcraft.NodeType
) => void;

export type StructureHook = (widget: Appcraft.MainWidget) => [
  {
    type: Appcraft.NodeType;
    breadcrumbs: Breadcrumbs;
    paths: PropPaths;
    childrenCount: number;
  },
  PathsChangeHandler
];
