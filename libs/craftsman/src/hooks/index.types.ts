import type * as Appcraft from '@appcraft/types';

export type FetchTypeDefinition<
  R extends Appcraft.PropTypesDef = Appcraft.StructureProp
> = (options: Appcraft.TypesParseOptions) => Promise<R>;
