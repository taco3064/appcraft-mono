import type * as Appcraft from '@appcraft/types';

export type Category = 'Display' | 'Mixed' | 'Node' | 'Pure';

export type TypeItemHook = (
  collectionType: Appcraft.CollectionType,
  options: Appcraft.PropTypesDef
) => {
  category: Category | null;
  label: string;
  propPath: string;
};
