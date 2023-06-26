import type { CollectionType, PropTypesDef } from '@appcraft/types';

export interface TypeItem {
  key: string;
  collectionType: CollectionType;
  options: PropTypesDef;
  onDelete?: () => void;
  onRename?: (newPropName: string) => boolean;
}

export type TypeItemsHookResult = {
  items: TypeItem[];
  onItemAdd?: () => void;
};
