import type { CraftedWidgetEditorProps } from '@appcraft/craftsman';
import type { LayoutWidget, MainWidget, NodeWidget } from '@appcraft/types';

import type { HierarchyData } from '~appcraft/services';

//* Variables
export type HierarchyMap = Map<string, HierarchyData<string>>;

export type TransformHandlers = {
  onChange: (value: LayoutWidget) => void;
  onClose?: () => void;
};

//* Methods
export type ConvertToNodes = (
  nodes: MainWidget['nodes']
) => LayoutWidget['template']['nodes'];

export type ConvertToWidget = (
  hierarchies: HierarchyMap,
  template: LayoutWidget['template']
) => MainWidget | undefined;

export type ExtractTemplateIds = (
  template: LayoutWidget['template']
) => string[];

//* Custom Hooks
export type WidgetTransformHook = (
  layout: LayoutWidget,
  handlers: TransformHandlers
) => [
  MainWidget | undefined,
  Pick<
    CraftedWidgetEditorProps,
    'onFetchDefinition' | 'onFetchNodesAndEvents'
  > & {
    onWidgetChange: CraftedWidgetEditorProps['onWidgetChange'];
  }
];
