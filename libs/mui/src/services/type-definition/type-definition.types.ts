import type * as Appcraft from '@appcraft/types';

export type StructureType =
  | Appcraft.ArrayOfProp
  | Appcraft.ExactProp
  | Appcraft.ObjectOfProp
  | Appcraft.ObjectProp;

export type GetTypeDefinitionService = (
  fetchOptions: Appcraft.FetchOptions,
  options: Appcraft.TypesParseOptions,
  version?: string
) => Promise<StructureType>;
