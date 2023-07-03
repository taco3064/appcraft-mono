import type * as Appcraft from '@appcraft/types';

export type ParseOptions = Pick<
  Appcraft.TypesParseOptions,
  'typeFile' | 'typeName'
>;

export type GetNodesAndEventsKeyUtil = (
  options: Appcraft.WidgetOptions,
  defaultKey?: string
) => string;

export type GetNodesAndEventsService = (
  fetchOptions: Appcraft.FetchOptions,
  items: Appcraft.WidgetOptions[],
  version?: string
) => Promise<Appcraft.NodeAndEventProps>;
