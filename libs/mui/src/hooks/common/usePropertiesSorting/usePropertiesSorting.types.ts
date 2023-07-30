import type * as Appcraft from '@appcraft/types';

export type PropertiesSortingHook = (
  basicType?: Appcraft.StructureProp
) => Appcraft.PropTypesDef[];
