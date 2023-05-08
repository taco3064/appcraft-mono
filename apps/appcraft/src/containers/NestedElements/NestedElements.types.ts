import type { WidgetOptions } from '@appcraft/types';

export interface NestedElementsProps {
  superior?: string;
  widgets?: WidgetOptions[];
  onWidgetClick: (target: WidgetOptions) => void;
}

export type NestedItemsHook = (
  props: Pick<NestedElementsProps, 'superior' | 'widgets'>
) => WidgetOptions[];
