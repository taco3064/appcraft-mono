import type * as Appcraft from '@appcraft/types';

export type GetTypeDefinitionService = (
  fetchOptions: Appcraft.FetchOptions,
  options: Appcraft.TypesParseOptions
) => Promise<Appcraft.StructureProp>;
