import type { NodeWidget, WidgetOptions } from '@appcraft/types';
import type { NodePath } from '../../contexts';

type BaseNode<C> = Pick<NodeWidget, 'type'> & C;

export type ActiveNode = BaseNode<{
  isMultiChildren: boolean;
  propPath: string;
  index: number;
}>;

export type StructureHook = (widget: NodeWidget) => {
  breadcrumbs: string[];
  isMultiChildren: boolean;
  items: WidgetOptions[];
  paths: NodePath[];

  onNodeActive: (e: number | ActiveNode) => void;
};
