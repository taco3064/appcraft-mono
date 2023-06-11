import type { CollectionType, NodeWidget, PropTypesDef } from '@appcraft/types';
import type { BasicType } from '../usePropertiesSorting';
import type { ChangeHandler } from '../../contexts';

export interface TypeItem {
  key: string;
  collectionType: CollectionType;
  options: PropTypesDef;
  onDelete?: (options: PropTypesDef) => void;
}

export type TypeItemsHook = (
  superior: BasicType,
  values: NodeWidget,
  onChange: ChangeHandler
) => {
  items: TypeItem[];
  onItemAdd?: () => void;
};
