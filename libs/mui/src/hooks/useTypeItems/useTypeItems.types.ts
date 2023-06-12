import type { CollectionType, PropTypesDef } from '@appcraft/types';

export interface TypeItem {
  key: string;
  collectionType: CollectionType;
  options: PropTypesDef;
  onDelete?: (options: PropTypesDef) => void;
}

export type TypeItemsHookResult = {
  items: TypeItem[];
  onItemAdd?: () => void;
};
