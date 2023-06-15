import type { NodeWidget, WidgetOptions } from '@appcraft/types';

export type NodePath = string | number;
type BaseNode<C extends Record<string, unknown>> = Pick<NodeWidget, 'type'> & C;

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
