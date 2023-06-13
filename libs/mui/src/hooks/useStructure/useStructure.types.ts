import type { NodeWidget, WidgetOptions } from '@appcraft/types';

type BaseNode<C extends Record<string, unknown>> = Pick<
  NodeWidget,
  'type' | 'description'
> &
  C;

export type ActiveNode = BaseNode<{
  isMultiChildren: boolean;
  propPath: string;
  index: number;
}>;

export type Breadcrumb = BaseNode<{
  paths: (string | number)[];
}>;

export type StructureHook = (widget: NodeWidget) => {
  items: WidgetOptions[];
  breadcrumbs: Breadcrumb[];

  onNodeActive: (e: number | ActiveNode) => void;
};
