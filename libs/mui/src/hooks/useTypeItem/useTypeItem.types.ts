import type * as Appcraft from '@appcraft/types';

enum Categories {
  Display,
  Mixed,
  Node,
  Pure,
}

export type Category = keyof typeof Categories;

export type TypeItemHook = (
  collectionType: Appcraft.CollectionType,
  options: Appcraft.PropTypesDef
) => {
  category: Category | null;
  label: string;
  propPath: string;
};
