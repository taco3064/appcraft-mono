import type { NodeWidget, WidgetOptions } from '@appcraft/types';

type BreadcrumbPath = string | number;
type BaseNode<C extends Record<string, unknown>> = Pick<NodeWidget, 'type'> & C;

export type ActiveNode = BaseNode<{
  isMultiChildren: boolean;
  propPath: string;
  index: number;
}>;

export type Breadcrumb = Required<
  BaseNode<{
    tooltip: string;
    paths: BreadcrumbPath[];
  }>
>;

export type StructureHook = (widget: NodeWidget) => {
  isMultiChildren: boolean;
  items: WidgetOptions[];
  breadcrumbs: Breadcrumb[];

  onNodeActive: (e: number | ActiveNode) => void;
};
