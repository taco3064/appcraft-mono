import type { WidgetOptions } from '@appcraft/types';

export interface WidgetElementsProps {
  superior?: string;
  widgets?: WidgetOptions[];
}

export type WidgetItemsHook = (
  props: Pick<WidgetElementsProps, 'superior' | 'widgets'>
) => WidgetOptions[];
