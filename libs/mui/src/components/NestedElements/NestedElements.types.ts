import type { WidgetOptions } from '@appcraft/types';
import type { EditorProviderProps } from '../../contexts';

export interface NestedElementsProps {
  fixedT?: EditorProviderProps['fixedT'];
  superior?: string;
  widgets?: WidgetOptions[];
  onWidgetSelect: (id: string) => void;
}

export type NestedItemsHook = (
  props: Pick<NestedElementsProps, 'superior' | 'widgets'>
) => WidgetOptions[];
