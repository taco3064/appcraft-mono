import type * as Appcraft from '@appcraft/types';

//* Variables
export enum Parser {
  Config = 'parseConfigs',
  Widget = 'parseWidget',
}

export type ParseOptions = Pick<
  Appcraft.TypesParseOptions,
  'typeFile' | 'typeName'
>;

//* Methods
export type GetTypeDefinitionService = (
  parser: Parser,
  options: Appcraft.TypesParseOptions
) => Promise<Appcraft.StructureProp>;

export type GetNodesAndEventsService = (
  items: Appcraft.WidgetOptions[],
  version?: string
) => Promise<Appcraft.NodeAndEventProps>;
