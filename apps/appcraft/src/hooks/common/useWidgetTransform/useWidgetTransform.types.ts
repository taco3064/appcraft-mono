import type { CraftedWidgetEditorProps } from '@appcraft/craftsman';
import type { GetWidgetOptionsFn } from '@appcraft/exhibitor';
import type { LayoutWidget, MainWidget } from '@appcraft/types';

import type { HierarchyData } from '~appcraft/services';

//* Variables
export type HierarchyMap = Map<string, HierarchyData<string>>;

export type TransformHandlers = {
  getWidgetOptions: GetWidgetOptionsFn;
  onChange: (value: LayoutWidget) => void;
  onClose?: () => void;
};

//* Methods
export type ConvertToNodes = (
  nodes: MainWidget['nodes'],
  templateIds: string[],
  getWidgetOptions: GetWidgetOptionsFn
) => LayoutWidget['template']['nodes'];

export type ConvertToWidget = (
  hierarchies: HierarchyMap,
  template: LayoutWidget['template'],
  getWidgetOptions: GetWidgetOptionsFn
) => MainWidget | undefined;

export type ExtractTemplateIds = (
  template: LayoutWidget['template']
) => string[];

export type GetWidgetByType = (
  options: { typeFile: string; typeName: string },
  templateIds: string[],
  getWidgetOptions: GetWidgetOptionsFn
) => ReturnType<GetWidgetOptionsFn>;

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
