import type * as Appcraft from '@appcraft/types';

//* Variables
export type ParseOptions = Pick<
  Appcraft.TypesParseOptions,
  'typeFile' | 'typeName'
>;

//* Methods
export type GetTypeDefinitionService = (
  options: Appcraft.TypesParseOptions
) => Promise<Appcraft.StructureProp>;

export type GetNodesAndEventsService = (
  options: ParseOptions[],
  version?: string
) => Promise<Appcraft.NodeAndEventProps>;
