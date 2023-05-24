import type { PropTypesDef } from '@appcraft/types';
import type { BasicType } from '../usePropertiesSorting';

export interface TypeItem {
  key: string;
  options: PropTypesDef;
  onItemRemove?: (options: PropTypesDef) => void;
}

export type TypeItemsHook = (superior: BasicType) => {
  isModifiable: boolean;
  items: TypeItem[];
  value: object;
  onChange: (value: object) => void;
};
