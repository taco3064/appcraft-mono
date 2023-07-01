import type * as Appcraft from '@appcraft/types';

export type ParseOptions = Pick<
  Appcraft.TypesParseOptions,
  'typeFile' | 'typeName'
>;

export type GetNodesAndEventsService = (
  fetchOptions: Appcraft.FetchOptions,
  items: Appcraft.WidgetOptions[],
  version?: string
) => Promise<Appcraft.NodeAndEventProps>;
