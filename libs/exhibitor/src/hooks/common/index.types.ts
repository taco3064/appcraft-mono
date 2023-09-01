import type { LayoutWidget, MainWidget } from '@appcraft/types';

export type WidgetRegistry = Map<string, MainWidget>;
export type RenderedWidget = MainWidget | LayoutWidget[];
