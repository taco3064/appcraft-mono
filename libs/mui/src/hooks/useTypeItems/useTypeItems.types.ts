import type { PropTypesDef } from '@appcraft/types';
import type { BasicType } from '../usePropertiesSorting';
import type { EditorProviderProps } from '../../contexts';

export interface TypeItem {
  key: string;
  options: PropTypesDef;
  onDelete?: (options: PropTypesDef) => void;
}

export type TypeItemsHook = (
  superior: BasicType,
  props: Pick<
    EditorProviderProps,
    'mixedTypes' | 'values' | 'onChange' | 'onMixedTypeMapping'
  >
) => {
  items: TypeItem[];
  onItemAdd?: () => void;
};
