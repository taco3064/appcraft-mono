import type { CraftedWidgetEditorProps } from '@appcraft/craftsman';
import type { LayoutWidget, MainWidget } from '@appcraft/types';

//* Custom Hooks
export type WidgetTransformHook = (
  layout: LayoutWidget
) => [
  MainWidget,
  Pick<CraftedWidgetEditorProps, 'onFetchDefinition' | 'onFetchNodesAndEvents'>
];
