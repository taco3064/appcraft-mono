import type { CollectionType, PropTypesDef } from '@appcraft/types';
import type { ReactNode } from 'react';

export interface TypeItem {
  key: string;
  collectionType: CollectionType;
  description?: ReactNode;
  options: PropTypesDef;
  onDelete?: () => void;
  onRename?: (newPropName: string) => boolean;
}

export type TypeItemsHookResult = [TypeItem[]] | [TypeItem[], () => void];
