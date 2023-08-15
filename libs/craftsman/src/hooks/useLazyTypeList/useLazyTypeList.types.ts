import type * as Appcraft from '@appcraft/types';

export type FetchTypeDefinition = (
  options: Appcraft.TypesParseOptions
) => Promise<Appcraft.StructureProp>;
