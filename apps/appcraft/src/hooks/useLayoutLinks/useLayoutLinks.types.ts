import type { LayoutWidget, MainWidget } from '@appcraft/types';

//* Variables
export type LinkData = LayoutWidget['links'][string];

//* Custom Hooks
export type LayoutLinksHook = (
  layout: LayoutWidget,
  onChange: (value: LayoutWidget) => void
) => [
  Map<string, LinkData>,
  (
    path: string,
    data: Pick<LinkData, 'widgetPaths'> & { widget: MainWidget }
  ) => void
];
